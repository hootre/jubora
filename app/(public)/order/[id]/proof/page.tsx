"use client";
import { use, useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { getOrder, respondToProof, markAsRead } from "@/lib/firestore";
import type { ConversationMessage } from "@/types/order";
import { CheckCircle, XCircle, Loader2, MessageSquare, Send, ThumbsUp } from "lucide-react";
import ImageLightbox from "@/components/ImageLightbox";

export default function ProofPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [revisionNote, setRevisionNote] = useState("");
  const [showRevision, setShowRevision] = useState(false);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => { getOrder(id).then((o) => { setOrder(o); if (o && (o.unreadByCustomer ?? 0) > 0) markAsRead(id, "customer").catch(() => {}); }); }, [id]);

  // 대화 하단 스크롤
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [order?.conversations?.length, showRevision]);

  const approve = async () => {
    setLoading(true);
    await respondToProof(id, true);
    router.push(`/order/${id}/payment`);
  };

  const requestRevision = async () => {
    if (!revisionNote.trim()) { alert("수정 요청 내용을 입력해주세요."); return; }
    setLoading(true);
    await respondToProof(id, false, revisionNote);
    // 로컬 대화 반영
    const newMsg: ConversationMessage = {
      id: `msg-${Date.now()}`,
      sender: "customer",
      type: "revision",
      content: revisionNote.trim(),
      createdAt: new Date().toISOString(),
    };
    setOrder((prev: any) => prev ? {
      ...prev,
      status: "proof_revision",
      conversations: [...(prev.conversations ?? []), newMsg],
    } : prev);
    setRevisionNote("");
    setLoading(false);
    setShowRevision(false);
  };

  if (!order) return (
    <div className="flex justify-center py-20">
      <Loader2 className="animate-spin text-primary-600" size={40} />
    </div>
  );

  const conversations: ConversationMessage[] = order.conversations ?? [];

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 sm:py-10">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">시안 확인</h1>
      <p className="text-gray-500 mb-6">주문번호: <span className="font-mono font-bold">{order.orderNumber}</span></p>

      {order.proof?.imageUrl ? (
        <>
          {/* 현재 시안 이미지 */}
          <div className="bg-gray-100 rounded-lg p-2 mb-6 shadow-sm">
            <img src={order.proof.imageUrl} alt="시안"
              className="w-full rounded-xl object-contain max-h-96 cursor-zoom-in"
              onClick={() => setLightbox(order.proof.imageUrl)} />
          </div>

          {/* 주문 내역 요약 */}
          <div className="card mb-6">
            <h2 className="font-bold mb-2">📋 주문 내역</h2>
            <div className="text-sm space-y-1 text-gray-600">
              {order.product.productName && <p>상품: {order.product.productName}</p>}
              {order.product.width && order.product.height && (
                <p>사이즈: {order.product.width}×{order.product.height}cm × {order.product.quantity}개</p>
              )}
              <p>금액: <strong className="text-primary-700">{order.pricing.totalPrice.toLocaleString()}원</strong></p>
            </div>
          </div>

          {/* 대화 히스토리 */}
          {conversations.length > 0 && (
            <div className="card mb-6 border-primary-100">
              <h2 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <MessageSquare size={16} className="text-primary-500" />
                수정 대화 내역
                <span className="text-xs font-normal text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                  {conversations.length}개
                </span>
              </h2>
              <div ref={scrollRef} className="space-y-3 max-h-72 overflow-y-auto pr-1">
                {conversations.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === "customer" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                      msg.sender === "customer"
                        ? "bg-primary-600 text-white rounded-br-md"
                        : "bg-gray-100 text-gray-800 rounded-bl-md"
                    }`}>
                      <p className={`text-[10px] font-bold mb-1 ${
                        msg.sender === "customer" ? "text-primary-200" : "text-gray-400"
                      }`}>
                        {msg.sender === "admin" ? "🏢 주보라" : "👤 나"}
                        {msg.type === "proof" && " · 시안 전달"}
                        {msg.type === "revision" && " · 수정 요청"}
                        {msg.type === "approve" && " · 시안 승인"}
                      </p>
                      {msg.imageUrl && (
                        <img src={msg.imageUrl} alt="시안"
                          className="w-full rounded-lg mb-2 max-h-48 object-contain bg-white border border-white/20 cursor-zoom-in"
                          onClick={() => setLightbox(msg.imageUrl!)} />
                      )}
                      <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                      <p className={`text-[10px] mt-1 ${
                        msg.sender === "customer" ? "text-primary-300" : "text-gray-400"
                      }`}>
                        {new Date(msg.createdAt).toLocaleString("ko-KR", {
                          month: "short", day: "numeric", hour: "2-digit", minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 액션 버튼 */}
          {order.status === "proof_sent" && (
            <div className="space-y-3">
              {!showRevision ? (
                <>
                  <button onClick={approve} disabled={loading}
                    className="w-full btn-primary flex items-center justify-center gap-2">
                    <ThumbsUp size={18} /> 시안 승인 – 결제 진행하기
                  </button>
                  <button onClick={() => setShowRevision(true)}
                    className="w-full flex items-center justify-center gap-2 border-2 border-orange-300 text-orange-600 hover:bg-orange-50 px-6 py-3 rounded-xl font-semibold transition-all">
                    <XCircle size={18} /> 수정 요청하기
                  </button>
                </>
              ) : (
                <div className="card border-orange-200">
                  <label className="label text-orange-700">수정 요청 내용</label>
                  <textarea className="input resize-none h-28 mb-3" value={revisionNote}
                    placeholder="어떤 부분을 수정해드릴까요? 구체적으로 작성해 주세요." onChange={(e) => setRevisionNote(e.target.value)} />
                  <div className="flex gap-2">
                    <button onClick={requestRevision} disabled={loading || !revisionNote.trim()}
                      className="flex-1 flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-xl font-semibold transition-colors disabled:opacity-50">
                      <Send size={14} /> 수정 요청 보내기
                    </button>
                    <button onClick={() => setShowRevision(false)} className="flex-1 btn-outline">취소</button>
                  </div>
                </div>
              )}
            </div>
          )}

          {order.status === "proof_revision" && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-5 text-center text-orange-800">
              ✏️ 수정 요청이 전달되었어요. 담당자가 확인 후 수정된 시안을 보내드립니다.
            </div>
          )}

          {order.status === "proof_approved" && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-5 text-center text-green-800">
              ✅ 시안을 승인하셨습니다. 결제를 진행해 주세요!
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-20 text-gray-500">
          <Loader2 size={48} className="animate-spin mx-auto mb-4 text-primary-500" />
          <p>시안 제작 중입니다. 완료되면 카카오톡으로 알림을 보내드릴게요.</p>
        </div>
      )}

      {/* 이미지 라이트박스 */}
      {lightbox && <ImageLightbox src={lightbox} onClose={() => setLightbox(null)} />}
    </div>
  );
}
