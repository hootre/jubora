"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { getMyOrders, savePayment } from "@/lib/firestore";
import type { Order } from "@/types/order";
import { ORDER_STATUS_LABEL, ORDER_STATUS_COLOR } from "@/types/order";
import { MATERIALS, PRODUCT_TYPES } from "@/constants/pricing";
import {
  Loader2, LogOut, ClipboardList, X, Package, MapPin,
  CreditCard, Clock, Truck, MessageSquare, ImageIcon,
  Building2, Copy, CheckCircle2, AlertCircle,
} from "lucide-react";

// ── 계좌 정보 ──
const BANK_INFO = {
  bank: "농협",
  account: "352-1400-1028-63",
  holder: "보라미디어/전동찬",
};

export default function MyPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [requesting, setRequesting] = useState(false);
  const [copied, setCopied] = useState(false);

  const loadOrders = async (uid: string) => {
    setOrdersLoading(true);
    try {
      const myOrders = await getMyOrders(uid);
      setOrders(myOrders);
    } catch (e: any) {
      console.error("[mypage] getMyOrders 실패:", e?.code, e?.message, e);
      setError(`주문 내역을 불러오는 중 오류가 발생했어요. (${e?.code ?? e?.message ?? "unknown"})`);
    } finally {
      setOrdersLoading(false);
    }
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (!u) {
        router.push("/login?redirect=/mypage");
        return;
      }
      setUser(u);
      setLoading(false);
      await loadOrders(u.uid);
    });

    const timeout = setTimeout(() => setLoading(false), 5000);
    return () => { unsub(); clearTimeout(timeout); };
  }, [router]);

  // ── 입금확인요청 (결제 완료 처리) ──
  const handlePaymentRequest = async (order: Order) => {
    if (!order || requesting) return;
    setRequesting(true);
    try {
      await savePayment(order.id, {
        method: "계좌입금",
        paymentId: `bank-${order.id}-${Date.now()}`,
        paidAt: new Date().toISOString(),
        amount: order.pricing.totalPrice,
        pgProvider: "BANK_TRANSFER",
      });
      // 상태 즉시 반영
      setOrders(prev => prev.map(o =>
        o.id === order.id ? { ...o, status: "paid" } : o
      ));
      setSelectedOrder(prev =>
        prev && prev.id === order.id ? { ...prev, status: "paid" } : prev
      );
      alert("입금확인 요청이 완료되었어요!\n담당자가 확인 후 출력을 시작합니다.");
    } catch (e: any) {
      console.error("[mypage] savePayment 실패:", e);
      alert(`입금확인 요청 중 오류가 발생했습니다.\n${e?.message ?? "알 수 없는 오류"}\n\n계속 문제가 발생하면 담당자에게 문의해주세요.`);
    } finally {
      setRequesting(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(BANK_INFO.account).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (loading) return (
    <div className="flex flex-col justify-center items-center min-h-[60vh] gap-3">
      <Loader2 size={36} className="animate-spin text-primary-600" />
      <p className="text-sm text-gray-400">로그인 정보 확인 중...</p>
    </div>
  );

  const material = selectedOrder ? MATERIALS.find(m => m.id === selectedOrder.product.material) : null;
  const productType = selectedOrder ? PRODUCT_TYPES.find(p => p.id === selectedOrder.product.type) : null;

  return (
    <div>
      {/* 페이지 히어로 */}
      <div className="bg-gradient-to-r from-primary-700 to-primary-900 text-white py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-white/60 text-sm mb-2">홈 › 마이페이지</p>
          <h1 className="text-2xl md:text-3xl font-bold">마이페이지</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
      {/* 프로필 */}
      <div className="card mb-8">
        <div className="flex items-center gap-4">
          {user?.photoURL
            ? <img src={user.photoURL} alt="" className="w-14 h-14 rounded-full ring-2 ring-primary-100 shrink-0" />
            : <div className="w-14 h-14 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-xl shrink-0">
                {(user?.displayName ?? user?.email ?? "?")[0].toUpperCase()}
              </div>
          }
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-bold text-gray-900 truncate">{user?.displayName ?? user?.email}</h1>
            <p className="text-gray-500 text-sm truncate">{user?.email}</p>
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <Link href="/orders"
            className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 bg-primary-50 text-primary-700 rounded-lg text-sm font-semibold hover:bg-primary-100 transition-colors">
            <ClipboardList size={15} />
            주문내역
          </Link>
          <button onClick={() => signOut(auth).then(() => router.push("/"))}
            className="flex items-center justify-center gap-1.5 px-4 py-2.5 border border-gray-200 text-gray-500 rounded-lg text-sm hover:bg-gray-50 transition-colors">
            <LogOut size={15} />
            로그아웃
          </button>
        </div>
      </div>

      {/* 주문 내역 */}
      <h2 className="text-xl font-bold text-gray-900 mb-4">내 주문 내역</h2>

      {ordersLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 size={28} className="animate-spin text-primary-500" />
        </div>
      ) : error ? (
        <div className="card text-center py-10 text-red-500 text-sm">{error}</div>
      ) : orders.length === 0 ? (
        <div className="card text-center py-16">
          <p className="text-gray-400 text-4xl mb-4">📭</p>
          <p className="text-gray-500 mb-5">아직 주문 내역이 없어요.</p>
          <Link href="/templates" className="btn-primary inline-block">시안 보러 가기</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id}
              onClick={() => setSelectedOrder(order)}
              className="card hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-mono text-xs text-gray-400 mb-1">{order.orderNumber}</p>
                  <p className="font-bold text-gray-900">
                    {order.product.width}×{order.product.height}cm – {order.product.quantity}개
                  </p>
                </div>
                <span className={`badge ${ORDER_STATUS_COLOR[order.status]}`}>
                  {ORDER_STATUS_LABEL[order.status]}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <p className="font-bold text-primary-600">{order.pricing.totalPrice.toLocaleString()}원</p>
                <span className="text-xs text-gray-400">{order.createdAt.slice(0, 10)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
      </div>

      {/* ══ 주문 정보 팝업 모달 ══ */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* 오버레이 */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setSelectedOrder(null)} />

          {/* 모달 본문 */}
          <div className="relative w-full max-w-lg max-h-[90vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden">
            {/* 모달 헤더 */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-gray-50 shrink-0">
              <div className="min-w-0">
                <p className="font-bold text-gray-900 truncate">주문 정보</p>
                <p className="font-mono text-xs text-gray-400">{selectedOrder.orderNumber}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className={`badge ${ORDER_STATUS_COLOR[selectedOrder.status]}`}>
                  {ORDER_STATUS_LABEL[selectedOrder.status]}
                </span>
                <button onClick={() => setSelectedOrder(null)}
                  className="p-2 hover:bg-gray-200 rounded-xl text-gray-500 transition-colors">
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* 모달 스크롤 영역 */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">

              {/* 입금확인요청 배너 (proof_approved 상태) */}
              {selectedOrder.status === "proof_approved" && (
                <div className="border-2 border-green-200 bg-green-50 rounded-xl p-4">
                  <p className="font-bold text-green-800 mb-1">시안이 승인되었어요!</p>
                  <p className="text-xs text-green-600 mb-3">아래 계좌로 입금 후 입금확인요청 버튼을 눌러주세요.</p>

                  {/* 계좌 정보 */}
                  <div className="bg-white rounded-lg p-3 border border-green-200 space-y-1.5 text-sm mb-3">
                    <div className="flex justify-between">
                      <span className="text-gray-500">은행</span>
                      <span className="font-semibold text-gray-800">{BANK_INFO.bank}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">계좌번호</span>
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono font-bold text-gray-900">{BANK_INFO.account}</span>
                        <button onClick={handleCopy}
                          className={`text-[10px] px-2 py-1 rounded-md transition-colors font-medium ${
                            copied ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}>
                          {copied ? <CheckCircle2 size={10} className="inline" /> : <Copy size={10} className="inline" />}
                          {copied ? " 복사됨" : " 복사"}
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">예금주</span>
                      <span className="font-semibold text-gray-800">{BANK_INFO.holder}</span>
                    </div>
                    <div className="border-t border-gray-100 pt-1.5 flex justify-between">
                      <span className="text-gray-500">입금금액</span>
                      <span className="font-bold text-primary-600">{selectedOrder.pricing.totalPrice.toLocaleString()}원</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handlePaymentRequest(selectedOrder)}
                    disabled={requesting}
                    className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg text-sm font-bold transition-colors disabled:opacity-60 shadow-sm">
                    {requesting
                      ? <><Loader2 size={15} className="animate-spin" /> 요청 중...</>
                      : <><CheckCircle2 size={15} /> 입금확인요청</>
                    }
                  </button>
                </div>
              )}

              {/* 결제 확인중 배너 */}
              {selectedOrder.status === "paid" && (
                <div className="border-2 border-blue-200 bg-blue-50 rounded-xl p-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                    <Clock size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="font-bold text-blue-800">입금 확인 중이에요</p>
                    <p className="text-xs text-blue-600 mt-0.5">담당자가 확인하면 출력이 시작됩니다.</p>
                  </div>
                </div>
              )}

              {/* 시안 이미지 */}
              {(selectedOrder.design?.previewImageUrl || selectedOrder.proof?.imageUrl) && (
                <div>
                  <p className="text-xs font-bold text-gray-400 mb-2 flex items-center gap-1">
                    <ImageIcon size={11} /> 시안 이미지
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedOrder.design?.previewImageUrl && (
                      <div>
                        <p className="text-[10px] text-gray-400 mb-1">주문 시 첨부</p>
                        <img src={selectedOrder.design.previewImageUrl} alt="주문 이미지"
                          className="w-full rounded-lg border border-gray-200 object-contain max-h-40 bg-gray-50 cursor-zoom-in"
                          onClick={() => window.open(selectedOrder.design.previewImageUrl, "_blank")} />
                      </div>
                    )}
                    {selectedOrder.proof?.imageUrl && (
                      <div>
                        <p className="text-[10px] text-gray-400 mb-1">담당자 제작 시안</p>
                        <img src={selectedOrder.proof.imageUrl} alt="시안"
                          className="w-full rounded-lg border border-gray-200 object-contain max-h-40 bg-gray-50 cursor-zoom-in"
                          onClick={() => window.open(selectedOrder.proof!.imageUrl, "_blank")} />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* 제품 정보 */}
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs font-bold text-gray-400 mb-3 flex items-center gap-1">
                  <Package size={11} /> 제품 정보
                </p>
                <dl className="space-y-1.5 text-sm">
                  <InfoRow label="제품 종류" value={productType?.name ?? selectedOrder.product.type} />
                  <InfoRow label="재질" value={material?.name ?? selectedOrder.product.material} />
                  <InfoRow label="사이즈" value={`${selectedOrder.product.width} × ${selectedOrder.product.height} cm`} />
                  <InfoRow label="수량" value={`${selectedOrder.product.quantity}개`} />
                </dl>
              </div>

              {/* 결제 정보 */}
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs font-bold text-gray-400 mb-3 flex items-center gap-1">
                  <CreditCard size={11} /> 결제 정보
                </p>
                <dl className="space-y-1.5 text-sm">
                  <InfoRow label="제품 금액" value={`${selectedOrder.pricing.productPrice.toLocaleString()}원`} />
                  <InfoRow label="배송비" value={selectedOrder.pricing.deliveryFee === 0 ? "무료" : `${selectedOrder.pricing.deliveryFee.toLocaleString()}원`} />
                  <div className="border-t border-gray-200 pt-1.5 flex justify-between font-bold">
                    <span className="text-gray-700">합계</span>
                    <span className="text-primary-600">{selectedOrder.pricing.totalPrice.toLocaleString()}원</span>
                  </div>
                  {selectedOrder.payment && (
                    <>
                      <InfoRow label="결제 방법" value={selectedOrder.payment.method} />
                      <InfoRow label="결제일" value={selectedOrder.payment.paidAt.slice(0, 10)} />
                    </>
                  )}
                </dl>
              </div>

              {/* 배송 정보 */}
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs font-bold text-gray-400 mb-3 flex items-center gap-1">
                  <Truck size={11} /> 배송 정보
                </p>
                <dl className="space-y-1.5 text-sm">
                  <InfoRow label="주소" value={[selectedOrder.delivery.address, selectedOrder.delivery.addressDetail].filter(Boolean).join(" ")} />
                  {selectedOrder.delivery.memo && <InfoRow label="배송 메모" value={selectedOrder.delivery.memo} />}
                  {selectedOrder.shipping && (
                    <>
                      <div className="border-t border-gray-200 pt-1.5" />
                      <InfoRow label="택배사" value={selectedOrder.shipping.courier} />
                      <InfoRow label="송장번호" value={selectedOrder.shipping.trackingNumber} />
                      <InfoRow label="발송일" value={selectedOrder.shipping.shippedAt?.slice(0, 10) ?? ""} />
                    </>
                  )}
                </dl>
              </div>

              {/* 추가 요구사항 */}
              {selectedOrder.design?.userRequirements && (
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs font-bold text-gray-400 mb-2 flex items-center gap-1">
                    <MessageSquare size={11} /> 추가 요구사항
                  </p>
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">{selectedOrder.design.userRequirements}</p>
                </div>
              )}

              {/* 날짜 */}
              <p className="text-xs text-gray-400 text-right flex items-center justify-end gap-1">
                <Clock size={11} />
                주문일: {selectedOrder.createdAt.slice(0, 16).replace("T", " ")}
              </p>
            </div>

            {/* 모달 하단 버튼 */}
            <div className="shrink-0 border-t border-gray-100 px-5 py-3 flex gap-2">
              {selectedOrder.status === "proof_sent" && (
                <Link href={`/order/${selectedOrder.id}/proof`}
                  className="flex-1 flex items-center justify-center gap-1.5 bg-primary-600 hover:bg-primary-700 text-white py-2.5 rounded-lg text-sm font-bold transition-colors">
                  <ImageIcon size={14} /> 시안 확인하기
                </Link>
              )}
              <Link href={`/order/${selectedOrder.id}`}
                className="flex-1 flex items-center justify-center gap-1.5 border border-gray-200 text-gray-600 hover:bg-gray-50 py-2.5 rounded-lg text-sm font-medium transition-colors">
                주문 상세 페이지
              </Link>
              <button onClick={() => setSelectedOrder(null)}
                className="px-4 py-2.5 border border-gray-200 text-gray-500 hover:bg-gray-50 rounded-lg text-sm transition-colors">
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3">
      <span className="text-gray-400 shrink-0">{label}</span>
      <span className="text-gray-800 text-right">{value}</span>
    </div>
  );
}
