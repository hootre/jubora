"use client";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { getOrder, respondToProof, savePayment, addConversation, markAsRead } from "@/lib/firestore";
import type { Order, OrderStatus, ConversationMessage } from "@/types/order";
import { ORDER_STATUS_LABEL, ORDER_STATUS_COLOR } from "@/types/order";
import { MATERIALS, OPTIONS, PRODUCT_TYPES } from "@/constants/pricing";
import {
  Loader2, ArrowLeft, Package, MapPin, CreditCard,
  MessageSquare, ImageIcon, Clock, Truck, X,
  CheckCircle2, Edit3, ThumbsUp, Send, AlertTriangle,
  Copy, Building2, Printer,
} from "lucide-react";
import ImageLightbox from "@/components/ImageLightbox";

// ── 계좌 정보 ──
const BANK_INFO = {
  bank: "농협",
  account: "352-1400-1028-63",
  holder: "보라미디어/전동찬",
};

// ── 고객용 진행 단계 ──
const FLOW_STEPS: { key: OrderStatus; label: string; emoji: string }[] = [
  { key: "pending",        label: "주문 접수",  emoji: "📥" },
  { key: "confirming",     label: "주문 확인",  emoji: "🔍" },
  { key: "designing",      label: "시안 제작",  emoji: "🎨" },
  { key: "proof_revision", label: "시안 확인",  emoji: "👁️" },
  { key: "proof_approved", label: "결제 대기",  emoji: "💰" },
  { key: "paid",           label: "입금 확인 중", emoji: "💳" },
  { key: "producing",      label: "출력 중",    emoji: "🖨️" },
  { key: "shipping",       label: "배송 중",    emoji: "🚚" },
  { key: "delivered",      label: "배송 완료",  emoji: "📦" },
];
const FLOW_STEP_KEYS = FLOW_STEPS.map((s) => s.key);

