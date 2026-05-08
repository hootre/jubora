"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { getMyOrders } from "@/lib/firestore";
import type { Order } from "@/types/order";
import { ORDER_STATUS_LABEL, ORDER_STATUS_COLOR } from "@/types/order";
import { ClipboardList, Pencil, Trash2, Loader2, ShoppingCart } from "lucide-react";

// localStorage에 저장된 임시 주문 형태
export interface OrderDraft {
  id: string;
  templateId?: string;
  productType: string;
  material: string;
  width: number;
  height: number;
  quantity: number;
  requirements: string;
  savedAt: string;
  previewImageData?: string;
}

const DRAFT_KEY = "jubora_order_drafts";

function loadDrafts(): OrderDraft[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(DRAFT_KEY) ?? "[]");
  } catch { return []; }
}

function deleteDraft(id: string) {
  const drafts = loadDrafts().filter((d) => d.id !== id);
  localStorage.setItem(DRAFT_KEY, JSON.stringify(drafts));
}

const PRODUCT_TYPE_LABEL: Record<string, string> = {
  horizontal: "가로형 현수막",
  vertical:   "세로형 현수막",
  banner:     "X배너",
  rollup:     "롤업배너",
  print:      "인쇄물",
};

export default function OrdersPage() {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const [drafts, setDrafts] = useState<OrderDraft[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  useEffect(() => {
    // 비회원도 볼 수 있게 localStorage 임시 주문 바로 로드
    setDrafts(loadDrafts());

    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      setAuthLoading(false);
      if (!u) return;

      // 로그인 사용자면 Firestore 주문도 로드
      setOrdersLoading(true);
      try {
        const myOrders = await getMyOrders(u.uid);
        setOrders(myOrders);
      } catch {}
      finally { setOrdersLoading(false); }
    });

    const timeout = setTimeout(() => setAuthLoading(false), 4000);
    return () => { unsub(); clearTimeout(timeout); };
  }, []);

  const handleDeleteDraft = (id: string) => {
    deleteDraft(id);
    setDrafts(loadDrafts());
  };

  const hasDrafts = drafts.length > 0;
  const hasOrders = orders.length > 0;
  const isEmpty = !hasDrafts && !hasOrders && !ordersLoading;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between gap-3 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <ClipboardList size={22} className="text-primary-600" />
            주문 내역
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {user ? `${user.displayName ?? user.email}님의 주문 내역` : "임시 저장된 주문과 작성 중인 주문을 확인하세요"}
          </p>
        </div>
        {!user && !authLoading && (
          <Link href="/login?redirect=/orders"
            className="text-sm border border-primary-300 text-primary-700 px-4 py-2 rounded-xl hover:bg-primary-50 transition-colors font-medium">
            로그인하면 주문 이력 관리 가능
          </Link>
        )}
      </div>

      {/* 임시 저장 주문 (비회원 포함) */}
      {hasDrafts && (
        <section className="mb-10">
          <h2 className="text-base font-bold text-gray-700 mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-yellow-400 inline-block" />
            작성 중인 주문 ({drafts.length})
          </h2>
          <div className="space-y-3">
            {drafts.map((draft) => (
              <div key={draft.id} className="bg-white rounded-lg border border-yellow-200 shadow-sm p-4 flex gap-4">
                {/* 미리보기 이미지 */}
                {draft.previewImageData ? (
                  <img src={draft.previewImageData} alt="미리보기"
                    className="w-24 h-14 rounded-xl object-contain bg-gray-100 border border-gray-200 shrink-0" />
                ) : (
                  <div className="w-24 h-14 rounded-xl bg-gray-100 flex items-center justify-center text-gray-300 shrink-0">
                    <ShoppingCart size={18} />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-bold text-gray-900 text-sm">
                        {PRODUCT_TYPE_LABEL[draft.productType] ?? draft.productType}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {draft.width}×{draft.height}cm · {draft.quantity}개
                        {draft.requirements && ` · "${draft.requirements.slice(0, 20)}..."`}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        저장됨: {new Date(draft.savedAt).toLocaleString("ko-KR", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                    <span className="badge bg-yellow-100 text-yellow-800 shrink-0">임시저장</span>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Link
                      href={`/order?draft=${draft.id}${draft.templateId ? `&template=${draft.templateId}` : ""}`}
                      className="flex items-center gap-1 text-xs bg-primary-600 hover:bg-primary-700 text-white px-3 py-1.5 rounded-lg font-semibold transition-colors"
                    >
                      <Pencil size={11} />
                      이어서 작성하기
                    </Link>
                    <button
                      onClick={() => handleDeleteDraft(draft.id)}
                      className="flex items-center gap-1 text-xs border border-gray-200 text-gray-500 hover:bg-red-50 hover:text-red-500 hover:border-red-200 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      <Trash2 size={11} />
                      삭제
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 접수된 주문 (로그인 사용자) */}
      {user && (
        <section>
          <h2 className="text-base font-bold text-gray-700 mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary-500 inline-block" />
            접수된 주문 {hasOrders ? `(${orders.length})` : ""}
          </h2>
          {ordersLoading ? (
            <div className="flex justify-center py-10"><Loader2 className="animate-spin text-primary-500" size={28} /></div>
          ) : !hasOrders ? (
            <div className="bg-white rounded-lg border border-gray-100 p-8 text-center text-gray-400 text-sm">
              접수된 주문이 없어요.
            </div>
          ) : (
            <div className="space-y-3">
              {orders.map((order) => (
                <div key={order.id} className="bg-white rounded-lg border border-gray-100 shadow-sm p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-mono text-xs text-gray-400 mb-1">{order.orderNumber}</p>
                      <p className="font-bold text-gray-900">
                        {order.product.width}×{order.product.height}cm · {order.product.quantity}개
                      </p>
                    </div>
                    <span className={`badge ${ORDER_STATUS_COLOR[order.status]}`}>
                      {ORDER_STATUS_LABEL[order.status]}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-primary-600">{order.pricing.totalPrice.toLocaleString()}원</p>
                    <div className="flex items-center gap-2">
                      {order.status === "proof_sent" && (
                        <Link href={`/order/${order.id}/proof`}
                          className="text-xs bg-primary-100 text-primary-700 px-3 py-1.5 rounded-lg font-semibold hover:bg-primary-200 transition-colors">
                          시안 확인
                        </Link>
                      )}
                      {order.status === "proof_approved" && (
                        <Link href={`/order/${order.id}/payment`}
                          className="text-xs bg-green-100 text-green-700 px-3 py-1.5 rounded-lg font-semibold hover:bg-green-200 transition-colors">
                          입금확인요청
                        </Link>
                      )}
                      <span className="text-xs text-gray-400">{order.createdAt.slice(0, 10)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* 완전히 비어있을 때 */}
      {isEmpty && !authLoading && (
        <div className="text-center py-20">
          <p className="text-5xl mb-4">📭</p>
          <p className="text-gray-500 font-medium mb-2">저장된 주문이 없어요</p>
          <p className="text-gray-400 text-sm mb-8">시안을 선택하고 주문서를 작성하면 여기에 저장돼요.</p>
          <Link href="/templates" className="btn-primary inline-block">시안 보러 가기</Link>
        </div>
      )}
    </div>
  );
}
