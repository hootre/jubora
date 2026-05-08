"use client";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getOrder, respondToProof } from "@/lib/firestore";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

export default function ProofPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [revisionNote, setRevisionNote] = useState("");
  const [showRevision, setShowRevision] = useState(false);

  useEffect(() => { getOrder(id).then(setOrder); }, [id]);

  const approve = async () => {
    setLoading(true);
    await respondToProof(id, true);
    router.push(`/order/${id}/payment`);
  };

  const requestRevision = async () => {
    if (!revisionNote.trim()) { alert("수정 요청 내용을 입력해주세요."); return; }
    setLoading(true);
    await respondToProof(id, false, revisionNote);
    alert("수정 요청이 접수되었습니다. 담당자가 수정 후 다시 연락드릴게요.");
    setLoading(false);
    setShowRevision(false);
  };

  if (!order) return (
    <div className="flex justify-center py-20">
      <Loader2 className="animate-spin text-primary-600" size={40} />
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 sm:py-10">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">시안 확인</h1>
      <p className="text-gray-500 mb-6">주문번호: <span className="font-mono font-bold">{order.orderNumber}</span></p>

      {order.proof?.imageUrl ? (
        <>
          <div className="bg-gray-100 rounded-lg p-2 mb-6 shadow-sm">
            <img src={order.proof.imageUrl} alt="시안" className="w-full rounded-xl object-contain max-h-96" />
          </div>
          <div className="card mb-6">
            <h2 className="font-bold mb-2">📋 주문 내역</h2>
            <div className="text-sm space-y-1 text-gray-600">
              <p>사이즈: {order.product.width}×{order.product.height}cm × {order.product.quantity}개</p>
              <p>금액: <strong className="text-primary-700">{order.pricing.totalPrice.toLocaleString()}원</strong></p>
            </div>
          </div>

          {order.status === "proof_sent" && (
            <div className="space-y-3">
              {!showRevision ? (
                <>
                  <button onClick={approve} disabled={loading}
                    className="w-full btn-primary flex items-center justify-center gap-2">
                    <CheckCircle size={18} /> 시안 승인 – 결제 진행하기
                  </button>
                  <button onClick={() => setShowRevision(true)}
                    className="w-full flex items-center justify-center gap-2 border-2 border-red-300 text-red-600 hover:bg-red-50 px-6 py-3 rounded-xl font-semibold transition-all">
                    <XCircle size={18} /> 수정 요청하기
                  </button>
                </>
              ) : (
                <div className="card border-red-200">
                  <label className="label text-red-700">수정 요청 내용</label>
                  <textarea className="input resize-none h-28 mb-3" value={revisionNote}
                    placeholder="어떤 부분을 수정해드릴까요?" onChange={(e) => setRevisionNote(e.target.value)} />
                  <div className="flex gap-2">
                    <button onClick={requestRevision} disabled={loading}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold transition-colors">
                      수정 요청 제출
                    </button>
                    <button onClick={() => setShowRevision(false)} className="flex-1 btn-outline">취소</button>
                  </div>
                </div>
              )}
            </div>
          )}

          {order.status === "proof_approved" && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-5 text-center text-green-800">
              ✅ 시안을 승인하셨습니다. 제작이 진행 중이에요!
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-20 text-gray-500">
          <Loader2 size={48} className="animate-spin mx-auto mb-4 text-primary-500" />
          <p>시안 제작 중입니다. 완료되면 카카오톡으로 알림을 보내드릴게요.</p>
        </div>
      )}
    </div>
  );
}
