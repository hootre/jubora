"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { Loader2, ShieldAlert, LogOut } from "lucide-react";

const ADMIN_EMAIL = "mm1895@naver.com";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null | "loading">("loading");

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (!u) router.replace("/login?redirect=/admin");
    });
    return unsub;
  }, [router]);

  // 로딩 중
  if (user === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 size={32} className="animate-spin text-primary-500" />
      </div>
    );
  }

  // 비로그인 (리다이렉트 처리 중)
  if (!user) return null;

  // 권한 없는 계정
  if (user.email !== ADMIN_EMAIL) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <ShieldAlert size={52} className="mx-auto mb-4 text-red-400" />
          <h1 className="text-xl font-bold text-gray-900 mb-2">접근 권한 없음</h1>
          <p className="text-gray-500 text-sm mb-6">
            관리자 계정으로만 접근할 수 있습니다.<br />
            현재 로그인: <span className="font-mono text-gray-700">{user.email}</span>
          </p>
          <button
            onClick={() => signOut(auth).then(() => router.push("/login?redirect=/admin"))}
            className="flex items-center gap-2 mx-auto bg-gray-800 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-900 transition-colors"
          >
            <LogOut size={15} /> 다른 계정으로 로그인
          </button>
        </div>
      </div>
    );
  }

  // 관리자 인증 성공
  return (
    <div>
      <button
        onClick={() => signOut(auth).then(() => router.push("/"))}
        className="fixed bottom-5 left-5 z-50 flex items-center gap-1.5 bg-white border border-gray-200 text-gray-600 px-3 py-2 rounded-xl text-xs font-medium shadow-sm hover:bg-gray-50 transition-colors"
      >
        <LogOut size={13} /> 로그아웃
      </button>
      {children}
    </div>
  );
}