function getFlowIdx(status: OrderStatus): number {
  const direct = FLOW_STEP_KEYS.indexOf(status);
  if (direct !== -1) return direct;
  if (status === "proof_sent") return FLOW_STEP_KEYS.indexOf("proof_revision");
  return -1;
}

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 수정 요청 관련
  const [revisionNote, setRevisionNote] = useState("");
  const [revisionSaving, setRevisionSaving] = useState(false);
  const [revisionDone, setRevisionDone] = useState(false);

  // 시안 승인 관련
  const [approving, setApproving] = useState(false);

  // 입금확인요청 관련
  const [requesting, setRequesting] = useState(false);
  const [copied, setCopied] = useState(false);

  // 이미지 확대 모달
  const [zoomImage, setZoomImage] = useState<string | null>(null);

  const loadOrder = async (uid: string) => {
    try {
      const o = await getOrder(id);
      if (!o) { setError("주문을 찾을 수 없어요."); return; }
      if (o.userId !== uid) { setError("접근 권한이 없어요."); return; }
      setOrder(o);
      if ((o.unreadByCustomer ?? 0) > 0) markAsRead(id, "customer").catch(() => {});
      if (o.proof?.revisionNote) setRevisionNote(o.proof.revisionNote);
    } catch (e: any) {
      setError(`불러오기 실패: ${e?.message ?? "알 수 없는 오류"}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (!u) { router.push(`/login?redirect=/order/${id}`); return; }
      await loadOrder(u.uid);
    });
    return () => unsub();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // ── 수정 요청 저장 ──
  const handleRevisionRequest = async () => {
    if (!order || !revisionNote.trim()) return;
    setRevisionSaving(true);
    try {
      await respondToProof(order.id, false, revisionNote.trim());
      setRevisionDone(true);
      // 로컬 대화 히스토리에도 즉시 반영
      const newMsg: ConversationMessage = {
        id: `msg-${Date.now()}`,
        sender: "customer",
        type: "revision",
        content: revisionNote.trim(),
        createdAt: new Date().toISOString(),
      };
      setOrder((prev) => prev ? {
        ...prev,
        status: "proof_revision",
        conversations: [...(prev.conversations ?? []), newMsg],
        proof: prev.proof
          ? { ...prev.proof, revisionNote: revisionNote.trim() }
          : { imageUrl: "", sentAt: "", revisionNote: revisionNote.trim() },
      } : prev);
      setRevisionNote("");
    } catch (e: any) {
      alert(`저장 실패: ${e?.message ?? "오류"}`);
    } finally {
      setRevisionSaving(false);
    }
  };

  // ── 시안 승인 ──
  const handleApproveProof = async () => {
    if (!order) return;
    if (!confirm("시안을 승인하시겠어요? 승인 후 결제 단계로 진행됩니다.")) return;
    setApproving(true);
    try {
      await respondToProof(order.id, true);
      const approveMsg: ConversationMessage = {
        id: `msg-${Date.now()}`,
        sender: "customer",
        type: "approve",
        content: "시안을 승인합니다.",
        createdAt: new Date().toISOString(),
      };
      setOrder((prev) => prev ? {
        ...prev,
        status: "proof_approved",
        conversations: [...(prev.conversations ?? []), approveMsg],
      } : prev);
      setRevisionDone(false);
    } catch (e: any) {
      alert(`승인 실패: ${e?.message ?? "오류"}`);
    } finally {
      setApproving(false);
    }
  };

  // ── 입금확인요청 ──
  const handlePaymentRequest = async () => {
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
      setOrder(prev => prev ? { ...prev, status: "paid" } : prev);
      alert("입금확인 요청이 완료되었어요!\n담당자가 확인 후 출력을 시작합니다.");
    } catch (e: any) {
      alert(`입금확인 요청 중 오류가 발생했습니다.\n${e?.message ?? "알 수 없는 오류"}`);
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

  // ── 로딩 / 에러 ──
  if (loading) return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <Loader2 size={36} className="animate-spin text-primary-600" />
    </div>
  );
  if (error) return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center">
      <p className="text-4xl mb-4">😥</p>
      <p className="text-gray-600 mb-6">{error}</p>
      <Link href="/mypage" className="btn-primary">마이페이지로</Link>
    </div>
  );
  if (!order) return null;

  const currentIdx = getFlowIdx(order.status as OrderStatus);
  const material = order.product.material ? MATERIALS.find((m) => m.id === order.product.material) : undefined;
  const productType = order.product.type ? PRODUCT_TYPES.find((p) => p.id === order.product.type) : undefined;
  const optionLabels = (order.product.options ?? [])
    .map((oid: string) => OPTIONS.find((o) => o.id === oid)?.name)
    .filter(Boolean);

  const canRespondToProof = order.status === "proof_sent" || order.status === "proof_revision";
  const hasPaid = !!order.payment;

  // ── 영수증 팝업 ──
  const openReceipt = () => {
    if (!order || !order.payment) return;
    const w = window.open("", "_blank", "width=800,height=1100,scrollbars=yes,resizable=yes");
    if (!w) { alert("팝업이 차단되어 있습니다. 팝업 허용 후 다시 시도해주세요."); return; }

    const optLabels = (order.product.options ?? [])
      .map((oid: string) => OPTIONS.find((o) => o.id === oid)?.name)
      .filter(Boolean).join(", ") || "-";
    const matName = order.product.material ? (MATERIALS.find((m) => m.id === order.product.material)?.name ?? order.product.material) : "-";
    const typeName = order.product.productName ?? (order.product.type ? (PRODUCT_TYPES.find((p) => p.id === order.product.type)?.name ?? order.product.type) : "-");

    w.document.write(`<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8" />
<title>영수증 - ${order.orderNumber}</title>
<style>
  @page { size: A4; margin: 20mm; }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Malgun Gothic', 'Apple SD Gothic Neo', sans-serif; color: #222; background: #fff; padding: 40px; max-width: 210mm; margin: 0 auto; }
  .receipt { border: 2px solid #333; padding: 32px; }
  .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 20px; margin-bottom: 24px; }
  .header h1 { font-size: 28px; font-weight: 800; letter-spacing: 8px; margin-bottom: 4px; }
  .header .sub { font-size: 12px; color: #888; }
  .info-row { display: flex; justify-content: space-between; font-size: 13px; padding: 5px 0; }
  .info-row .label { color: #666; min-width: 80px; }
  .info-row .value { font-weight: 600; text-align: right; }
  .section { margin-bottom: 20px; }
  .section-title { font-size: 14px; font-weight: 700; color: #444; border-bottom: 1px solid #ddd; padding-bottom: 6px; margin-bottom: 10px; }
  table { width: 100%; border-collapse: collapse; font-size: 13px; }
  table th { background: #f5f5f5; border: 1px solid #ddd; padding: 8px 10px; text-align: center; font-weight: 600; color: #555; }
  table td { border: 1px solid #ddd; padding: 8px 10px; }
  table td.right { text-align: right; }
  table td.center { text-align: center; }
  .total-row td { font-weight: 700; font-size: 15px; background: #fafafa; }
  .footer { margin-top: 32px; text-align: center; padding-top: 20px; border-top: 2px solid #333; }
  .footer .company { font-size: 16px; font-weight: 700; margin-bottom: 4px; }
  .footer .detail { font-size: 11px; color: #888; line-height: 1.8; }
  .stamp { display: inline-block; border: 3px solid #c0392b; color: #c0392b; border-radius: 50%; width: 80px; height: 80px; line-height: 80px; text-align: center; font-size: 15px; font-weight: 800; margin-top: 16px; transform: rotate(-15deg); opacity: 0.8; }
  .print-btn { display: block; margin: 20px auto 0; padding: 10px 40px; font-size: 14px; font-weight: 600; background: #4338ca; color: #fff; border: none; border-radius: 8px; cursor: pointer; }
  .print-btn:hover { background: #3730a3; }
  @media print {
    body { padding: 0; }
    .print-btn { display: none !important; }
    .receipt { border-width: 1px; }
  }
</style>
</head>
<body>
<div class="receipt">
  <div class="header">
    <h1>영 수 증</h1>
    <div class="sub">RECEIPT</div>
  </div>

  <div class="section">
    <div class="section-title">주문 정보</div>
    <div class="info-row"><span class="label">주문번호</span><span class="value">${order.orderNumber}</span></div>
    <div class="info-row"><span class="label">주문일</span><span class="value">${order.createdAt.slice(0, 10)}</span></div>
    <div class="info-row"><span class="label">고객명</span><span class="value">${order.userName}</span></div>
    <div class="info-row"><span class="label">연락처</span><span class="value">${order.userPhone.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3")}</span></div>
  </div>

  <div class="section">
    <div class="section-title">결제 정보</div>
    <div class="info-row"><span class="label">결제 방법</span><span class="value">${order.payment!.method}</span></div>
    <div class="info-row"><span class="label">결제일</span><span class="value">${order.payment!.paidAt.slice(0, 10)}</span></div>
  </div>

  <div class="section">
    <div class="section-title">주문 내역</div>
    <table>
      <thead>
        <tr><th>항목</th><th>상세</th><th>수량</th><th>금액</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>${typeName}</td>
          <td>${matName} / ${order.product.width}×${order.product.height}cm<br/><span style="font-size:11px;color:#888;">마감: ${optLabels}</span></td>
          <td class="center">${order.product.quantity}개</td>
          <td class="right">${order.pricing.productPrice.toLocaleString()}원</td>
        </tr>
        <tr>
          <td>배송비</td>
          <td>-</td>
          <td class="center">-</td>
          <td class="right">${order.pricing.deliveryFee === 0 ? "무료" : order.pricing.deliveryFee.toLocaleString() + "원"}</td>
        </tr>
        <tr class="total-row">
          <td colspan="3" style="text-align:center;">합계 (VAT 포함)</td>
          <td class="right">${order.pricing.totalPrice.toLocaleString()}원</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="section">
    <div class="section-title">배송 정보</div>
    <div class="info-row"><span class="label">배송지</span><span class="value">${order.delivery.address} ${order.delivery.addressDetail || ""}</span></div>
    ${order.delivery.memo ? `<div class="info-row"><span class="label">배송 메모</span><span class="value">${order.delivery.memo}</span></div>` : ""}
  </div>

  <div class="footer">
    <div class="company">주보라 (JUBORA)</div>
    <div class="detail">
      보라미디어 | 대표: 전동찬<br/>
      사업자등록번호: 593-56-00232<br/>
      주소: 경기도 하남시 미사강변한강로 135, 다동 716호 1003호(망월동, 미사스카이폴리스)<br/>
      이메일: artinsky@boramedia.co.kr
    </div>
    <div class="stamp">결제완료</div>
  </div>
</div>
<button class="print-btn" onclick="window.print()">🖨️ 인쇄하기</button>
</body>
</html>`);
    w.document.close();
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 sm:py-10">

      {/* ── 헤더 ── */}
      <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
        <button onClick={() => router.back()}
          className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors shrink-0">
          <ArrowLeft size={20} />
        </button>
        <div className="min-w-0">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">주문 상세</h1>
          <p className="text-xs font-mono text-gray-400 mt-0.5 truncate">{order.orderNumber}</p>
        </div>
        <span className={`ml-auto badge shrink-0 ${ORDER_STATUS_COLOR[order.status]}`}>
          {ORDER_STATUS_LABEL[order.status]}
        </span>
      </div>

      {/* ── 진행 단계 바 ── */}
      <div className="card mb-6">
        <p className="text-xs font-bold text-gray-400 mb-4 flex items-center gap-1">
          <Clock size={11} /> 진행 단계
        </p>
        <div className="flex items-center overflow-x-auto pb-1 gap-0 scrollbar-hide">
          {FLOW_STEPS.map((step, i) => {
            const isActive = i === currentIdx;
            const isDone   = i < currentIdx;
            return (
              <div key={step.key} className="flex items-center shrink-0">
                <div className={`flex flex-col items-center gap-1.5 px-2 py-2 rounded-lg transition-all
                  ${isActive ? "bg-primary-600 text-white shadow-md scale-105" : ""}
                  ${isDone   ? "text-primary-500" : ""}
                  ${!isActive && !isDone ? "text-gray-300" : ""}`}>
                  <span className="text-base leading-none">{step.emoji}</span>
                  <span className={`text-[10px] font-semibold whitespace-nowrap leading-none
                    ${isActive ? "text-white" : isDone ? "text-primary-500" : "text-gray-300"}`}>
                    {step.label}
                  </span>
                  {isActive && (
                    <span className="text-[9px] text-primary-200 font-normal">현재</span>
                  )}
                  {isDone && (
                    <CheckCircle2 size={9} className="text-primary-400" />
                  )}
                </div>
                {i < FLOW_STEPS.length - 1 && (
                  <div className={`w-5 h-0.5 shrink-0 mx-0.5 rounded transition-colors
                    ${i < currentIdx ? "bg-primary-400" : "bg-gray-200"}`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── 관리자 메시지 ── */}
      {order.adminMessage && (
        <div className="card mb-6 border border-purple-200 bg-purple-50">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center shrink-0">
              <MessageSquare size={16} className="text-purple-600" />
            </div>
            <div>
              <p className="text-xs font-bold text-purple-700 mb-1">담당자 메시지</p>
              <p className="text-sm text-purple-900 whitespace-pre-wrap">{order.adminMessage}</p>
            </div>
          </div>
        </div>
      )}

      {/* ── 시안 이미지 ── */}
      {(order.design.previewImageUrl || order.proof?.imageUrl) && (
        <div className="card mb-6">
          <h2 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
            <ImageIcon size={16} className="text-primary-500" /> 시안 이미지
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {order.design.previewImageUrl && (
              <div>
                <p className="text-xs text-gray-400 mb-1.5">주문 시 첨부 이미지</p>
                <img src={order.design.previewImageUrl} alt="주문 이미지"
                  className="w-full rounded-lg border border-gray-200 object-contain max-h-48 bg-gray-50 cursor-zoom-in"
                  onClick={() => setZoomImage(order.design.previewImageUrl!)} />
              </div>
            )}
            {order.proof?.imageUrl && (
              <div>
                <p className="text-xs text-gray-400 mb-1.5">담당자 제작 시안</p>
                <img src={order.proof.imageUrl} alt="담당자 시안"
                  className="w-full rounded-lg border border-gray-200 object-contain max-h-48 bg-gray-50 cursor-zoom-in"
                  onClick={() => setZoomImage(order.proof!.imageUrl)} />
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── 시안 대화 섹션 (conversations) ── */}
      {(order.conversations?.length > 0 || canRespondToProof) && (
        <div className="card mb-6 border-2 border-primary-100">
          <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <MessageSquare size={16} className="text-primary-500" />
            시안 수정 대화
            {order.conversations?.length > 0 && (
              <span className="text-xs font-normal text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                {order.conversations.length}개 메시지
              </span>
            )}
          </h2>

          {/* 대화 히스토리 */}
          {order.conversations?.length > 0 && (
            <div className="space-y-3 mb-4 max-h-96 overflow-y-auto pr-1">
              {order.conversations.map((msg: ConversationMessage) => (
                <div key={msg.id} className={`flex ${msg.sender === "customer" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                    msg.sender === "customer"
                      ? "bg-primary-600 text-white rounded-br-md"
                      : msg.type === "system"
                      ? "bg-gray-100 text-gray-500 text-center w-full text-xs py-2"
                      : "bg-gray-100 text-gray-800 rounded-bl-md"
                  }`}>
                    {/* 발신자 표시 */}
                    <p className={`text-[10px] font-bold mb-1 ${
                      msg.sender === "customer" ? "text-primary-200" : "text-gray-400"
                    }`}>
                      {msg.sender === "admin" ? "🏢 주보라" : "👤 나"}
                      {msg.type === "proof" && " · 시안 전달"}
                      {msg.type === "revision" && " · 수정 요청"}
                      {msg.type === "approve" && " · 시안 승인"}
                    </p>

                    {/* 이미지 (시안) */}
                    {msg.imageUrl && (
                      <img src={msg.imageUrl} alt="시안"
                        className="w-full rounded-lg mb-2 cursor-zoom-in border border-white/20 max-h-48 object-contain bg-white"
                        onClick={() => setZoomImage(msg.imageUrl!)} />
                    )}

                    {/* 텍스트 */}
                    <p className={`text-sm whitespace-pre-wrap ${
                      msg.type === "approve" ? "font-semibold" : ""
                    }`}>{msg.content}</p>

                    {/* 시간 */}
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
          )}

          {/* 메시지 입력 + 액션 (시안 응답 가능 상태일 때만) */}
          {canRespondToProof && (
            <>
              <div className="flex gap-2 mb-3">
                <textarea
                  value={revisionNote}
                  onChange={(e) => { setRevisionNote(e.target.value); setRevisionDone(false); }}
                  rows={3}
                  placeholder={"수정이 필요한 부분을 구체적으로 작성해 주세요.\n예) 글씨 색상을 빨간색으로, 로고를 좀 더 위로 올려주세요."}
                  className="input resize-none text-sm flex-1"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={handleRevisionRequest}
                  disabled={revisionSaving || !revisionNote.trim()}
                  className="flex-1 flex items-center justify-center gap-2 border-2 border-orange-400 text-orange-600 hover:bg-orange-50 py-2.5 px-4 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50"
                >
                  {revisionSaving
                    ? <><Loader2 size={14} className="animate-spin" /> 전송 중...</>
                    : revisionDone
                    ? <><CheckCircle2 size={14} className="text-green-500" /> 수정 요청 완료!</>
                    : <><Send size={14} /> 수정 요청 보내기</>
                  }
                </button>

                <button
                  onClick={handleApproveProof}
                  disabled={approving}
                  className="flex-1 flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white py-2.5 px-4 rounded-lg text-sm font-bold transition-colors disabled:opacity-50 shadow-sm"
                >
                  {approving
                    ? <><Loader2 size={14} className="animate-spin" /> 승인 중...</>
                    : <><ThumbsUp size={14} /> 시안 승인 · 결제 진행</>
                  }
                </button>
              </div>

              {revisionDone && (
                <div className="mt-3 flex items-center gap-2 text-sm text-orange-700 bg-orange-50 border border-orange-200 rounded-lg px-4 py-3">
                  <AlertTriangle size={14} />
                  수정 요청이 전달되었어요. 담당자가 확인 후 새로운 시안을 보내드립니다.
                </div>
              )}
            </>
          )}

          {/* 시안 승인 완료 후에는 대화 히스토리만 보여줌 */}
          {!canRespondToProof && order.conversations?.length > 0 && (
            <p className="text-xs text-gray-400 text-center mt-2">
              {order.status === "proof_approved" ? "✅ 시안 승인 완료" : "대화가 종료되었습니다."}
            </p>
          )}
        </div>
      )}

      {/* ── 입금 정보 + 입금확인요청 (proof_approved 상태 — 별도 페이지 없이 인라인) ── */}
      {order.status === "proof_approved" && (
        <div className="card mb-6 border-2 border-green-200 bg-green-50">
          <p className="font-bold text-green-800 mb-1">시안이 승인되었어요!</p>
          <p className="text-xs text-green-600 mb-4">아래 계좌로 입금 후 입금확인요청 버튼을 눌러주세요.</p>

          {/* 계좌 정보 */}
          <div className="bg-white rounded-lg p-4 border border-green-200 space-y-2 text-sm mb-4">
            <div className="flex justify-between">
              <span className="text-gray-500 flex items-center gap-1.5"><Building2 size={13} /> 은행</span>
              <span className="font-semibold text-gray-800">{BANK_INFO.bank}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">계좌번호</span>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-gray-900">{BANK_INFO.account}</span>
                <button onClick={handleCopy}
                  className={`text-[10px] px-2 py-1 rounded-md transition-colors font-medium ${
                    copied ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}>
                  {copied ? <><CheckCircle2 size={10} className="inline" /> 복사됨</> : <><Copy size={10} className="inline" /> 복사</>}
                </button>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">예금주</span>
              <span className="font-semibold text-gray-800">{BANK_INFO.holder}</span>
            </div>
            <div className="border-t border-gray-100 pt-2 flex justify-between">
              <span className="text-gray-500">입금금액</span>
              <span className="font-bold text-primary-600 text-base">{order.pricing.totalPrice.toLocaleString()}원</span>
            </div>
          </div>

          <button
            onClick={handlePaymentRequest}
            disabled={requesting}
            className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg text-sm font-bold transition-colors disabled:opacity-60 shadow-sm">
            {requesting
              ? <><Loader2 size={15} className="animate-spin" /> 요청 중...</>
              : <><CheckCircle2 size={15} /> 입금확인요청</>
            }
          </button>
        </div>
      )}

      {/* ── 입금 확인 대기 배너 (paid 상태) ── */}
      {order.status === "paid" && (
        <div className="card mb-6 border-2 border-blue-200 bg-blue-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
              <Clock size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="font-bold text-blue-800">입금 확인 중이에요</p>
              <p className="text-xs sm:text-sm text-blue-600 mt-0.5">담당자가 입금을 확인하면 출력이 시작됩니다. 잠시만 기다려주세요.</p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

        {/* 제품 정보 */}
        <div className="card">
          <h2 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
            <Package size={16} className="text-primary-500" /> 제품 정보
          </h2>
          <dl className="space-y-2 text-sm">
            {order.product.productName && (
              <Row label="상품" value={order.product.productName} />
            )}
            {order.product.orderType && (
              <Row label="주문유형" value={order.product.orderType} />
            )}
            {productType && (
              <Row label="제품 종류" value={productType.name} />
            )}
            {material && (
              <Row label="재질" value={material.name} />
            )}
            {order.product.width && order.product.height && (
              <Row label="사이즈" value={`${order.product.width} × ${order.product.height} cm`} />
            )}
            <Row label="수량" value={`${order.product.quantity}개`} />
            {optionLabels.length > 0 && (
              <Row label="마감 옵션" value={optionLabels.join(", ")} />
            )}
            {order.product.specs && Object.entries(order.product.specs).map(([key, val]) => (
              <Row key={key} label={key} value={String(val)} />
            ))}
          </dl>
        </div>

        {/* 결제 정보 */}
        <div className="card">
          <h2 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
            <CreditCard size={16} className="text-primary-500" /> 결제 정보
          </h2>
          <dl className="space-y-2 text-sm">
            <Row label="제품 금액" value={`${order.pricing.productPrice.toLocaleString()}원`} />
            <Row label="배송비" value={order.pricing.deliveryFee === 0 ? "무료" : `${order.pricing.deliveryFee.toLocaleString()}원`} />
            <div className="border-t border-gray-100 pt-2 flex justify-between font-bold">
              <span className="text-gray-700">합계</span>
              <span className="text-primary-600 text-base">{order.pricing.totalPrice.toLocaleString()}원</span>
            </div>
            {order.payment && (
              <>
                <Row label="결제 방법" value={order.payment.method} />
                <Row label="결제일" value={order.payment.paidAt.slice(0, 10)} />
              </>
            )}
          </dl>
          {hasPaid && (
            <button onClick={openReceipt}
              className="w-full mt-4 flex items-center justify-center gap-2 border-2 border-primary-200 text-primary-700 hover:bg-primary-50 py-2.5 rounded-lg text-sm font-semibold transition-colors">
              <Printer size={15} />
              영수증 출력
            </button>
          )}
        </div>

        {/* 배송 정보 */}
        <div className="card">
          <h2 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
            <Truck size={16} className="text-primary-500" /> 배송 정보
          </h2>
          <dl className="space-y-2 text-sm">
            <Row label="주소" value={[order.delivery.address, order.delivery.addressDetail].filter(Boolean).join(" ")} />
            {order.delivery.memo && <Row label="배송 메모" value={order.delivery.memo} />}
            {order.shipping && (
              <>
                <div className="border-t border-gray-100 pt-2" />
                <Row label="택배사" value={order.shipping.courier} />
                <Row label="송장번호" value={order.shipping.trackingNumber} />
                <Row label="발송일" value={order.shipping.shippedAt?.slice(0, 10) ?? ""} />
              </>
            )}
          </dl>
        </div>

        {/* 추가 요구사항 */}
        {order.design.userRequirements && (
          <div className="card">
            <h2 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <MessageSquare size={16} className="text-primary-500" /> 추가 요구사항
            </h2>
            <p className="text-sm text-gray-700 whitespace-pre-wrap">{order.design.userRequirements}</p>
          </div>
        )}

      </div>

      {/* 날짜 */}
      <p className="text-xs text-gray-400 text-right mt-6">
        <Clock size={11} className="inline mr-1" />
        주문일: {order.createdAt.slice(0, 16).replace("T", " ")}
      </p>

      {/* 하단 버튼 */}
      <div className="mt-6">
        <Link href="/mypage" className="btn-outline w-full text-center block">
          ← 주문 목록으로
        </Link>
      </div>

      {/* ══ 이미지 라이트박스 ══ */}
      {zoomImage && <ImageLightbox src={zoomImage} onClose={() => setZoomImage(null)} />}

    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3">
      <span className="text-gray-400 shrink-0">{label}</span>
      <span className="text-gray-800 text-right">{value}</span>
    </div>
  );
}
