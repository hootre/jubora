"use client";
import { use, useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { getOrder } from "@/lib/firestore";
import { CheckCircle, MessageCircle, Clock, Phone } from "lucide-react";
import { Loader2 } from "lucide-react";

export default function OrderCompletePage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin text-primary-600" size={40} />
      </div>
    }>
      <CompleteContent params={params} />
    </Suspense>
  );
}

function CompleteContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const searchParams = useSearchParams();
  const isBank = searchParams.get("method") === "bank";

  const [order, setOrder] = useState<any>(null);

  useEffect(() => { getOrder(id).then(setOrder); }, [id]);

  // 결제 방법 자동 감지 (query param 없이 complete 페이지에 직접 도달한 경우 대비)
  const payMethod = order?.payment?.method ?? (isBank ? "계좌입금" : "");
  const isBankTransfer = payMethod === "계좌입금" || isBank;

  return (
    <div className="max-w-xl mx-auto px-4 py-10 sm:py-16 text-center">

      {/* 성공 아이콘 */}
      <div className={`flex justify-center mb-6 ${isBankTransfer ? "text-amber-500" : "text-green-500"}`}>
        {isBankTransfer
          ? <Clock size={72} strokeWidth={1.5} />
          : <CheckCircle size={72} strokeWidth={1.5} />
        }
      </div>

      {/* 타이틀 */}
      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        {isBankTransfer ? "입금 확인 요청이 접수되었어요!" : "결제가 완료되었어요!"}
      </h1>
      <p className="text-gray-500 mb-1">
        주문번호: <span className="font-mono font-bold text-gray-800">{order?.orderNumber ?? "—"}</span>
      </p>
      <p className="text-gray-400 text-sm mb-8">
        {isBankTransfer
          ? "입금 확인 후 바로 제작을 시작해 드릴게요."
          : "담당자가 확인 후 곧 제작을 시작합니다."}
      </p>

      {/* 계좌입금 안내 박스 */}
      {isBankTransfer && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-5 mb-6 text-left space-y-3">
          <div className="flex items-center gap-2 font-bold text-amber-900">
            <Clock size={16} /> 입금 확인 안내
          </div>
          <ul className="text-sm text-amber-800 space-y-1.5 list-disc list-inside">
            <li>입금 확인은 영업일 기준 <strong>1–2시간</strong> 이내에 처리됩니다.</li>
            <li>입금자명이 주문자명 또는 주문번호와 다른 경우 아래 연락처로 알려주세요.</li>
            <li>확인 완료 후 제작이 바로 시작되며, 진행 상황은 마이페이지에서 확인할 수 있어요.</li>
          </ul>
          <div className="flex items-center gap-2 text-sm text-amber-900 bg-white border border-amber-200 rounded-xl px-4 py-2.5">
            <Phone size={14} className="text-amber-500 shrink-0" />
            <span>입금 확인 문의: <strong>보라미디어 담당자</strong>에게 카카오톡 또는 전화로 연락주세요.</span>
          </div>
        </div>
      )}

      {/* 일반 결제 완료 안내 박스 */}
      {!isBankTransfer && (
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-5 mb-6 text-left">
          <div className="flex items-center gap-2 font-bold text-primary-900 mb-2">
            <MessageCircle size={16} /> 다음 단계 안내
          </div>
          <p className="text-sm text-primary-800">
            결제가 확인되면 제작을 시작해 드립니다. 진행 상황은 마이페이지에서 실시간으로 확인하실 수 있어요.
          </p>
        </div>
      )}

      {/* 카카오톡 채널 안내 */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-5 mb-8 text-left">
        <div className="flex items-center gap-2 font-bold text-yellow-900 mb-2">
          <MessageCircle size={16} /> 카카오톡 채널 안내
        </div>
        <p className="text-sm text-yellow-800">
          시안 완성 및 배송 현황은 <strong>카카오톡 알림</strong>으로 안내드립니다.
          {isBankTransfer && " 입금 확인 후 시안 제작을 시작해 드릴게요."}
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <Link href="/mypage" className="btn-primary">
          내 주문 확인하기
        </Link>
        <Link href="/" className="btn-outline">
          홈으로 돌아가기
        </Link>
      </div>

    </div>
  );
}
