"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup, signInWithRedirect } from "firebase/auth";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirm) { setError("비밀번호가 일치하지 않습니다."); return; }
    setLoading(true); setError("");
    try {
      const cred = await createUserWithEmailAndPassword(auth, form.email, form.password);
      await updateProfile(cred.user, { displayName: form.name });
      router.push("/");
    } catch (err: any) {
      const msgs: Record<string, string> = {
        "auth/email-already-in-use": "이미 사용 중인 이메일입니다.",
        "auth/weak-password": "비밀번호는 6자 이상이어야 합니다.",
      };
      setError(msgs[err.code] ?? "회원가입에 실패했습니다.");
    } finally { setLoading(false); }
  };

  const handleGoogle = async () => {
    setLoading(true); setError("");
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push("/");
    } catch (err: any) {
      if (err.code === "auth/popup-blocked" || err.code === "auth/cancelled-popup-request") {
        try { await signInWithRedirect(auth, provider); return; } catch { }
      }
      if (err.code === "auth/popup-closed-by-user") { setLoading(false); return; }
      const msgs: Record<string, string> = {
        "auth/unauthorized-domain": "이 도메인이 Firebase에 등록되지 않았습니다. Firebase Console에서 도메인을 추가해주세요.",
        "auth/operation-not-allowed": "Google 로그인이 활성화되지 않았습니다. Firebase Console에서 활성화해주세요.",
      };
      setError(msgs[err.code] ?? `구글 로그인 실패: ${err.code ?? err.message}`);
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8 sm:py-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-4">
            <img src="/logo.png" alt="주보라" className="h-12 w-auto mx-auto" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">회원가입</h1>
        </div>
        <div className="card">
          <button onClick={handleGoogle} disabled={loading}
            className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors mb-6">
            <svg width="18" height="18" viewBox="0 0 18 18"><path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/><path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/><path fill="#FBBC05" d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"/><path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"/></svg>
            Google로 계속하기
          </button>
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200" /></div>
            <div className="relative flex justify-center"><span className="bg-white px-3 text-xs text-gray-400">또는 이메일로 가입</span></div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <p className="text-sm text-red-600 bg-red-50 rounded-lg px-4 py-3">{error}</p>}
            <div>
              <label className="label">이름</label>
              <input type="text" className="input" value={form.name} onChange={(e) => set("name", e.target.value)} required placeholder="홍길동" />
            </div>
            <div>
              <label className="label">이메일</label>
              <input type="email" className="input" value={form.email} onChange={(e) => set("email", e.target.value)} required placeholder="email@example.com" />
            </div>
            <div>
              <label className="label">비밀번호</label>
              <input type="password" className="input" value={form.password} onChange={(e) => set("password", e.target.value)} required placeholder="6자 이상" />
            </div>
            <div>
              <label className="label">비밀번호 확인</label>
              <input type="password" className="input" value={form.confirm} onChange={(e) => set("confirm", e.target.value)} required placeholder="••••••••" />
            </div>
            <button type="submit" disabled={loading} className="w-full btn-primary py-3 disabled:opacity-60">
              {loading ? "가입 중..." : "회원가입"}
            </button>
          </form>
          <p className="text-center text-sm text-gray-500 mt-6">
            이미 계정이 있으신가요?{" "}
            <Link href="/login" className="text-primary-600 font-semibold hover:underline">로그인</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
