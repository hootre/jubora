import {
  collection, doc, setDoc, getDoc, getDocs, deleteDoc,
  serverTimestamp, Timestamp,
} from "firebase/firestore";
import { db } from "./firebase";
import { ORDER_FORM_CONFIGS, type OrderType, type OrderFormConfig, type ProductSpec, type ProductOption } from "@/constants/products";

// ── Firestore 주문폼 타입 (OrderFormConfig 확장) ──
export interface FirestoreOrderForm {
  type: string;
  label: string;
  specs: ProductSpec[];
  hasSizeInput?: boolean;
  sizePresets?: { label: string; width: number; height: number }[];
  quantityUnit?: string;
  quantityPresets?: number[];
  basePrice?: number;
  priceNote?: string;
  updatedAt?: string;
}

const COLLECTION = "order_forms";

// ── 전체 주문폼 조회 ──
export async function getAllOrderForms(): Promise<Record<string, FirestoreOrderForm>> {
  const snap = await getDocs(collection(db, COLLECTION));
  const result: Record<string, FirestoreOrderForm> = {};
  snap.docs.forEach((d) => {
    const data = d.data() as any;
    result[d.id] = {
      ...data,
      updatedAt: (data.updatedAt as Timestamp)?.toDate?.()?.toISOString?.() ?? "",
    };
  });
  return result;
}

// ── 단일 주문폼 조회 ──
export async function getOrderForm(type: string): Promise<FirestoreOrderForm | null> {
  const snap = await getDoc(doc(db, COLLECTION, type));
  if (!snap.exists()) return null;
  const data = snap.data() as any;
  return { ...data, updatedAt: (data.updatedAt as Timestamp)?.toDate?.()?.toISOString?.() ?? "" };
}

// ── 주문폼 저장 (upsert) ──
export async function saveOrderForm(type: string, data: Omit<FirestoreOrderForm, "updatedAt">): Promise<void> {
  await setDoc(doc(db, COLLECTION, type), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

// ── 주문폼 삭제 ──
export async function deleteOrderForm(type: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTION, type));
}

// ── constants에서 초기 데이터 동기화 ──
export async function seedOrderFormsFromConstants(): Promise<number> {
  let count = 0;
  for (const [type, config] of Object.entries(ORDER_FORM_CONFIGS)) {
    await setDoc(doc(db, COLLECTION, type), {
      type: config.type,
      label: config.label,
      specs: config.specs,
      hasSizeInput: config.hasSizeInput ?? false,
      quantityUnit: config.quantityUnit ?? "개",
      quantityPresets: config.quantityPresets ?? [],
      basePrice: config.basePrice ?? 0,
      priceNote: config.priceNote ?? "",
      updatedAt: serverTimestamp(),
    });
    count++;
  }
  return count;
}

// ── Firestore에 주문폼 데이터가 있는지 확인 ──
export async function hasOrderForms(): Promise<boolean> {
  const snap = await getDocs(collection(db, COLLECTION));
  return !snap.empty;
}
