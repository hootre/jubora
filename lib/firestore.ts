import {
  collection, doc, addDoc, updateDoc, getDoc, getDocs,
  query, where, orderBy, limit, serverTimestamp, Timestamp,
  arrayUnion,
} from "firebase/firestore";
import { db } from "./firebase";
import type { Order, OrderStatus, ConversationMessage } from "@/types/order";

// ── 주문번호 생성 ──────────────────────────────
function generateOrderNumber(): string {
  const now = new Date();
  const date = now.toISOString().slice(0, 10).replace(/-/g, "");
  const rand = Math.floor(Math.random() * 9000) + 1000;
  return `JB-${date}-${rand}`;
}

// ── 주문 생성 ──────────────────────────────────
export async function createOrder(data: Omit<Order, "id" | "orderNumber" | "createdAt" | "updatedAt" | "status">) {
  const ref = await addDoc(collection(db, "orders"), {
    ...data,
    orderNumber: generateOrderNumber(),
    status: "pending" as OrderStatus,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

// ── 주문 조회 (단건) ───────────────────────────
export async function getOrder(orderId: string): Promise<Order | null> {
  const snap = await getDoc(doc(db, "orders", orderId));
  if (!snap.exists()) return null;
  const data = snap.data();
  return {
    ...data,
    id: snap.id,
    createdAt: (data.createdAt as Timestamp)?.toDate().toISOString() ?? "",
    updatedAt: (data.updatedAt as Timestamp)?.toDate().toISOString() ?? "",
  } as Order;
}

// ── 내 주문 목록 ───────────────────────────────
// orderBy 없이 where만 사용 → 복합 인덱스 불필요, 정렬은 클라이언트에서 처리
export async function getMyOrders(userId: string): Promise<Order[]> {
  const q = query(
    collection(db, "orders"),
    where("userId", "==", userId),
    limit(50)
  );
  const snap = await getDocs(q);
  const docs = snap.docs.map((d) => ({
    ...(d.data()),
    id: d.id,
    createdAt: (d.data().createdAt as Timestamp)?.toDate().toISOString() ?? "",
    updatedAt: (d.data().updatedAt as Timestamp)?.toDate().toISOString() ?? "",
  })) as Order[];
  // 최신순 정렬 (클라이언트)
  return docs.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

// ── 전체 주문 목록 (관리자용) ──────────────────
export async function getAllOrders(statusFilter?: OrderStatus): Promise<Order[]> {
  let q = statusFilter
    ? query(collection(db, "orders"), where("status", "==", statusFilter), orderBy("createdAt", "desc"))
    : query(collection(db, "orders"), orderBy("createdAt", "desc"), limit(200));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({
    ...(d.data()),
    id: d.id,
    createdAt: (d.data().createdAt as Timestamp)?.toDate().toISOString() ?? "",
    updatedAt: (d.data().updatedAt as Timestamp)?.toDate().toISOString() ?? "",
  })) as Order[];
}

// ── 주문 상태 변경 ─────────────────────────────
export async function updateOrderStatus(orderId: string, status: OrderStatus, extra?: Partial<Order>) {
  await updateDoc(doc(db, "orders", orderId), {
    status,
    ...extra,
    updatedAt: serverTimestamp(),
  });
}

// ── 시안 업로드 정보 저장 + 대화 기록 ──────────────
export async function saveProof(orderId: string, imageUrl: string, adminNote?: string) {
  const now = new Date().toISOString();
  const msg: ConversationMessage = {
    id: `msg-${Date.now()}`,
    sender: "admin",
    type: "proof",
    content: adminNote || "시안을 전달합니다. 확인 후 승인 또는 수정 요청 부탁드립니다.",
    imageUrl,
    createdAt: now,
  };
  await updateDoc(doc(db, "orders", orderId), {
    status: "proof_sent",
    proof: { imageUrl, sentAt: now },
    conversations: arrayUnion(msg),
    updatedAt: serverTimestamp(),
  });
}

// ── 시안 승인/수정요청 + 대화 기록 ────────────────
export async function respondToProof(orderId: string, approved: boolean, revisionNote?: string) {
  const now = new Date().toISOString();
  if (approved) {
    const msg: ConversationMessage = {
      id: `msg-${Date.now()}`,
      sender: "customer",
      type: "approve",
      content: "시안을 승인합니다.",
      createdAt: now,
    };
    await updateDoc(doc(db, "orders", orderId), {
      status: "proof_approved",
      "proof.approvedAt": now,
      conversations: arrayUnion(msg),
      updatedAt: serverTimestamp(),
    });
  } else {
    const msg: ConversationMessage = {
      id: `msg-${Date.now()}`,
      sender: "customer",
      type: "revision",
      content: revisionNote || "수정 요청",
      createdAt: now,
    };
    await updateDoc(doc(db, "orders", orderId), {
      status: "proof_revision",
      "proof.revisionNote": revisionNote,
      conversations: arrayUnion(msg),
      updatedAt: serverTimestamp(),
    });
  }
}

// ── 대화 메시지 추가 (일반 텍스트) ─────────────────
export async function addConversation(
  orderId: string,
  sender: "admin" | "customer",
  content: string,
  imageUrl?: string,
) {
  const msg: ConversationMessage = {
    id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    sender,
    type: imageUrl ? "image" : "text",
    content,
    imageUrl,
    createdAt: new Date().toISOString(),
  };
  await updateDoc(doc(db, "orders", orderId), {
    conversations: arrayUnion(msg),
    updatedAt: serverTimestamp(),
  });
  return msg;
}

// ── 테스트용 더미 주문 생성 ────────────────────
export async function createTestOrder(userId?: string): Promise<string> {
  const ref = await addDoc(collection(db, "orders"), {
    orderNumber: generateOrderNumber(),
    userId:      userId ?? "test-admin",
    userName:    "테스트 고객",
    userPhone:   "01000000000",
    userEmail:   "test@jubora.co.kr",
    product: {
      type:     "horizontal",
      material: "현수막지",
      width:    100,
      height:   30,
      quantity: 1,
      options:  [],
    },
    design: {
      templateId:       "horizontal-basic",
      userRequirements: "관리자 테스트 주문입니다.",
    },
    delivery: {
      address:       "경기 하남시 미사강변한강로 135",
      addressDetail: "다동 716호",
      zipCode:       "12902",
      memo:          "테스트 배송",
    },
    pricing: {
      productPrice: 27000,
      deliveryFee:  3000,
      totalPrice:   30000,
    },
    status:    "proof_approved" as OrderStatus,   // 결제 테스트 가능 상태로 시작
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

// ── 결제 완료 저장 ─────────────────────────────
export async function savePayment(orderId: string, paymentData: Order["payment"]) {
  await updateDoc(doc(db, "orders", orderId), {
    status: "paid",
    payment: paymentData,
    updatedAt: serverTimestamp(),
  });
}
