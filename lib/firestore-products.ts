import {
  collection, doc, addDoc, updateDoc, deleteDoc, getDoc, getDocs,
  query, where, orderBy, serverTimestamp, Timestamp, writeBatch,
} from "firebase/firestore";
import { db } from "./firebase";
import { PRODUCT_CATEGORIES, type ProductItem, type Category } from "@/constants/products";

// ── Firestore 제품 타입 ──
export interface FirestoreProduct {
  id: string;                    // Firestore doc ID
  productId: string;             // 제품 고유 ID (banner-basic 등)
  categoryId: string;            // 상위 카테고리 ID
  subId: string;                 // 하위 카테고리 ID
  name: string;
  description: string;
  thumbnail: string | null;
  color?: string;
  badge?: "BEST" | "NEW" | "HOT" | null;
  startPrice?: number | null;
  orderType: string;
  sortOrder: number;             // 정렬 순서
  isActive: boolean;             // 활성/비활성
  createdAt: string;
  updatedAt: string;
}

// ── 제품 전체 조회 ──
export async function getAllProducts(): Promise<FirestoreProduct[]> {
  const snap = await getDocs(query(collection(db, "products"), orderBy("sortOrder", "asc")));
  return snap.docs.map((d) => ({
    ...(d.data() as Omit<FirestoreProduct, "id">),
    id: d.id,
    createdAt: (d.data().createdAt as Timestamp)?.toDate?.()?.toISOString?.() ?? d.data().createdAt ?? "",
    updatedAt: (d.data().updatedAt as Timestamp)?.toDate?.()?.toISOString?.() ?? d.data().updatedAt ?? "",
  }));
}

// ── 카테고리별 제품 조회 ──
export async function getProductsByCategory(categoryId: string): Promise<FirestoreProduct[]> {
  const snap = await getDocs(
    query(collection(db, "products"), where("categoryId", "==", categoryId), orderBy("sortOrder", "asc"))
  );
  return snap.docs.map((d) => ({
    ...(d.data() as Omit<FirestoreProduct, "id">),
    id: d.id,
    createdAt: (d.data().createdAt as Timestamp)?.toDate?.()?.toISOString?.() ?? "",
    updatedAt: (d.data().updatedAt as Timestamp)?.toDate?.()?.toISOString?.() ?? "",
  }));
}

// ── 제품 추가 ──
export async function addProduct(data: Omit<FirestoreProduct, "id" | "createdAt" | "updatedAt">): Promise<string> {
  const ref = await addDoc(collection(db, "products"), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

// ── 제품 수정 ──
export async function updateProduct(docId: string, data: Partial<Omit<FirestoreProduct, "id" | "createdAt">>): Promise<void> {
  await updateDoc(doc(db, "products", docId), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

// ── 제품 삭제 ──
export async function deleteProduct(docId: string): Promise<void> {
  await deleteDoc(doc(db, "products", docId));
}

// ── 제품 활성/비활성 토글 ──
export async function toggleProductActive(docId: string, isActive: boolean): Promise<void> {
  await updateDoc(doc(db, "products", docId), {
    isActive,
    updatedAt: serverTimestamp(),
  });
}

// ── constants/products.ts 에서 초기 데이터 동기화 ──
export async function seedProductsFromConstants(): Promise<number> {
  const batch = writeBatch(db);
  let count = 0;

  for (const cat of PRODUCT_CATEGORIES) {
    for (const sub of cat.subs) {
      for (let i = 0; i < sub.items.length; i++) {
        const item = sub.items[i];
        const ref = doc(collection(db, "products"));
        batch.set(ref, {
          productId: item.id,
          categoryId: cat.id,
          subId: sub.id,
          name: item.name,
          description: item.description,
          thumbnail: item.thumbnail ?? null,
          color: item.color ?? null,
          badge: item.badge ?? null,
          startPrice: item.startPrice ?? null,
          orderType: item.orderType,
          sortOrder: count,
          isActive: true,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
        count++;
      }
    }
  }

  await batch.commit();
  return count;
}

// ── Firestore에 제품 데이터가 있는지 확인 ──
export async function hasProducts(): Promise<boolean> {
  const snap = await getDocs(query(collection(db, "products"), orderBy("sortOrder", "asc")));
  return !snap.empty;
}
