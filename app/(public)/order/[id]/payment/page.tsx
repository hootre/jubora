"use client";
import { use, useEffect, useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { getOrder, savePayment } from "@/lib/firestore";
import {
  Loader2, Lock, Copy, CheckCircle2, AlertCircle,
  Building2, CreditCard, Smartphone, ChevronRight,
} from "lucide-react";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  ✏️  아래 계좌 정보를 실제 계좌로 수정해주세요
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const BANK_INFO = {
  bank:    "농협",
  account: "352-1400-1028-63",
  holder:  "보라미디어/전동찬",
};

type PayMethod = "bank" | "kakao" | "toss";

const PAY_OPTIONS: {
  id: PayMethod; label: string; icon: React.ReactNode;
  desc: string; ready: boolean;
}[] = [
  {
    id: "bank", label: "계좌입금", icon: <Building2 size={18} />,
    desc: "농협 즉시 이용 가능", ready: true,
  },
  {
    id: "kakao", label: "카카오페이", icon: <Smartphone size={18} />,
    desc: "간편결제", ready: false,
  },
  {
    id: "toss", label: "토스페이", icon: <CreditCard size={18} />,
    desc: "신용·체크카드 / 토스", ready: false,
  },
];

export default function PaymentPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin text-primary-600" size={40} />
      </div>
    }>
      <PaymentContent params={params} />
    </Suspense>
  );
}

function PaymentContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [order, setOrder] = useState<any>(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [payMethod, setPayMethod] = useState<PayMethod>("bank");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (!u) { router.push(`/login?redirect=/order/${id}/payment`); return; }
      const o = await getOrder(id);
      if (!o || o.userId !== u.uid) {
        router.push("/mypage");
        return;
      }
      // 이미 결제 완료된 주문이면 complete 페이지로
      if (o.status === "paid" || o.payment) {
        router.push(`/order/${id}/complete`);
        return;
      }
      setOrder(o);
      setPageLoading(false);
    });
    return () => unsub();
  }, [id, router]);

  // ── 계좌번호 복사 ──
  const handleCopy = () => {
    navigator.clipboard.writeText(BANK_INFO.account).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // ── 계좌입금 완료 처리 ──
  const handleBankTransfer = async () => {
    if (!order) return;
    setSubmitting(true);
    try {
      await savePayment(order.id, {
        method: "계좌입금",
        paymentId: `bank-${order.id}-${Date.now()}`,
        paidAt: new Date().toISOString(),
        amount: order.pricing.totalPrice,
        pgProvider: "BANK_TRANSFER",
      });
      router.push(`/order/${order.id}/complete?method=bank`);
    } catch (e: any) {
      alert(`처리 중 오류가 발생했습니다. 담당자에게 문의해주세요.\n${e?.message ?? ""}`);
    } finally {
      setSubmitting(false);
    }
  };

  if (pageLoading) return (
    <div className="flex justify-center py-20">
      <Loader2 className="animate-spin text-primary-600" size={40} />
    </div>
  );
  if (!order) return null;

  const isReadyMethod = PAY_OPTIONS.find(p => p.id === payMethod)?.ready ?? false;

  return (
    <div className="max-w-lg mx-auto px-4 py-8 sm:py-10">
      <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">결제</h1>
      <p className="text-gray-400 text-sm mb-8 font-mono">{order.orderNumber}</p>

      {/* 금액 요약 */}
      <div className="card mb-6">
        <h2 className="font-bold text-gray-800 mb-3">결제 금액</h2>
        <div className="space-y-1.5 text-sm">
          <div className="flex justify-between text-gray-500">
            <span>제품 금액</span>
            <span>{order.pricing.productPrice.toLocaleString()}원</span>
          </div>
          <div className="flex justify-between text-gray-500">
            <span>배송비</span>
            <span>{order.pricing.deliveryFee === 0 ? "무료" : `${order.pricing.deliveryFee.toLocaleString()}원`}</span>
          </div>
          <div className="border-t border-gray-100 pt-2 flex justify-between font-bold text-base">
            <span className="text-gray-800">총 결제금액</span>
            <span className="text-primary-600 text-lg">{order.pricing.totalPrice.toLocaleString()}원</span>
          </div>
        </div>
      </div>

      {/* 결제 수단 선택 */}
      <div className="card mb-5">
        <h2 className="font-bold text-gray-800 mb-3">결제 수단</h2>
        <div className="flex flex-col gap-2">
          {PAY_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => opt.ready && setPayMethod(opt.id)}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-lg border-2 text-sm font-medium transition-all text-left relative
                ${!opt.ready ? "opacity-60 cursor-not-allowed border-gray-100 bg-gray-50" : ""}
                ${opt.ready && payMethod === opt.id
                  ? "border-primary-500 bg-primary-50 text-primary-700"
                  : opt.ready
                  ? "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                  : ""}`}
            >
              <span className={`${payMethod === opt.id && opt.ready ? "text-primary-600" : "text-gray-400"}`}>
                {opt.icon}
              </span>
              <span className="flex-1">{opt.label}</span>
              {opt.ready ? (
                <span className={`text-xs ${payMethod === opt.id ? "text-primary-400" : "text-gray-400"}`}>
                  {opt.desc}
                </span>
              ) : (
                <span className="text-[10px] font-semibold bg-gray-200 text-gray-500 px-2 py-0.5 rounded-full">
                  배포 후 활성화
                </span>
              )}
            </button>
          ))}
        </div>
        {!isReadyMethod && (
          <div className="mt-3 flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2.5 text-xs text-amber-700">
            <AlertCircle size={13} className="mt-0.5 shrink-0" />
            간편결제는 홈페이지 정식 배포 후 순차 활성화됩니다. 지금은 계좌입금으로 이용해주세요.
          </div>
        )}
      </div>

      {/* 계좌입금 선택 시: 계좌 안내 카드 */}
      {payMethod === "bank" && (
        <div className="card mb-5 border-2 border-primary-100 bg-primary-50/40">
          <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
            <Building2 size={16} className="text-primary-500" /> 입금 계좌 안내
          </h3>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">은행</span>
              <span className="font-semibold text-gray-800">{BANK_INFO.bank}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">계좌번호</span>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-gray-900 text-base tracking-wide">
                  {BANK_INFO.account}
                </span>
                <button
                  onClick={handleCopy}
                  className={`flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg transition-colors font-medium
                    ${copied
                      ? "bg-green-100 text-green-700"
                      : "bg-white border border-gray-200 text-gray-500 hover:border-primary-300 hover:text-primary-600"}`}
                >
                  {copied ? <CheckCircle2 size={12} /> : <Copy size={12} />}
                  {copied ? "복사됨" : "복사"}
                </button>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">예금주</span>
              <span className="font-semibold text-gray-800">{BANK_INFO.holder}</span>
            </div>
            <div className="border-t border-primary-100 pt-2 flex justify-between">
              <span className="text-gray-500">입금금액</span>
              <span className="font-bold text-primary-600 text-base">
                {order.pricing.totalPrice.toLocaleString()}원
              </span>
            </div>
          </dl>

          <div className="mt-3 flex items-start gap-2 bg-white border border-primary-200 rounded-lg px-3 py-2.5 text-xs text-primary-700">
            <AlertCircle size={13} className="mt-0.5 shrink-0" />
            <span>
              입금자명을 <strong>{order.userName}</strong> 또는 주문번호{" "}
              <strong className="font-mono">{order.orderNumber}</strong>로 입력해주세요.
            </span>
          </div>
        </div>
      )}

      {/* 결제 버튼 */}
      {payMethod === "bank" ? (
        <button
          onClick={handleBankTransfer}
          disabled={submitting}
          className="w-full btn-primary flex items-center justify-center gap-2 py-4 text-base disabled:opacity-60"
        >
          {submitting
            ? <><Loader2 size={18} className="animate-spin" /> 처리 중...</>
            : <><CheckCircle2 size={18} /> 입금확인요청</>
          }
        </button>
      ) : (
        <button
          disabled
          className="w-full flex items-center justify-center gap-2 py-4 text-base rounded-lg bg-gray-100 text-gray-400 cursor-not-allowed font-semibold"
        >
          <Lock size={18} />
          배포 후 이용 가능합니다
        </button>
      )}

      <p className="text-xs text-gray-400 text-center mt-3 flex items-center justify-center gap-1">
        <Lock size={11} />
        {payMethod === "bank"
          ? "입금 확인 후 제작을 시작해 드립니다"
          : "PortOne을 통한 안전한 결제 (배포 후 활성화)"}
      </p>
    </div>
  );
}
