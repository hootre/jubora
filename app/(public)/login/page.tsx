"use client";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";

const ADMIN_EMAIL = "mm1895@naver.com";

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") ?? "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // 관리자 계정이면 /admin으로 이동
      router.push(email.trim() === ADMIN_EMAIL ? "/admin" : redirect);
    } catch (err: any) {
      // 관리자 계정이 Firebase에 없으면 최초 1회 자동 생성
      if ((err.code === "auth/user-not-found" || err.code === "auth/invalid-credential")
          && email.trim() === ADMIN_EMAIL) {
        try {
          await createUserWithEmailAndPassword(auth, email.trim(), password);
          router.push("/admin");
          return;
        } catch { /* 생성 실패 시 아래 에러 메시지로 */}
      }
      const msgs: Record<string, string> = {
        "auth/user-not-found":    "등록되지 않은 이메일입니다.",
        "auth/wrong-password":    "비밀번호가 올바르지 않습니다.",
        "auth/invalid-credential":"이메일 또는 비밀번호를 확인해주세요.",
      };
      setError(msgs[err.code] ?? "로그인에 실패했습니다.");
    } finally { setLoading(false); }
  };

  // 리다이렉트 복귀 시 결과 처리
  useState(() => {
    if (typeof window === "undefined") return;
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) router.push(redirect);
      })
      .catch(() => {});
  });

  const handleGoogle = async () => {
    setLoading(true); setError("");
    const provider = new GoogleAuthProvider();
    try {
      // 먼저 팝업 시도
      await signInWithPopup(auth, provider);
      router.push(redirect);
    } catch (err: any) {
      // 팝업 차단 시 리다이렉트로 대체
      if (err.code === "auth/popup-blocked" || err.code === "auth/cancelled-popup-request") {
        try {
          await signInWithRedirect(auth, provider);
          return;
        } catch { /* 아래 에러 처리로 */ }
      }
      if (err.code === "auth/popup-closed-by-user") {
        setLoading(false);
        return;
      }
      // 구체적 에러 메시지 표시
      const googleErrors: Record<string, string> = {
        "auth/unauthorized-domain": `이 도메인이 Firebase에 등록되지 않았습니다. Firebase Console → Authentication → Settings → Authorized domains에 현재 도메인을 추가해주세요.`,
        "auth/operation-not-allowed": "Google 로그인이 활성화되지 않았습니다. Firebase Console → Authentication → Sign-in method에서 Google을 활성화해주세요.",
        "auth/internal-error": "Firebase 내부 오류입니다. 잠시 후 다시 시도해주세요.",
        "auth/network-request-failed": "네트워크 연결을 확인해주세요.",
      };
      setError(googleErrors[err.code] ?? `구글 로그인 실패: ${err.code ?? err.message}`);
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-6 sm:py-8">
      <div className="w-full max-w-md">
        <div className="card py-8 px-6 sm:px-8">
          {/* 로고 + 타이틀 (박스 안) */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-block mb-3">
              <img src="/logo.png" alt="주보라" className="h-11 w-auto mx-auto" />
            </Link>
            <h1 className="text-xl font-bold text-gray-900">로그인</h1>
            <p className="text-sm text-gray-400 mt-1">현수막·배너 전문 온라인 제작</p>
          </div>

          <button onClick={handleGoogle} disabled={loading}
            className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors mb-6">
            <svg width="18" height="18" viewBox="0 0 18 18"><path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/><path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/><path fill="#FBBC05" d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"/><path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"/></svg>
            Google로 계속하기
          </button>
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200" /></div>
            <div className="relative flex justify-center"><span className="bg-white px-3 text-xs text-gray-400">또는 이메일로 로그인</span></div>
          </div>
          <form onSubmit={handleEmail} className="space-y-4">
            {error && <p className="text-sm text-red-600 bg-red-50 rounded-lg px-4 py-3">{error}</p>}
            <div>
              <label className="label">이메일</label>
              <input type="email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="email@example.com" />
            </div>
            <div>
              <label className="label">비밀번호</label>
              <input type="password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••" />
            </div>
            <button type="submit" disabled={loading} className="w-full btn-primary py-3 disabled:opacity-60">
              {loading ? "로그인 중..." : "로그인"}
            </button>
          </form>
          <p className="text-center text-sm text-gray-500 mt-6">
            계정이 없으신가요?{" "}
            <Link href="/register" className="text-primary-600 font-semibold hover:underline">회원가입</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
