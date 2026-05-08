"use client";
import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/firebase";
import {
  getAllOrders, updateOrderStatus, saveProof, createTestOrder, addConversation
} from "@/lib/firestore";
import type { Order, OrderStatus, ConversationMessage } from "@/types/order";
import { ORDER_STATUS_LABEL, ORDER_STATUS_COLOR } from "@/types/order";
import * as PortOne from "@portone/browser-sdk/v2";
import {
  Package, Clock, CheckCircle, TrendingUp, Upload, Bell,
  FlaskConical, CreditCard, MessageSquare, RefreshCw,
  ChevronRight, ExternalLink, Eye, RotateCcw,
  Send, Loader2, CircleCheck, AlertCircle, Home,
  BarChart2, Search, ArrowUpDown, Truck, Banknote,
  CalendarDays, User, Phone, MapPin, ClipboardList,
  ShieldCheck, X, ChevronDown, ChevronUp
} from "lucide-react";
import ProductManager from "@/components/admin/ProductManager";

// ── 탭 타입 ──────────────────────────────────────
type Tab = "dashboard" | "orders" | "products" | "payments" | "test";

// ── 상태별 다음 액션 ──────────────────────────────
const STATUS_ACTIONS: Partial<Record<OrderStatus, { label: string; next: OrderStatus; color: string }[]>> = {
  pending:        [{ label: "시안 제작 시작", next: "designing", color: "purple" }],
  designing:      [],
  proof_sent:     [{ label: "승인 처리", next: "proof_approved", color: "green" }],
  proof_approved: [{ label: "결제 완료 처리", next: "paid", color: "green" }],
  paid:           [{ label: "입금 확인 · 출력 시작", next: "producing", color: "cyan" }],
  producing:      [{ label: "배송 시작", next: "shipping", color: "blue" }],
  shipping:       [{ label: "배송 완료", next: "delivered", color: "gray" }],
};

const STATUS_PIPELINE: OrderStatus[] = [
  "pending","confirming","designing","proof_sent","proof_revision",
  "proof_approved","paid","producing","shipping","delivered"
];

// ── 알림 토스트 ────────────────────────────────────
function Toast({ msg, type }: { msg: string; type: "success" | "error" | "info" }) {
  const colors = { success: "bg-green-600", error: "bg-red-600", info: "bg-blue-600" };
  return (
    <div className={`fixed bottom-6 right-6 z-50 ${colors[type]} text-white px-5 py-3 rounded-lg shadow-xl flex items-center gap-2 text-sm font-medium`}>
      {type === "success" ? <CircleCheck size={16} /> : type === "error" ? <AlertCircle size={16} /> : <Bell size={16} />}
      {msg}
    </div>
  );
}

