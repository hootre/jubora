"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/firebase";
import {
  onAuthStateChanged, signOut, updateProfile,
  EmailAuthProvider, reauthenticateWithCredential, updatePassword,
  User,
} from "firebase/auth";
import { getMyOrders } from "@/lib/firestore";
import type { Order } from "@/types/order";
import { ORDER_STATUS_LABEL, ORDER_STATUS_COLOR } from "@/types/order";
import {
  Loader2, LogOut, ClipboardList, X, Pencil, Check, Eye, EyeOff, KeyRound, UserCog,
} from "lucide-react";

export default function MyPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [error, setError] = useState("");

  // ── 프로필 수정 ──
  const [editMode, setEditMode] = useState(false);
  const [editName, setEditName] = useState("");
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileMsg, setProfileMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  // ── 비밀번호 변경 ──
  const [pwOpen, setPwOpen] = useState(false);
  const [pwForm, setPwForm] = useState({ current: "", newPw: "", confirm: "" });
  const [pwSaving, setPwSaving] = useState(false);
  const [pwMsg, setPwMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // 이메일/비밀번호 가입 유저인지 (구글 로그인 유저는 비밀번호 변경 불가)
  const isEmailUser = user?.providerData.some((p) => p.providerId === "password");

  // 이미지 확대 모달
  const [zoomImage, setZoomImage] = useState<{ url: string; label: string } | null>(null);

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
      setEditName(u.displayName ?? "");
      setLoading(false);
      await loadOrders(u.uid);
    });

    const timeout = setTimeout(() => setLoading(false), 5000);
    return () => { unsub(); clearTimeout(timeout); };
  }, [router]);

  // ── 프로필(이름) 저장 ──
  const handleProfileSave = async () => {
    if (!user) return;
    const trimmed = editName.trim();
    if (!trimmed) { setProfileMsg({ type: "err", text: "이름을 입력해주세요." }); return; }
    setProfileSaving(true);
    setProfileMsg(null);
    try {
      await updateProfile(user, { displayName: trimmed });
      // Firebase user 객체 갱신
      await user.reload();
      setUser({ ...auth.currentUser! });
      setEditMode(false);
      setProfileMsg({ type: "ok", text: "이름이 변경되었습니다." });
      setTimeout(() => setProfileMsg(null), 3000);
    } catch (e: any) {
      setProfileMsg({ type: "err", text: e?.message ?? "변경에 실패했습니다." });
    } finally {
      setProfileSaving(false);
    }
  };

  // ── 비밀번호 변경 ──
  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !user.email) return;

    // 유효성 검사
    if (!pwForm.current) { setPwMsg({ type: "err", text: "현재 비밀번호를 입력해주세요." }); return; }
    if (pwForm.newPw.length < 6) { setPwMsg({ type: "err", text: "새 비밀번호는 6자 이상이어야 합니다." }); return; }
    if (pwForm.newPw !== pwForm.confirm) { setPwMsg({ type: "err", text: "새 비밀번호가 일치하지 않습니다." }); return; }
    if (pwForm.current === pwForm.newPw) { setPwMsg({ type: "err", text: "현재 비밀번호와 다른 비밀번호를 입력해주세요." }); return; }

    setPwSaving(true);
    setPwMsg(null);
    try {
      // 기존 비밀번호로 재인증
      const credential = EmailAuthProvider.credential(user.email, pwForm.current);
      await reauthenticateWithCredential(user, credential);
      // 새 비밀번호 적용
      await updatePassword(user, pwForm.newPw);
      setPwForm({ current: "", newPw: "", confirm: "" });
      setPwOpen(false);
      setPwMsg({ type: "ok", text: "비밀번호가 변경되었습니다." });
      setTimeout(() => setPwMsg(null), 3000);
    } catch (e: any) {
      const msgs: Record<string, string> = {
        "auth/wrong-password": "현재 비밀번호가 올바르지 않습니다.",
        "auth/invalid-credential": "현재 비밀번호가 올바르지 않습니다.",
        "auth/too-many-requests": "너무 많은 시도가 있었습니다. 잠시 후 다시 시도해주세요.",
        "auth/weak-password": "새 비밀번호가 너무 약합니다. 6자 이상 입력해주세요.",
        "auth/requires-recent-login": "보안을 위해 다시 로그인 후 시도해주세요.",
      };
      setPwMsg({ type: "err", text: msgs[e?.code] ?? `비밀번호 변경 실패: ${e?.code ?? e?.message}` });
    } finally {
      setPwSaving(false);
    }
  };

  if (loading) return (
    <div className="flex flex-col justify-center items-center min-h-[60vh] gap-3">
      <Loader2 size={36} className="animate-spin text-primary-600" />
      <p className="text-sm text-gray-400">로그인 정보 확인 중...</p>
    </div>
  );

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

        {/* ══ 프로필 카드 ══ */}
        <div className="card mb-6">
          <div className="flex items-center gap-4">
            {user?.photoURL
              ? <img src={user.photoURL} alt="" className="w-14 h-14 rounded-full ring-2 ring-primary-100 shrink-0" />
              : <div className="w-14 h-14 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-xl shrink-0">
                  {(user?.displayName ?? user?.email ?? "?")[0].toUpperCase()}
                </div>
            }
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-bold text-gray-900 truncate">{user?.displayName ?? user?.email}</h2>
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

        {/* ══ 회원정보 수정 섹션 ══ */}
        <div className="card mb-6">
          <div className="flex items-center gap-2 mb-5">
            <UserCog size={20} className="text-primary-600" />
            <h2 className="text-lg font-bold text-gray-900">회원정보 수정</h2>
          </div>

          {/* 전역 성공/에러 메시지 (프로필) */}
          {profileMsg && (
            <div className={`text-sm rounded-lg px-4 py-3 mb-4 ${profileMsg.type === "ok" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"}`}>
              {profileMsg.text}
            </div>
          )}

          {/* 이메일 (읽기 전용) */}
          <div className="mb-4">
            <label className="label">이메일</label>
            <div className="input bg-gray-50 text-gray-500 cursor-not-allowed">{user?.email}</div>
            <p className="text-xs text-gray-400 mt-1">이메일은 변경할 수 없습니다.</p>
          </div>

          {/* 이름 */}
          <div className="mb-4">
            <label className="label">이름</label>
            {editMode ? (
              <div className="flex gap-2">
                <input
                  type="text"
                  className="input flex-1"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="이름을 입력하세요"
                  autoFocus
                  onKeyDown={(e) => e.key === "Enter" && handleProfileSave()}
                />
                <button onClick={handleProfileSave} disabled={profileSaving}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-semibold hover:bg-primary-700 transition-colors disabled:opacity-60 flex items-center gap-1.5">
                  {profileSaving ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
                  저장
                </button>
                <button onClick={() => { setEditMode(false); setEditName(user?.displayName ?? ""); setProfileMsg(null); }}
                  className="px-3 py-2 border border-gray-200 text-gray-500 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                  취소
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <div className="input flex-1 bg-gray-50">{user?.displayName || <span className="text-gray-400">이름 미설정</span>}</div>
                <button onClick={() => { setEditMode(true); setEditName(user?.displayName ?? ""); setProfileMsg(null); }}
                  className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50 transition-colors flex items-center gap-1.5">
                  <Pencil size={14} />
                  수정
                </button>
              </div>
            )}
          </div>

          {/* 로그인 방식 표시 */}
          <div className="mb-2">
            <label className="label">로그인 방식</label>
            <div className="input bg-gray-50 text-gray-500 cursor-not-allowed">
              {isEmailUser ? "이메일/비밀번호" : "Google 계정"}
            </div>
          </div>
        </div>

        {/* ══ 비밀번호 변경 섹션 (이메일 유저만) ══ */}
        {isEmailUser && (
          <div className="card mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <KeyRound size={20} className="text-primary-600" />
                <h2 className="text-lg font-bold text-gray-900">비밀번호 변경</h2>
              </div>
              {!pwOpen && (
                <button onClick={() => { setPwOpen(true); setPwMsg(null); }}
                  className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50 transition-colors flex items-center gap-1.5">
                  <Pencil size={14} />
                  변경하기
                </button>
              )}
            </div>

            {/* 전역 성공/에러 메시지 (비밀번호) */}
            {pwMsg && (
              <div className={`text-sm rounded-lg px-4 py-3 mb-4 ${pwMsg.type === "ok" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"}`}>
                {pwMsg.text}
              </div>
            )}

            {pwOpen ? (
              <form onSubmit={handlePasswordChange} className="space-y-4">
                {/* 현재 비밀번호 */}
                <div>
                  <label className="label">현재 비밀번호</label>
                  <div className="relative">
                    <input
                      type={showCurrent ? "text" : "password"}
                      className="input pr-10"
                      value={pwForm.current}
                      onChange={(e) => setPwForm((p) => ({ ...p, current: e.target.value }))}
                      placeholder="현재 비밀번호 입력"
                      autoFocus
                    />
                    <button type="button" onClick={() => setShowCurrent(!showCurrent)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {/* 새 비밀번호 */}
                <div>
                  <label className="label">새 비밀번호</label>
                  <div className="relative">
                    <input
                      type={showNew ? "text" : "password"}
                      className="input pr-10"
                      value={pwForm.newPw}
                      onChange={(e) => setPwForm((p) => ({ ...p, newPw: e.target.value }))}
                      placeholder="6자 이상"
                    />
                    <button type="button" onClick={() => setShowNew(!showNew)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {pwForm.newPw.length > 0 && pwForm.newPw.length < 6 && (
                    <p className="text-xs text-amber-600 mt-1">비밀번호는 6자 이상이어야 합니다.</p>
                  )}
                </div>

                {/* 새 비밀번호 확인 */}
                <div>
                  <label className="label">새 비밀번호 확인</label>
                  <div className="relative">
                    <input
                      type={showConfirm ? "text" : "password"}
                      className="input pr-10"
                      value={pwForm.confirm}
                      onChange={(e) => setPwForm((p) => ({ ...p, confirm: e.target.value }))}
                      placeholder="새 비밀번호 다시 입력"
                    />
                    <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {pwForm.confirm.length > 0 && pwForm.newPw !== pwForm.confirm && (
                    <p className="text-xs text-red-500 mt-1">비밀번호가 일치하지 않습니다.</p>
                  )}
                </div>

                <div className="flex gap-2 pt-2">
                  <button type="submit" disabled={pwSaving}
                    className="px-6 py-2.5 bg-primary-600 text-white rounded-lg text-sm font-semibold hover:bg-primary-700 transition-colors disabled:opacity-60 flex items-center gap-1.5">
                    {pwSaving ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
                    비밀번호 변경
                  </button>
                  <button type="button"
                    onClick={() => { setPwOpen(false); setPwForm({ current: "", newPw: "", confirm: "" }); setPwMsg(null); }}
                    className="px-4 py-2.5 border border-gray-200 text-gray-500 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                    취소
                  </button>
                </div>
              </form>
            ) : (
              !pwMsg && <p className="text-sm text-gray-400">비밀번호를 변경하려면 "변경하기" 버튼을 눌러주세요.</p>
            )}
          </div>
        )}

        {/* Google 유저 안내 */}
        {!isEmailUser && (
          <div className="card mb-8 bg-gray-50">
            <div className="flex items-center gap-2 mb-2">
              <KeyRound size={20} className="text-gray-400" />
              <h2 className="text-lg font-bold text-gray-500">비밀번호 변경</h2>
            </div>
            <p className="text-sm text-gray-400">Google 계정으로 로그인하셨습니다. 비밀번호는 Google 계정 설정에서 변경해주세요.</p>
          </div>
        )}

        {/* ══ 주문 내역 ══ */}
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
                onClick={() => router.push(`/order/${order.id}`)}
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

                {/* 시안 이미지 미리보기 */}
                {(order.proof?.imageUrl || order.design?.previewImageUrl) && (
                  <div className="flex gap-2 mb-3">
                    {order.design?.previewImageUrl && (
                      <img
                        src={order.design.previewImageUrl}
                        alt="주문 이미지"
                        className="h-16 w-auto rounded border border-gray-200 object-contain bg-gray-50 cursor-zoom-in"
                        onClick={(e) => {
                          e.stopPropagation();
                          setZoomImage({ url: order.design.previewImageUrl!, label: "주문 시 첨부 이미지" });
                        }}
                      />
                    )}
                    {order.proof?.imageUrl && (
                      <img
                        src={order.proof.imageUrl}
                        alt="시안"
                        className="h-16 w-auto rounded border border-gray-200 object-contain bg-gray-50 cursor-zoom-in"
                        onClick={(e) => {
                          e.stopPropagation();
                          setZoomImage({ url: order.proof!.imageUrl, label: "담당자 제작 시안" });
                        }}
                      />
                    )}
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <p className="font-bold text-primary-600">{order.pricing.totalPrice.toLocaleString()}원</p>
                  <span className="text-xs text-gray-400">{order.createdAt.slice(0, 10)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ══ 이미지 확대 모달 ══ */}
      {zoomImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setZoomImage(null)} />
          <div className="relative max-w-3xl max-h-[90vh] flex flex-col items-center">
            <button onClick={() => setZoomImage(null)}
              className="absolute -top-3 -right-3 z-10 bg-white hover:bg-gray-100 text-gray-700 rounded-full p-2 shadow-lg transition-colors">
              <X size={20} />
            </button>
            <img
              src={zoomImage.url}
              alt={zoomImage.label}
              className="max-w-full max-h-[80vh] rounded-lg shadow-2xl object-contain bg-white"
            />
            <p className="text-white text-sm mt-3 bg-black/40 px-4 py-1.5 rounded-full">{zoomImage.label}</p>
          </div>
        </div>
      )}
    </div>
  );
}