// ── 상태 배지 컴포넌트 ─────────────────────────────
function StatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${ORDER_STATUS_COLOR[status]}`}>
      {ORDER_STATUS_LABEL[status]}
    </span>
  );
}

// ── 통계 카드 ─────────────────────────────────────
function StatCard({ icon, label, value, sub, color }: {
  icon: React.ReactNode; label: string; value: string | number; sub?: string; color: string;
}) {
  return (
    <div className="bg-white rounded-lg p-3 sm:p-5 shadow-sm border border-gray-100 flex items-center gap-3 sm:gap-4">
      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
        {icon}
      </div>
      <div className="min-w-0">
        <div className="text-lg sm:text-2xl font-bold text-gray-900 truncate">{value}</div>
        <div className="text-xs sm:text-sm text-gray-500 truncate">{label}</div>
        {sub && <div className="text-[10px] sm:text-xs text-gray-400 mt-0.5 truncate">{sub}</div>}
      </div>
    </div>
  );
}

// ── 진행 단계 정의 ──
const FLOW_STEPS: { key: OrderStatus; label: string; emoji: string }[] = [
  { key: "pending",        label: "주문 접수",   emoji: "📥" },
  { key: "designing",      label: "시안 제작중", emoji: "🎨" },
  { key: "proof_sent",     label: "시안 전달",   emoji: "📤" },
  { key: "proof_revision", label: "수정요청",    emoji: "✏️" },
  { key: "proof_approved", label: "결제 대기",   emoji: "💰" },
  { key: "paid",           label: "입금 확인",   emoji: "✅" },
  { key: "producing",      label: "출력 중",     emoji: "🖨️" },
  { key: "shipping",       label: "배송 중",     emoji: "🚚" },
  { key: "delivered",      label: "배송 완료",   emoji: "📦" },
];
const FLOW_STEP_KEYS = FLOW_STEPS.map(s => s.key);

// 숨겨진 상태를 가장 가까운 표시 단계 인덱스로 매핑
function getFlowIdx(status: OrderStatus): number {
  const direct = FLOW_STEP_KEYS.indexOf(status);
  if (direct !== -1) return direct;
  if (status === "confirming") return FLOW_STEP_KEYS.indexOf("designing");
  return -1;
}

// ── 주문 관리 모달 드로어 ────────────────────────────
function OrderManageModal({
  order, proofFile, proofUrlInput, uploading,
  onStatusChange, onProofFileChange, onProofUrlChange, onProofUpload, onClose,
}: {
  order: Order;
  proofFile: File | null;
  proofUrlInput: string;
  uploading: boolean;
  onStatusChange: (id: string, next: OrderStatus, extra?: Partial<Order>) => Promise<void>;
  onProofFileChange: (f: File | null) => void;
  onProofUrlChange: (url: string) => void;
  onProofUpload: () => void;
  onClose: () => void;
}) {
  const [pendingStatus, setPendingStatus] = useState<OrderStatus>(order.status);
  const [saving, setSaving] = useState(false);
  const currentIdx = getFlowIdx(order.status);
  const pendingIdx = getFlowIdx(pendingStatus);
  const isDirty = pendingStatus !== order.status;

  // 송장번호 입력 상태
  const [shippingCourier, setShippingCourier] = useState(order.shipping?.courier ?? "CJ대한통운");
  const [trackingNumber, setTrackingNumber] = useState(order.shipping?.trackingNumber ?? "");

  // 관리자 메시지 (시안제작중 등 상태 변경 시)
  const [adminMessage, setAdminMessage] = useState(order.adminMessage ?? "");

  const needsTracking = pendingStatus === "shipping";
  const needsMessage = pendingStatus === "designing" && isDirty;

  const handleSave = async () => {
    if (!isDirty) return;
    // 배송 중으로 변경 시 송장번호 필수
    if (needsTracking && !trackingNumber.trim()) {
      alert("송장번호를 입력해주세요.");
      return;
    }
    setSaving(true);
    try {
      let extra: Partial<Order> | undefined;
      if (needsTracking) {
        extra = {
          shipping: {
            courier: shippingCourier,
            trackingNumber: trackingNumber.trim(),
            shippedAt: new Date().toISOString(),
          },
        };
      }
      if (adminMessage.trim()) {
        extra = { ...(extra ?? {}), adminMessage: adminMessage.trim() };
      }
      await onStatusChange(order.id, pendingStatus, extra);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* 배경 오버레이 */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* 드로어 패널 (오른쪽 슬라이드) */}
      <div className="relative ml-auto w-full sm:max-w-3xl h-full bg-white shadow-2xl flex flex-col overflow-hidden animate-slide-in-right">
        {/* ── 드로어 헤더 ── */}
        <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-6 py-3 sm:py-4 border-b border-gray-100 bg-gray-50 shrink-0">
          <StatusBadge status={order.status} />
          {isDirty && (
            <>
              <span className="text-gray-400 text-xs">→</span>
              <StatusBadge status={pendingStatus} />
              <span className="text-xs text-amber-600 font-semibold bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-lg">미저장</span>
            </>
          )}
          <div className="flex-1 min-w-0">
            <p className="font-bold text-gray-900 truncate">{order.userName}</p>
            <p className="font-mono text-xs text-gray-400">{order.orderNumber}</p>
          </div>
          {order.userPhone && (
            <span className="hidden sm:inline text-xs text-gray-500 bg-white border border-gray-200 px-2 py-1 rounded-lg">{order.userPhone}</span>
          )}
          <button onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-xl text-gray-500 hover:text-gray-800 transition-colors ml-1">
            <X size={18} />
          </button>
        </div>

        {/* ── 드로어 본문 (스크롤 가능) ── */}
        <div className="flex-1 overflow-y-auto px-3 sm:px-6 py-4 sm:py-5 space-y-4 sm:space-y-5">

        {/* ── 진행 단계 바 ── */}
        <div className="bg-white rounded-lg border border-gray-100 p-3 sm:p-5 shadow-sm">
          <p className="text-[10px] sm:text-xs font-bold text-gray-400 mb-3 sm:mb-4 flex items-center gap-1">
            <ArrowUpDown size={11} /> 단계를 클릭해 선택 후 하단 저장
          </p>
          <div className="flex items-center gap-0 overflow-x-auto scrollbar-hide pb-1">
            {FLOW_STEPS.map((step, i) => {
              const isCurrent = i === currentIdx;
              const isPending = i === pendingIdx && isDirty;
              const isDone    = i < pendingIdx;
              const isFuture  = i > pendingIdx;
              return (
                <div key={step.key} className="flex items-center flex-1 min-w-0">
                  <button
                    onClick={() => setPendingStatus(step.key)}
                    title={isCurrent ? "현재 단계" : `→ ${step.label}로 변경 예정`}
                    className={`flex flex-col items-center gap-1.5 w-full py-3 rounded-lg transition-all group relative
                      ${isPending  ? "bg-amber-500 text-white shadow-md ring-2 ring-amber-300" : ""}
                      ${isCurrent && !isDirty ? "bg-primary-600 text-white shadow-md cursor-default" : ""}
                      ${isCurrent && isDirty  ? "bg-primary-100 text-primary-600 ring-1 ring-primary-300" : ""}
                      ${isDone && !isPending ? "text-primary-500 hover:bg-primary-50 cursor-pointer" : ""}
                      ${isFuture ? "text-gray-300 hover:bg-gray-100 hover:text-gray-500 cursor-pointer" : ""}`}
                  >
                    <span className="text-lg leading-none">{step.emoji}</span>
                    <span className={`text-[10px] font-semibold whitespace-nowrap leading-none
                      ${isPending ? "text-white" : isCurrent && !isDirty ? "text-white" : isCurrent ? "text-primary-600" : isDone ? "text-primary-500" : "text-gray-400 group-hover:text-gray-600"}`}>
                      {step.label}
                    </span>
                    {isCurrent && <span className={`text-[9px] font-normal ${isDirty ? "text-primary-400" : "text-primary-200"}`}>현재</span>}
                    {isPending  && <span className="text-[9px] text-amber-100 font-normal">선택됨</span>}
                  </button>
                  {i < FLOW_STEPS.length - 1 && (
                    <div className={`w-4 h-0.5 shrink-0 rounded transition-colors
                      ${i < pendingIdx ? "bg-primary-400" : "bg-gray-200"}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── 송장번호 입력 (배송 중 선택 시) ── */}
        {needsTracking && (
          <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-4">
            <p className="text-sm font-bold text-orange-800 mb-3 flex items-center gap-2">
              <Truck size={15} /> 택배 송장 정보 (필수)
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="sm:w-40">
                <label className="text-xs font-semibold text-gray-500 block mb-1">택배사</label>
                <select value={shippingCourier} onChange={e => setShippingCourier(e.target.value)}
                  className="w-full px-3 py-2.5 border border-orange-200 rounded-lg text-sm bg-white focus:outline-none focus:border-orange-400">
                  {["CJ대한통운","한진택배","롯데택배","우체국택배","로젠택배","경동택배","대신택배","일양로지스","기타"].map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <label className="text-xs font-semibold text-gray-500 block mb-1">송장번호</label>
                <input
                  type="text"
                  value={trackingNumber}
                  onChange={e => setTrackingNumber(e.target.value)}
                  placeholder="송장번호를 입력하세요"
                  className={`w-full px-3 py-2.5 border rounded-lg text-sm font-mono focus:outline-none ${
                    trackingNumber.trim() ? "border-orange-200 focus:border-orange-400" : "border-red-300 bg-red-50 focus:border-red-400"
                  }`}
                />
                {!trackingNumber.trim() && (
                  <p className="text-xs text-red-500 mt-1">* 배송 중으로 변경하려면 송장번호를 입력해야 합니다</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── 관리자 메시지 입력 (시안제작중 등 상태 변경 시) ── */}
        {needsMessage && (
          <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-4">
            <p className="text-sm font-bold text-purple-800 mb-2 flex items-center gap-2">
              <MessageSquare size={15} /> 고객에게 전할 메시지
            </p>
            <p className="text-xs text-purple-600 mb-3">시안 제작을 시작하면서 고객에게 전달할 메시지를 입력하세요. (선택)</p>
            <textarea
              value={adminMessage}
              onChange={e => setAdminMessage(e.target.value)}
              rows={3}
              placeholder={"예) 시안 제작을 시작합니다. 약 1~2일 내 시안을 전달드릴 예정이에요."}
              className="w-full px-3 py-2.5 border border-purple-200 rounded-lg text-sm focus:outline-none focus:border-purple-400 bg-white resize-none"
            />
          </div>
        )}

        {/* 기존 관리자 메시지 표시 */}
        {order.adminMessage && !needsMessage && (
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
            <p className="text-xs font-bold text-purple-700 mb-2 flex items-center gap-2">
              <MessageSquare size={13} /> 관리자 메시지
            </p>
            <p className="text-sm text-purple-900 whitespace-pre-wrap">{order.adminMessage}</p>
          </div>
        )}

        {/* ── 대화 히스토리 (시안 수정 대화) ── */}
        <ConversationPanel order={order} onOrderUpdate={(updated) => {
          // 부모 상태 업데이트는 모달이 닫힐 때 reload로 처리
        }} />

        {/* ── 수정요청 빠른 액션 (proof_revision 상태) ── */}
        {order.status === "proof_revision" && (
          <div className="bg-orange-50 border-2 border-orange-300 rounded-xl p-4">
            <p className="text-xs text-orange-600 mb-3">수정 내용을 반영한 시안을 아래에서 다시 업로드하거나, 바로 시안 제작 단계로 이동하세요.</p>
            <button
              onClick={() => {
                setPendingStatus("designing");
              }}
              className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white py-2.5 rounded-lg text-sm font-bold transition-colors shadow-sm"
            >
              <RotateCcw size={14} /> 수정 확인 → 시안 재제작 시작
            </button>
          </div>
        )}

        {/* 기존 송장 정보 표시 */}
        {order.shipping && !needsTracking && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <p className="text-xs font-bold text-blue-700 mb-2 flex items-center gap-2">
              <Truck size={13} /> 등록된 송장 정보
            </p>
            <div className="flex gap-4 text-sm">
              <span className="text-gray-500">{order.shipping.courier}</span>
              <span className="font-mono font-bold text-blue-800">{order.shipping.trackingNumber}</span>
              <span className="text-gray-400 text-xs">{order.shipping.shippedAt?.slice(0, 10)}</span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* ── 좌: 시안 이미지 & 업로드 ── */}
        <div className="lg:col-span-2 space-y-4">

          {/* 기존 시안 이미지 */}
          {(order.design?.previewImageUrl || order.proof?.imageUrl) && (
            <div className="bg-white rounded-xl border border-gray-100 p-4">
              <p className="text-xs font-bold text-gray-400 mb-3 flex items-center gap-1">
                <Eye size={11} /> 시안 이미지
              </p>
              <div className="grid grid-cols-2 gap-3">
                {order.design?.previewImageUrl && (
                  <div>
                    <p className="text-[10px] text-gray-400 mb-1">주문 첨부 이미지</p>
                    <img src={order.design.previewImageUrl} alt="주문 이미지"
                      className="w-full rounded-lg border border-gray-200 object-contain max-h-40 bg-gray-50 cursor-zoom-in"
                      onClick={() => window.open(order.design.previewImageUrl, "_blank")} />
                  </div>
                )}
                {order.proof?.imageUrl && (
                  <div>
                    <p className="text-[10px] text-gray-400 mb-1">전달한 시안</p>
                    <img src={order.proof.imageUrl} alt="전달 시안"
                      className="w-full rounded-lg border border-gray-200 object-contain max-h-40 bg-gray-50 cursor-zoom-in"
                      onClick={() => window.open(order.proof!.imageUrl, "_blank")} />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 시안 업로드 섹션 */}
          {(["designing", "proof_revision", "confirming", "proof_sent"].includes(order.status)) && (
            <div className="bg-white rounded-xl border border-dashed border-primary-300 p-4">
              <p className="text-xs font-bold text-primary-600 mb-3 flex items-center gap-1">
                <Upload size={11} /> 시안 전달 — 파일 업로드 또는 URL 입력
              </p>

              {/* 파일 선택 */}
              <label className="flex items-center gap-2 mb-3 cursor-pointer group">
                <div className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-500 group-hover:border-primary-400 transition-colors bg-gray-50">
                  {proofFile ? proofFile.name : "이미지 파일 선택 (PNG, JPG, WEBP)"}
                </div>
                <span className="text-xs px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium text-gray-600 transition-colors shrink-0">
                  파일 선택
                </span>
                <input type="file" accept="image/*" className="hidden"
                  onChange={e => onProofFileChange(e.target.files?.[0] ?? null)} />
              </label>

              {/* URL 직접 입력 */}
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-gray-400 shrink-0">또는 URL:</span>
                <input
                  type="url"
                  value={proofUrlInput}
                  onChange={e => onProofUrlChange(e.target.value)}
                  placeholder="https://... (이미지 URL 직접 입력)"
                  className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-primary-400 bg-gray-50"
                />
              </div>

              <button onClick={onProofUpload} disabled={uploading || (!proofFile && !proofUrlInput.trim())}
                className="mt-3 w-full flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white py-2.5 rounded-xl text-sm font-semibold transition-colors disabled:opacity-50">
                {uploading
                  ? <><Loader2 size={15} className="animate-spin" /> 업로드 중...</>
                  : <><Send size={14} /> 시안 전달 + 카카오 알림 발송</>
                }
              </button>
            </div>
          )}

          {/* 추가 요구사항 */}
          {order.design?.userRequirements && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <p className="text-xs font-bold text-yellow-700 mb-2 flex items-center gap-1">
                <MessageSquare size={11} /> 고객 요구사항
              </p>
              <p className="text-sm text-yellow-900 whitespace-pre-wrap">{order.design.userRequirements}</p>
            </div>
          )}
        </div>

        {/* ── 우: 주문 상세 정보 ── */}
        <div className="space-y-3">

          {/* 고객 정보 */}
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <p className="text-xs font-bold text-gray-400 mb-3 flex items-center gap-1"><User size={11} /> 고객 정보</p>
            <div className="space-y-1.5 text-xs">
              <InfoRow label="이름" value={order.userName} />
              <InfoRow label="전화" value={order.userPhone || "—"} />
              <InfoRow label="이메일" value={order.userEmail} />
              <p className="font-mono text-[10px] text-gray-300 break-all pt-1 border-t border-gray-50">{order.id}</p>
            </div>
          </div>

          {/* 제품 정보 */}
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <p className="text-xs font-bold text-gray-400 mb-3 flex items-center gap-1"><Package size={11} /> 제품 정보</p>
            <div className="space-y-1.5 text-xs">
              {order.product.productName && <InfoRow label="상품" value={order.product.productName} />}
              {order.product.orderType && <InfoRow label="유형" value={order.product.orderType} />}
              {order.product.type && <InfoRow label="종류" value={order.product.type} />}
              {order.product.material && <InfoRow label="재질" value={order.product.material} />}
              {order.product.width && order.product.height && <InfoRow label="사이즈" value={`${order.product.width}×${order.product.height}cm`} />}
              <InfoRow label="수량" value={`${order.product.quantity}개`} />
              {order.product.options?.length > 0 && (
                <InfoRow label="옵션" value={order.product.options.join(", ")} />
              )}
              {order.product.specs && Object.entries(order.product.specs).map(([k, v]) => (
                <InfoRow key={k} label={k} value={String(v)} />
              ))}
            </div>
          </div>

          {/* 배송 정보 */}
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <p className="text-xs font-bold text-gray-400 mb-3 flex items-center gap-1"><MapPin size={11} /> 배송 정보</p>
            <div className="space-y-1.5 text-xs">
              <p className="text-gray-700">{order.delivery?.address}</p>
              {order.delivery?.addressDetail && <p className="text-gray-500">{order.delivery.addressDetail}</p>}
              {order.delivery?.memo && <p className="text-gray-400 italic">"{order.delivery.memo}"</p>}
            </div>
          </div>

          {/* 결제 정보 */}
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <p className="text-xs font-bold text-gray-400 mb-3 flex items-center gap-1"><CreditCard size={11} /> 결제</p>
            <div className="space-y-1.5 text-xs">
              <InfoRow label="합계" value={`${order.pricing.totalPrice.toLocaleString()}원`} bold />
              {order.payment ? (
                <>
                  <InfoRow label="방법" value={order.payment.method} />
                  <InfoRow label="금액" value={`${order.payment.amount?.toLocaleString()}원`} />
                  <InfoRow label="PG사" value={order.payment.pgProvider ?? "—"} />
                </>
              ) : (
                <p className="text-gray-400">미결제</p>
              )}
            </div>

            {/* 결제 대기 상태일 때 계좌 안내 */}
            {(order.status === "proof_approved") && !order.payment && (
              <BankAccountBox totalPrice={order.pricing.totalPrice} />
            )}
          </div>

          {/* 빠른 링크 */}
          <div className="flex flex-col gap-2">
            <button onClick={() => window.open(`/order/${order.id}`, "_blank")}
              className="flex items-center justify-center gap-1.5 text-xs bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 px-3 py-2 rounded-xl transition-colors">
              <ExternalLink size={11} /> 고객 주문 상세 보기
            </button>
            <button onClick={() => window.open(`/order/${order.id}/proof`, "_blank")}
              className="flex items-center justify-center gap-1.5 text-xs bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100 px-3 py-2 rounded-xl transition-colors">
              <Eye size={11} /> 시안 확인 페이지
            </button>
          </div>
        </div>

        </div>
        </div>{/* 스크롤 영역 끝 */}

        {/* ── 하단 고정 저장 푸터 ── */}
        <div className="shrink-0 border-t border-gray-100 bg-white px-6 py-4 flex items-center gap-3">
          {isDirty ? (
            <>
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <span className="text-xs text-gray-400 shrink-0">변경:</span>
                <StatusBadge status={order.status} />
                <span className="text-gray-400 text-xs">→</span>
                <StatusBadge status={pendingStatus} />
              </div>
              <button
                onClick={() => setPendingStatus(order.status)}
                className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-500 hover:bg-gray-50 transition-colors shrink-0"
              >
                되돌리기
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-sm font-bold transition-colors disabled:opacity-60 shrink-0 shadow-sm"
              >
                {saving
                  ? <><Loader2 size={14} className="animate-spin" /> 저장 중...</>
                  : <><CircleCheck size={15} /> 저장하기</>
                }
              </button>
            </>
          ) : (
            <div className="flex items-center gap-2 flex-1 text-xs text-gray-400">
              <CircleCheck size={14} className="text-green-500" />
              저장됨 — 단계를 클릭해 상태를 변경할 수 있어요
            </div>
          )}
          <button onClick={onClose}
            className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-500 hover:bg-gray-50 transition-colors shrink-0">
            닫기
          </button>
        </div>

      </div>
    </div>
  );
}

// ── 대화 히스토리 패널 (관리자용) ──
function ConversationPanel({ order, onOrderUpdate }: { order: Order; onOrderUpdate: (o: Order) => void }) {
  const [messages, setMessages] = useState<ConversationMessage[]>(order.conversations ?? []);
  const [newMsg, setNewMsg] = useState("");
  const [sending, setSending] = useState(false);
  const [expanded, setExpanded] = useState(
    order.status === "proof_revision" || order.status === "proof_sent" || (order.conversations?.length ?? 0) > 0
  );
  const scrollRef = useRef<HTMLDivElement>(null);

  // 스크롤 하단 고정
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages.length, expanded]);

  const handleSend = async () => {
    if (!newMsg.trim() || sending) return;
    setSending(true);
    try {
      const msg = await addConversation(order.id, "admin", newMsg.trim());
      setMessages(prev => [...prev, msg]);
      setNewMsg("");
    } catch {
      alert("메시지 전송 실패");
    } finally {
      setSending(false);
    }
  };

  const msgCount = messages.length;
  const revisionCount = messages.filter(m => m.type === "revision").length;
  const proofCount = messages.filter(m => m.type === "proof").length;

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* 헤더 — 접기/펴기 */}
      <button onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-2 px-4 py-3 hover:bg-gray-50 transition-colors text-left">
        <MessageSquare size={14} className="text-primary-500" />
        <span className="text-sm font-bold text-gray-700">시안 대화</span>
        {msgCount > 0 && (
          <span className="text-[10px] bg-primary-100 text-primary-600 px-1.5 py-0.5 rounded-full font-bold">{msgCount}</span>
        )}
        {revisionCount > 0 && (
          <span className="text-[10px] bg-orange-100 text-orange-600 px-1.5 py-0.5 rounded-full font-bold">수정 {revisionCount}회</span>
        )}
        {proofCount > 0 && (
          <span className="text-[10px] bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded-full font-bold">시안 {proofCount}차</span>
        )}
        <div className="ml-auto">
          {expanded ? <ChevronUp size={14} className="text-gray-400" /> : <ChevronDown size={14} className="text-gray-400" />}
        </div>
      </button>

      {expanded && (
        <div className="border-t border-gray-100">
          {/* 대화 목록 */}
          <div ref={scrollRef} className="max-h-72 overflow-y-auto p-3 space-y-2.5 bg-gray-50">
            {messages.length === 0 ? (
              <p className="text-xs text-gray-400 text-center py-6">아직 대화가 없습니다.</p>
            ) : (
              messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === "admin" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 ${
                    msg.sender === "admin"
                      ? "bg-primary-600 text-white rounded-br-sm"
                      : msg.type === "system"
                      ? "bg-gray-200 text-gray-500 text-center w-full text-[10px] py-1.5 rounded-lg"
                      : "bg-white border border-gray-200 text-gray-800 rounded-bl-sm shadow-sm"
                  }`}>
                    <p className={`text-[10px] font-bold mb-0.5 ${
                      msg.sender === "admin" ? "text-primary-200" : "text-gray-400"
                    }`}>
                      {msg.sender === "admin" ? "관리자" : "고객"}
                      {msg.type === "proof" && " · 시안 전달"}
                      {msg.type === "revision" && " · 수정 요청"}
                      {msg.type === "approve" && " · ✅ 승인"}
                    </p>
                    {msg.imageUrl && (
                      <img src={msg.imageUrl} alt="시안"
                        className="w-full rounded-lg mb-1.5 cursor-zoom-in max-h-32 object-contain bg-gray-50 border border-white/20"
                        onClick={() => window.open(msg.imageUrl!, "_blank")} />
                    )}
                    <p className="text-xs whitespace-pre-wrap">{msg.content}</p>
                    <p className={`text-[9px] mt-1 ${msg.sender === "admin" ? "text-primary-300" : "text-gray-400"}`}>
                      {new Date(msg.createdAt).toLocaleString("ko-KR", {
                        month: "short", day: "numeric", hour: "2-digit", minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* 메시지 입력 */}
          <div className="flex gap-2 p-3 border-t border-gray-100 bg-white">
            <input
              type="text" value={newMsg}
              onChange={e => setNewMsg(e.target.value)}
              onKeyDown={e => e.key === "Enter" && !e.shiftKey && handleSend()}
              placeholder="메시지를 입력하세요..."
              className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary-400 bg-gray-50"
            />
            <button onClick={handleSend} disabled={sending || !newMsg.trim()}
              className="flex items-center gap-1.5 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-semibold disabled:opacity-50 transition-colors shrink-0">
              {sending ? <Loader2 size={13} className="animate-spin" /> : <Send size={13} />}
              전송
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// 정보 행 컴포넌트
function InfoRow({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex justify-between gap-2">
      <span className="text-gray-400 shrink-0">{label}</span>
      <span className={`text-right break-all ${bold ? "font-bold text-primary-600" : "text-gray-700"}`}>{value}</span>
    </div>
  );
}

// 계좌 안내 박스 (결제 대기 상태)
const ADMIN_BANK_INFO = {
  bank: "농협",
  account: "352-1400-1028-63",
  holder: "보라미디어/전동찬",
};

function BankAccountBox({ totalPrice }: { totalPrice: number }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="mt-3 bg-amber-50 border border-amber-200 rounded-lg p-3">
      <p className="text-xs font-bold text-amber-700 mb-2 flex items-center gap-1">
        <Banknote size={12} /> 고객 입금 계좌 안내
      </p>
      <div className="space-y-1.5 text-xs">
        <div className="flex justify-between">
          <span className="text-amber-600">은행</span>
          <span className="font-semibold text-gray-800">{ADMIN_BANK_INFO.bank}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-amber-600">계좌번호</span>
          <span className="font-mono font-bold text-gray-900">{ADMIN_BANK_INFO.account}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-amber-600">예금주</span>
          <span className="font-semibold text-gray-800">{ADMIN_BANK_INFO.holder}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-amber-600">입금 금액</span>
          <span className="font-bold text-primary-600">{totalPrice.toLocaleString()}원</span>
        </div>
      </div>
      <button
        onClick={() => handleCopy(`${ADMIN_BANK_INFO.bank} ${ADMIN_BANK_INFO.account} ${ADMIN_BANK_INFO.holder} ${totalPrice.toLocaleString()}원`)}
        className={`mt-2.5 w-full flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-all ${
          copied
            ? "bg-green-100 text-green-700 border border-green-300"
            : "bg-white text-amber-700 border border-amber-300 hover:bg-amber-100"
        }`}
      >
        {copied ? (
          <><CircleCheck size={12} /> 복사 완료!</>
        ) : (
          <><ClipboardList size={12} /> 계좌 정보 복사하기</>
        )}
      </button>
    </div>
  );
}

export default function AdminDashboard() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("dashboard");

  // ── 주문 관리 상태 ──
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState<OrderStatus | "all">("all");
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [modalOrder, setModalOrder] = useState<Order | null>(null);
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [proofUrlInput, setProofUrlInput] = useState("");
  const [uploading, setUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"date" | "amount">("date");
  const [sortDir, setSortDir] = useState<"desc" | "asc">("desc");

  // ── 테스트 도구 상태 ──
  const [testAmount, setTestAmount] = useState("30000");
  const [testPayChoice, setTestPayChoice] = useState<"CARD" | "KAKAOPAY">("CARD");
  const [testPaying, setTestPaying] = useState(false);
  const [testOrderCreating, setTestOrderCreating] = useState(false);
  const [kakaoPhone, setKakaoPhone] = useState("01080071895");
  const [kakaoType, setKakaoType] = useState<"proof_sent" | "payment_complete">("proof_sent");
  const [kakaoSending, setKakaoSending] = useState(false);
  const [manualOrderId, setManualOrderId] = useState("");
  const [manualStatus, setManualStatus] = useState<OrderStatus>("designing");
  const [manualUpdating, setManualUpdating] = useState(false);

  // ── 토스트 ──
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" | "info" } | null>(null);
  const showToast = useCallback((msg: string, type: "success" | "error" | "info" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  }, []);

  // ── 주문 불러오기 ──
  const loadOrders = useCallback(async () => {
    setLoadingOrders(true);
    try {
      const data = await getAllOrders();
      setOrders(data);
    } finally {
      setLoadingOrders(false);
    }
  }, []);

  useEffect(() => { loadOrders(); }, [loadOrders]);

  // ── 통계 계산 ──
  const stats = useMemo(() => {
    const totalRevenue = orders.filter(o => o.payment).reduce((sum, o) => sum + (o.payment?.amount ?? 0), 0);
    const today = new Date().toISOString().slice(0, 10);
    const todayOrders = orders.filter(o => o.createdAt?.slice(0, 10) === today).length;
    const thisWeek = (() => {
      const d = new Date(); d.setDate(d.getDate() - 7);
      return orders.filter(o => new Date(o.createdAt) >= d).length;
    })();
    return {
      total:       orders.length,
      pending:     orders.filter(o => ["pending","confirming"].includes(o.status)).length,
      designing:   orders.filter(o => ["designing","proof_sent","proof_revision"].includes(o.status)).length,
      paid:        orders.filter(o => ["paid","producing","shipping","delivered"].includes(o.status)).length,
      delivered:   orders.filter(o => o.status === "delivered").length,
      totalRevenue,
      todayOrders,
      thisWeek,
      pipelineCount: STATUS_PIPELINE.reduce((acc, s) => ({
        ...acc, [s]: orders.filter(o => o.status === s).length
      }), {} as Record<OrderStatus, number>),
    };
  }, [orders]);

  // ── 필터+검색+정렬된 주문 목록 ──
  const filteredOrders = useMemo(() => {
    let list = filter === "all" ? orders : orders.filter(o => o.status === filter);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(o =>
        o.orderNumber?.toLowerCase().includes(q) ||
        o.userName?.toLowerCase().includes(q) ||
        o.userPhone?.includes(q) ||
        o.userEmail?.toLowerCase().includes(q)
      );
    }
    return [...list].sort((a, b) => {
      if (sortBy === "amount") {
        const diff = a.pricing.totalPrice - b.pricing.totalPrice;
        return sortDir === "desc" ? -diff : diff;
      }
      const diff = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      return sortDir === "desc" ? -diff : diff;
    });
  }, [orders, filter, searchQuery, sortBy, sortDir]);

  // ── 상태 변경 ──
  const handleStatusChange = async (orderId: string, next: OrderStatus, extra?: Partial<Order>) => {
    await updateOrderStatus(orderId, next, extra);
    showToast(`상태를 '${ORDER_STATUS_LABEL[next]}'로 변경했어요.`);
    loadOrders();
  };

  // ── 시안 업로드 (파일 또는 URL) ──
  const handleProofUpload = async (targetOrder?: Order) => {
    const order = targetOrder ?? selectedOrder;
    if (!order) return;
    if (!proofFile && !proofUrlInput.trim()) {
      showToast("파일을 선택하거나 이미지 URL을 입력하세요.", "error"); return;
    }
    setUploading(true);
    try {
      let imageUrl = proofUrlInput.trim();

      // 파일이 있으면 서버 API를 통해 Firebase Storage 업로드
      if (proofFile) {
        const formData = new FormData();
        formData.append("file", proofFile);
        formData.append("orderId", order.id);
        const uploadRes = await fetch("/api/upload/proof", { method: "POST", body: formData });
        if (!uploadRes.ok) {
          const errData = await uploadRes.json().catch(() => ({}));
          showToast(`업로드 실패: ${errData.error ?? uploadRes.statusText}`, "error");
          return;
        }
        const { url } = await uploadRes.json();
        imageUrl = url;
      }

      if (!imageUrl) { showToast("업로드 실패: 이미지 URL 없음", "error"); return; }

      await saveProof(order.id, imageUrl);

      // 카카오 알림은 실패해도 시안 전달은 유지
      let kakaoOk = false;
      try {
        await fetch("/api/kakao/notify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "proof_sent",
            phone: order.userPhone,
            orderNumber: order.orderNumber,
            proofUrl: `${window.location.origin}/order/${order.id}/proof`,
          }),
        });
        kakaoOk = true;
      } catch {}
      showToast(kakaoOk
        ? "시안 전달 완료! 카카오 알림이 발송됐어요."
        : "시안 전달 완료! (카카오 알림 발송 실패)");
      // 모달 내 order 즉시 반영 (시안 이미지 + 상태 + 대화 기록)
      const proofMsg: ConversationMessage = {
        id: `msg-${Date.now()}`,
        sender: "admin",
        type: "proof",
        content: "시안을 전달합니다. 확인 후 승인 또는 수정 요청 부탁드립니다.",
        imageUrl,
        createdAt: new Date().toISOString(),
      };
      const updatedOrder = {
        ...order,
        status: "proof_sent" as const,
        proof: { imageUrl, sentAt: new Date().toISOString() },
        conversations: [...(order.conversations ?? []), proofMsg],
      };
      setModalOrder(prev => prev?.id === order.id ? updatedOrder : prev);
      setOrders(prev => prev.map(o => o.id === order.id ? updatedOrder : o));
      setProofFile(null);
      setProofUrlInput("");
    } catch (e: any) {
      showToast(`시안 업로드 오류: ${e?.message ?? "알 수 없는 오류"}`, "error");
    } finally {
      setUploading(false);
    }
  };

  // ── [테스트] 더미 주문 생성 ──
  const handleCreateTestOrder = async () => {
    setTestOrderCreating(true);
    try {
      const uid = auth.currentUser?.uid;
      const orderId = await createTestOrder(uid);
      showToast("테스트 주문이 생성됐어요! 결제 페이지로 이동합니다.", "info");
      await loadOrders();
      setTimeout(() => router.push(`/order/${orderId}/payment`), 1200);
    } catch (e: any) {
      console.error("[createTestOrder 실패]", e);
      const msg = e?.code === "permission-denied"
        ? "Firestore 권한 오류 – Firebase 콘솔에서 보안 규칙을 확인하세요."
        : `테스트 주문 생성 실패: ${e?.message ?? "알 수 없는 오류"}`;
      showToast(msg, "error");
    } finally {
      setTestOrderCreating(false);
    }
  };

  // ── [테스트] PortOne 결제 테스트 ──
  const handleTestPayment = async () => {
    const storeId    = process.env.NEXT_PUBLIC_PORTONE_STORE_ID;
    const isKakao    = testPayChoice === "KAKAOPAY";
    const channelKey = isKakao
      ? process.env.NEXT_PUBLIC_PORTONE_CHANNEL_KEY_KAKAO
      : process.env.NEXT_PUBLIC_PORTONE_CHANNEL_KEY_TOSS;
    if (!storeId || !channelKey) { showToast("PortOne 환경변수 미설정", "error"); return; }
    setTestPaying(true);
    try {
      const paymentId = `test-admin-${Date.now()}`;
      const amount    = Number(testAmount) || 1000;
      const common    = {
        storeId, channelKey, paymentId,
        orderName: `[테스트] 주보라 결제 테스트`,
        totalAmount: amount, currency: "KRW" as const,
        customer: { fullName: "테스트 고객", email: "test@jubora.co.kr", phoneNumber: "01000000000" },
        redirectUrl: `${window.location.origin}/api/payment/confirm`,
      };
      const res = isKakao
        ? await PortOne.requestPayment({ ...common, payMethod: "EASY_PAY", easyPay: { easyPayProvider: "KAKAOPAY" } })
        : await PortOne.requestPayment({ ...common, payMethod: "CARD" });
      if (res?.code) {
        if (res.code !== "PORTONE_USER_CANCEL") showToast(`결제 오류: ${res.message}`, "error");
        else showToast("결제 창을 닫았습니다.", "info");
      } else {
        showToast(`결제 완료! paymentId: ${paymentId}`);
      }
    } catch (e: any) {
      showToast(`오류: ${e.message}`, "error");
    } finally {
      setTestPaying(false);
    }
  };

  // ── [테스트] 카카오 알림톡 ──
  const handleKakaoTest = async () => {
    setKakaoSending(true);
    try {
      const body = kakaoType === "proof_sent"
        ? { type: "proof_sent", phone: kakaoPhone, orderNumber: "JB-TEST-0000", proofUrl: `${window.location.origin}/order/test/proof` }
        : { type: "payment_complete", phone: kakaoPhone, orderNumber: "JB-TEST-0000", totalPrice: 30000 };
      const res  = await fetch("/api/kakao/notify", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const data = await res.json();
      if (data.success) showToast("카카오 알림톡 발송 성공!");
      else showToast(`발송 실패: ${data.error ?? "알 수 없는 오류"}`, "error");
    } catch { showToast("카카오 알림 발송 오류", "error"); }
    finally { setKakaoSending(false); }
  };

  // ── [테스트] 상태 수동 변경 ──
  const handleManualStatus = async () => {
    if (!manualOrderId.trim()) { showToast("주문 ID를 입력하세요.", "error"); return; }
    setManualUpdating(true);
    try {
      await updateOrderStatus(manualOrderId.trim(), manualStatus);
      showToast(`${manualOrderId} → ${ORDER_STATUS_LABEL[manualStatus]} 변경 완료`);
      loadOrders();
    } catch { showToast("상태 변경 실패 (주문 ID 확인)", "error"); }
    finally { setManualUpdating(false); }
  };

  // ────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50">
      {toast && <Toast msg={toast.msg} type={toast.type} />}

      {/* ══ 헤더 ══════════════════════════════════ */}
      <div className="bg-white border-b px-3 sm:px-6 py-3 sm:py-3.5 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-2 sm:gap-4 min-w-0">
          {/* 로고 – 클릭 시 메인 홈으로 */}
          <Link href="/" className="flex items-center gap-2 group shrink-0" title="메인 홈으로 이동">
            <img src="/logo.png" alt="주보라" className="h-8 sm:h-9 w-auto" />
          </Link>
          <div className="h-5 sm:h-6 w-px bg-gray-200 hidden sm:block" />
          <div className="flex items-center gap-1 sm:gap-1.5">
            <ShieldCheck size={14} className="text-red-500 sm:w-4 sm:h-4" />
            <span className="font-bold text-gray-700 text-xs sm:text-sm">관리자</span>
            <span className="bg-red-500 text-white text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full font-bold">ADMIN</span>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <Link href="/" className="hidden sm:flex items-center gap-1.5 text-xs text-gray-500 hover:text-primary-600 transition-colors px-3 py-1.5 border border-gray-200 rounded-xl hover:bg-primary-50">
            <Home size={13} /> 홈으로
          </Link>
          <button onClick={loadOrders} title="새로고침"
            className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-xl text-gray-500 transition-colors border border-gray-200">
            <RefreshCw size={14} className={loadingOrders ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      {/* ══ 탭 네비게이션 ══════════════════════════ */}
      <div className="bg-white border-b px-3 sm:px-6">
        <div className="flex gap-0 max-w-7xl mx-auto overflow-x-auto scrollbar-hide">
          {([
            { id: "dashboard", label: "대시보드",   icon: "📊", badge: null },
            { id: "orders",    label: "주문관리",   icon: "📋", badge: stats.pending > 0 ? stats.pending : null },
            { id: "products",  label: "제품관리",   icon: "📦", badge: null },
            { id: "payments",  label: "결제내역",   icon: "💳", badge: null },
            { id: "test",      label: "테스트",     icon: "🧪", badge: null },
          ] as const).map(({ id, label, icon, badge }) => (
            <button key={id} onClick={() => setTab(id)}
              className={`shrink-0 relative px-3 sm:px-5 py-3 sm:py-3.5 text-xs sm:text-sm font-medium transition-colors border-b-2 -mb-px whitespace-nowrap
                ${tab === id
                  ? "border-primary-600 text-primary-600"
                  : "border-transparent text-gray-500 hover:text-gray-800"}`}>
              <span className="mr-1">{icon}</span>{label}
              {badge !== null && (
                <span className="ml-1 bg-red-500 text-white text-[10px] sm:text-xs rounded-full px-1.5 py-0.5">{badge}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-8">

        {/* ══════════════════════════════════════════
            탭 0: 대시보드
        ══════════════════════════════════════════ */}
        {tab === "dashboard" && (
          <>
            {/* KPI 카드 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 mb-6 sm:mb-8">
              <StatCard icon={<Banknote size={22} className="text-emerald-600" />}
                label="총 매출" value={`${(stats.totalRevenue / 10000).toFixed(1)}만원`}
                sub={`결제완료 ${stats.paid}건`} color="bg-emerald-100" />
              <StatCard icon={<Package size={22} className="text-blue-600" />}
                label="전체 주문" value={stats.total}
                sub={`이번 주 +${stats.thisWeek}건`} color="bg-blue-100" />
              <StatCard icon={<Clock size={22} className="text-amber-600" />}
                label="신규 접수" value={stats.pending}
                sub="처리 대기 중" color="bg-amber-100" />
              <StatCard icon={<Truck size={22} className="text-purple-600" />}
                label="배송 완료" value={stats.delivered}
                sub={`총 ${stats.total}건 중`} color="bg-purple-100" />
            </div>

            {/* 파이프라인 현황 */}
            <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-4 sm:p-6 mb-6">
              <h2 className="font-bold text-gray-900 mb-4 sm:mb-5 flex items-center gap-2 text-sm sm:text-base">
                <BarChart2 size={18} className="text-primary-500" /> 주문 파이프라인 현황
              </h2>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-3">
                {([
                  { status: "pending",        label: "접수",    emoji: "📥", color: "bg-gray-100 text-gray-700" },
                  { status: "designing",      label: "시안제작", emoji: "🎨", color: "bg-purple-100 text-purple-700" },
                  { status: "proof_sent",     label: "시안전달", emoji: "📤", color: "bg-blue-100 text-blue-700" },
                  { status: "proof_approved", label: "시안승인", emoji: "✅", color: "bg-green-100 text-green-700" },
                  { status: "paid",           label: "결제완료", emoji: "💰", color: "bg-emerald-100 text-emerald-700" },
                  { status: "producing",      label: "제작중",   emoji: "🖨️", color: "bg-cyan-100 text-cyan-700" },
                  { status: "shipping",       label: "배송중",   emoji: "🚚", color: "bg-orange-100 text-orange-700" },
                  { status: "delivered",      label: "배송완료", emoji: "📦", color: "bg-gray-100 text-gray-600" },
                  { status: "proof_revision", label: "수정요청", emoji: "✏️", color: "bg-red-100 text-red-600" },
                  { status: "confirming",     label: "확인중",   emoji: "🔍", color: "bg-yellow-100 text-yellow-700" },
                ] as { status: OrderStatus; label: string; emoji: string; color: string }[]).map(({ status, label, emoji, color }) => {
                  const count = (stats.pipelineCount as any)[status] ?? 0;
                  return (
                    <button key={status} onClick={() => { setFilter(status); setTab("orders"); }}
                      className={`${color} rounded-xl p-2.5 sm:p-4 text-center hover:opacity-80 transition-opacity`}>
                      <div className="text-lg sm:text-2xl mb-1">{emoji}</div>
                      <div className="text-lg sm:text-2xl font-bold">{count}</div>
                      <div className="text-[10px] sm:text-xs font-medium mt-0.5">{label}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 최근 주문 5건 */}
            <div className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-4 sm:px-6 py-3 sm:py-4 border-b flex items-center justify-between">
                <h2 className="font-bold text-gray-900 flex items-center gap-2 text-sm sm:text-base">
                  <ClipboardList size={18} className="text-primary-500" /> 최근 주문
                </h2>
                <button onClick={() => setTab("orders")}
                  className="text-xs text-primary-600 hover:underline flex items-center gap-1">
                  전체 보기 <ChevronRight size={13} />
                </button>
              </div>
              <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[600px]">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    {["주문번호","고객","금액","상태","접수일"].map(h => (
                      <th key={h} className="text-left text-xs font-semibold text-gray-500 px-5 py-3">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {orders.slice(0, 7).map(order => (
                    <tr key={order.id} className="hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => { setModalOrder(order); setProofFile(null); setProofUrlInput(""); }}>
                      <td className="px-5 py-3 font-mono text-xs text-gray-500">{order.orderNumber}</td>
                      <td className="px-5 py-3 font-medium text-gray-900">{order.userName}</td>
                      <td className="px-5 py-3 font-semibold text-gray-800">{order.pricing.totalPrice.toLocaleString()}원</td>
                      <td className="px-5 py-3"><StatusBadge status={order.status} /></td>
                      <td className="px-5 py-3 text-xs text-gray-400">{order.createdAt.slice(0,10)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
              {orders.length === 0 && (
                <div className="py-12 text-center text-gray-400">
                  <Package size={36} className="mx-auto mb-2 opacity-40" />
                  <p className="text-sm">주문이 없습니다.</p>
                </div>
              )}
            </div>
          </>
        )}

        {/* ══════════════════════════════════════════
            탭 1: 주문 관리
        ══════════════════════════════════════════ */}
        {tab === "orders" && (
          <>
            {/* 요약 수치 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <StatCard icon={<Package size={20} className="text-blue-600" />}    label="전체 주문"    value={stats.total}          color="bg-blue-100" />
              <StatCard icon={<Clock size={20} className="text-amber-600" />}     label="신규 접수"    value={stats.pending}         color="bg-amber-100" />
              <StatCard icon={<TrendingUp size={20} className="text-purple-600" />} label="시안 진행"  value={stats.designing}       color="bg-purple-100" />
              <StatCard icon={<CheckCircle size={20} className="text-emerald-600" />} label="결제 완료" value={stats.paid}           color="bg-emerald-100" />
            </div>

            {/* 검색 + 정렬 툴바 */}
            <div className="flex gap-2 sm:gap-3 mb-4 flex-wrap">
              <div className="relative flex-1 min-w-0 sm:min-w-52">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                  placeholder="이름·전화번호·주문번호 검색"
                  className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-500 bg-white"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    <X size={14} />
                  </button>
                )}
              </div>
              <div className="flex gap-2">
                <button onClick={() => { setSortBy("date"); setSortDir(d => d === "desc" ? "asc" : "desc"); }}
                  className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold border transition-colors
                    ${sortBy === "date" ? "bg-primary-50 border-primary-300 text-primary-700" : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
                  <CalendarDays size={13} /> 날짜
                  {sortBy === "date" && (sortDir === "desc" ? <ChevronDown size={12} /> : <ChevronUp size={12} />)}
                </button>
                <button onClick={() => { setSortBy("amount"); setSortDir(d => d === "desc" ? "asc" : "desc"); }}
                  className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold border transition-colors
                    ${sortBy === "amount" ? "bg-primary-50 border-primary-300 text-primary-700" : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
                  <Banknote size={13} /> 금액
                  {sortBy === "amount" && (sortDir === "desc" ? <ChevronDown size={12} /> : <ChevronUp size={12} />)}
                </button>
              </div>
            </div>

            {/* 상태 필터 */}
            <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
              {(["all","pending","confirming","designing","proof_sent","proof_approved","proof_revision","paid","producing","shipping","delivered"] as const).map((s) => (
                <button key={s} onClick={() => setFilter(s)}
                  className={`shrink-0 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors
                    ${filter === s ? "bg-primary-600 text-white" : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"}`}>
                  {s === "all" ? `전체 (${orders.length})` : `${ORDER_STATUS_LABEL[s]} (${(stats.pipelineCount as any)[s] ?? 0})`}
                </button>
              ))}
            </div>

            {/* 검색 결과 요약 */}
            {searchQuery && (
              <p className="text-sm text-gray-500 mb-3">
                「{searchQuery}」 검색 결과: <span className="font-semibold text-gray-800">{filteredOrders.length}건</span>
              </p>
            )}

            {/* 주문 테이블 */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[700px]">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    {["주문번호","고객","제품","금액","상태","접수일","액션"].map(h => (
                      <th key={h} className="text-left text-xs font-semibold text-gray-500 px-4 py-3 whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredOrders.map(order => (
                    <tr key={order.id}
                      className="hover:bg-blue-50/30 transition-colors cursor-pointer group"
                      onClick={() => { setModalOrder(order); setProofFile(null); setProofUrlInput(""); }}>
                      <td className="px-4 py-3 font-mono text-xs text-gray-500">{order.orderNumber}</td>
                      <td className="px-4 py-3">
                        <div className="font-semibold text-gray-900">{order.userName}</div>
                        <div className="text-xs text-gray-400">{order.userPhone}</div>
                      </td>
                      <td className="px-4 py-3 text-gray-600 text-xs">
                        <div>{order.product.productName ?? order.product.type ?? order.product.orderType}</div>
                        <div className="text-gray-400">{order.product.width && order.product.height ? `${order.product.width}×${order.product.height}cm × ` : ""}{order.product.quantity}개</div>
                      </td>
                      <td className="px-4 py-3 font-bold text-gray-900">{order.pricing.totalPrice.toLocaleString()}원</td>
                      <td className="px-4 py-3"><StatusBadge status={order.status} /></td>
                      <td className="px-4 py-3 text-xs text-gray-400">{order.createdAt.slice(0,10)}</td>
                      <td className="px-4 py-3">
                        <span className="flex items-center gap-1 text-xs text-primary-600 opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                          <Eye size={13} /> 관리
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
              {filteredOrders.length === 0 && !loadingOrders && (
                <div className="py-16 text-center text-gray-400">
                  <Package size={40} className="mx-auto mb-3 opacity-40" />
                  <p>{searchQuery ? `'${searchQuery}'에 해당하는 주문이 없습니다.` : "해당 상태의 주문이 없습니다."}</p>
                </div>
              )}
              {loadingOrders && (
                <div className="py-10 flex justify-center">
                  <Loader2 size={28} className="animate-spin text-primary-400" />
                </div>
              )}
            </div>
          </>
        )}

        {/* ══════════════════════════════════════════
            탭 2: 제품 관리
        ══════════════════════════════════════════ */}
        {tab === "products" && (
          <ProductManager />
        )}

        {/* ══════════════════════════════════════════
            탭 3: 결제 내역
        ══════════════════════════════════════════ */}
        {tab === "payments" && (
          <>
            {/* 결제 요약 카드 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <StatCard icon={<Banknote size={22} className="text-emerald-600" />}
                label="총 매출 합계"
                value={`${stats.totalRevenue.toLocaleString()}원`}
                sub={`${orders.filter(o => o.payment).length}건 결제 완료`}
                color="bg-emerald-100" />
              <StatCard icon={<CreditCard size={22} className="text-blue-600" />}
                label="평균 결제 금액"
                value={orders.filter(o => o.payment).length > 0
                  ? `${Math.round(stats.totalRevenue / orders.filter(o => o.payment).length).toLocaleString()}원`
                  : "—"}
                color="bg-blue-100" />
              <StatCard icon={<TrendingUp size={22} className="text-purple-600" />}
                label="이번 주 결제"
                value={`${orders.filter(o => o.payment && new Date(o.createdAt) >= new Date(Date.now() - 7*86400000)).length}건`}
                color="bg-purple-100" />
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-4 sm:px-6 py-3 sm:py-4 border-b bg-gray-50 flex items-center justify-between">
                <h2 className="font-bold text-gray-800 flex items-center gap-2 text-sm sm:text-base">
                  <CreditCard size={16} className="text-primary-500" /> 결제 완료 목록
                </h2>
                <span className="text-xs text-gray-400 bg-white border border-gray-200 rounded-lg px-3 py-1">
                  {orders.filter(o => o.payment).length}건
                </span>
              </div>
              <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[800px]">
                <thead>
                  <tr className="border-b bg-gray-50/50">
                    {["주문번호","고객","금액","결제수단","PG사","결제 ID","결제일"].map(h => (
                      <th key={h} className="text-left text-xs font-semibold text-gray-500 px-5 py-3 whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {orders.filter(o => o.payment).map(order => (
                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-3 font-mono text-xs text-gray-500">{order.orderNumber}</td>
                      <td className="px-5 py-3">
                        <div className="font-medium text-gray-900">{order.userName}</div>
                        <div className="text-xs text-gray-400">{order.userPhone}</div>
                      </td>
                      <td className="px-5 py-3 font-bold text-emerald-600">{order.payment?.amount?.toLocaleString()}원</td>
                      <td className="px-5 py-3">
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-lg font-medium">
                          {order.payment?.method}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-xs text-gray-500">{order.payment?.pgProvider ?? "-"}</td>
                      <td className="px-5 py-3 font-mono text-xs text-gray-400 max-w-[180px] truncate" title={order.payment?.paymentId}>
                        {order.payment?.paymentId}
                      </td>
                      <td className="px-5 py-3 text-xs text-gray-500">{order.payment?.paidAt?.slice(0,16).replace("T"," ")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
              {orders.filter(o => o.payment).length === 0 && (
                <div className="py-16 text-center text-gray-400">
                  <CreditCard size={36} className="mx-auto mb-3 opacity-40" />
                  <p>결제 완료된 주문이 없습니다.</p>
                </div>
              )}
            </div>
          </>
        )}

        {/* ══════════════════════════════════════════
            탭 3: 테스트 도구
        ══════════════════════════════════════════ */}
        {tab === "test" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* 카드 1: 테스트 주문 */}
            <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600"><FlaskConical size={20} /></div>
                <div>
                  <h2 className="font-bold text-gray-900">테스트 주문 생성</h2>
                  <p className="text-xs text-gray-500">더미 주문 생성 후 결제 페이지로 이동</p>
                </div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-xs text-gray-600 mb-5 space-y-1.5">
                <p>• 고객명: <span className="font-mono font-semibold">테스트 고객</span></p>
                <p>• 제품: <span className="font-mono font-semibold">가로형 현수막 100×30cm × 1개</span></p>
                <p>• 금액: <span className="font-mono font-semibold">30,000원</span></p>
                <p className="text-gray-400">생성 후 결제 페이지로 자동 이동</p>
              </div>
              <button onClick={handleCreateTestOrder} disabled={testOrderCreating}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-60 transition-colors">
                {testOrderCreating ? <Loader2 size={16} className="animate-spin" /> : <ChevronRight size={16} />}
                {testOrderCreating ? "주문 생성 중..." : "테스트 주문 생성 + 결제 이동"}
              </button>
            </div>

            {/* 카드 2: PortOne 결제 테스트 */}
            <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center text-green-600"><CreditCard size={20} /></div>
                <div>
                  <h2 className="font-bold text-gray-900">PortOne 결제 테스트</h2>
                  <p className="text-xs text-gray-500">실제 결제창 호출 (주문 없이 단독)</p>
                </div>
              </div>
              <div className="space-y-3 mb-5">
                <div>
                  <label className="text-xs font-semibold text-gray-500 block mb-1">결제 금액 (원)</label>
                  <input type="number" value={testAmount} onChange={e => setTestAmount(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-500" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 block mb-1.5">결제 수단</label>
                  <div className="flex gap-2">
                    {(["CARD", "KAKAOPAY"] as const).map(m => (
                      <button key={m} onClick={() => setTestPayChoice(m)}
                        className={`flex-1 py-2 rounded-xl text-xs font-semibold border-2 transition-all
                          ${testPayChoice === m ? "border-primary-500 bg-primary-50 text-primary-700" : "border-gray-200 text-gray-600"}`}>
                        {m === "CARD" ? "💳 카드/계좌이체" : "🟡 카카오페이"}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <button onClick={handleTestPayment} disabled={testPaying}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-60 transition-colors">
                {testPaying ? <Loader2 size={16} className="animate-spin" /> : <CreditCard size={16} />}
                {testPaying ? "결제창 열리는 중..." : `${Number(testAmount).toLocaleString()}원 결제창 열기`}
              </button>
              <p className="text-xs text-gray-400 text-center mt-2">※ 테스트 환경 – 실제 결제 안 됨</p>
            </div>

            {/* 카드 3: 카카오 알림톡 */}
            <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center text-yellow-600"><MessageSquare size={20} /></div>
                <div>
                  <h2 className="font-bold text-gray-900">카카오 알림톡 테스트</h2>
                  <p className="text-xs text-gray-500">실제 번호로 알림 발송 테스트</p>
                </div>
              </div>
              <div className="space-y-3 mb-5">
                <div>
                  <label className="text-xs font-semibold text-gray-500 block mb-1">수신 전화번호</label>
                  <div className="relative">
                    <Phone size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="tel" value={kakaoPhone} onChange={e => setKakaoPhone(e.target.value)}
                      placeholder="01012345678"
                      className="w-full pl-8 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-500" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 block mb-1.5">알림 타입</label>
                  <div className="flex gap-2">
                    {([
                      { id: "proof_sent",       label: "📤 시안 전달" },
                      { id: "payment_complete", label: "💰 결제 완료" },
                    ] as const).map(({ id, label }) => (
                      <button key={id} onClick={() => setKakaoType(id)}
                        className={`flex-1 py-2 rounded-xl text-xs font-semibold border-2 transition-all
                          ${kakaoType === id ? "border-yellow-400 bg-yellow-50 text-yellow-700" : "border-gray-200 text-gray-600"}`}>
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <button onClick={handleKakaoTest} disabled={kakaoSending || !kakaoPhone}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-60 transition-colors">
                {kakaoSending ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                {kakaoSending ? "발송 중..." : "알림톡 발송 테스트"}
              </button>
            </div>

            {/* 카드 4: 상태 수동 변경 */}
            <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600"><RotateCcw size={20} /></div>
                <div>
                  <h2 className="font-bold text-gray-900">주문 상태 수동 변경</h2>
                  <p className="text-xs text-gray-500">Firestore 상태를 직접 오버라이드</p>
                </div>
              </div>
              <div className="space-y-3 mb-5">
                <div>
                  <label className="text-xs font-semibold text-gray-500 block mb-1">주문 Firestore ID</label>
                  <input type="text" value={manualOrderId} onChange={e => setManualOrderId(e.target.value)}
                    placeholder="주문 행 클릭 → 상세 → 수동 상태 변경"
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm font-mono focus:outline-none focus:border-primary-500" />
                  {manualOrderId && (
                    <p className="text-xs text-primary-600 mt-1 font-mono truncate">{manualOrderId}</p>
                  )}
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 block mb-1">변경할 상태</label>
                  <select value={manualStatus} onChange={e => setManualStatus(e.target.value as OrderStatus)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-500 bg-white">
                    {STATUS_PIPELINE.map(s => (
                      <option key={s} value={s}>{ORDER_STATUS_LABEL[s]}</option>
                    ))}
                  </select>
                </div>
              </div>
              <button onClick={handleManualStatus} disabled={manualUpdating || !manualOrderId.trim()}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-60 transition-colors">
                {manualUpdating ? <Loader2 size={16} className="animate-spin" /> : <RefreshCw size={16} />}
                {manualUpdating ? "변경 중..." : "상태 즉시 변경"}
              </button>
            </div>

          </div>
        )}
      </div>

      {/* ══ 주문 관리 모달 드로어 ════════════════════ */}
      {modalOrder && (
        <OrderManageModal
          order={modalOrder}
          proofFile={proofFile}
          proofUrlInput={proofUrlInput}
          uploading={uploading}
          onStatusChange={async (id, next, extra) => {
            await handleStatusChange(id, next, extra);
            // 모달 내 order 상태도 업데이트
            setModalOrder(prev => prev ? { ...prev, status: next, ...extra } : null);
          }}
          onProofFileChange={setProofFile}
          onProofUrlChange={setProofUrlInput}
          onProofUpload={() => handleProofUpload(modalOrder)}
          onClose={() => { setModalOrder(null); setProofFile(null); setProofUrlInput(""); }}
        />
      )}
    </div>
  );
}
