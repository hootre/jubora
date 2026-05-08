"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { Menu, X, Search, ShoppingCart, User as UserIcon, ShieldCheck } from "lucide-react";

const ADMIN_EMAIL = "mm1895@naver.com";

const CATEGORIES = [
  { label: "현수막/배너", href: "/templates?cat=horizontal", icon: "📢", active: "bg-blue-50 text-blue-600 border-blue-300",       hover: "hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300" },
  { label: "절기 현수막",  href: "/templates?cat=season",    icon: "🌸", active: "bg-purple-50 text-purple-600 border-purple-300", hover: "hover:bg-purple-50 hover:text-purple-600 hover:border-purple-300" },
  { label: "예배·행사",    href: "/templates?cat=worship",   icon: "⛪", active: "bg-indigo-50 text-indigo-600 border-indigo-300", hover: "hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-300" },
  { label: "세로형 배너",  href: "/templates?cat=vertical",  icon: "🎏", active: "bg-teal-50 text-teal-600 border-teal-300",       hover: "hover:bg-teal-50 hover:text-teal-600 hover:border-teal-300" },
  { label: "X배너",        href: "/templates?cat=banner",    icon: "🪧", active: "bg-orange-50 text-orange-600 border-orange-300", hover: "hover:bg-orange-50 hover:text-orange-600 hover:border-orange-300" },
  { label: "인쇄물",       href: "/templates?cat=print",     icon: "🖨️", active: "bg-rose-50 text-rose-600 border-rose-300",       hover: "hover:bg-rose-50 hover:text-rose-600 hover:border-rose-300" },
  { label: "가격안내",     href: "/price",                   icon: "💰", active: "bg-amber-50 text-amber-600 border-amber-300",   hover: "hover:bg-amber-50 hover:text-amber-600 hover:border-amber-300" },
  { label: "이용안내",     href: "/guide",                   icon: "📋", active: "bg-emerald-50 text-emerald-600 border-emerald-300", hover: "hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-300" },
];

export default function Header() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  // 현재 full path (pathname + query)
  const currentPath = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : "");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, setUser);
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { unsub(); window.removeEventListener("scroll", onScroll); };
  }, []);

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    const q = searchQuery.trim();
    if (!q) return;
    router.push(`/templates?q=${encodeURIComponent(q)}`);
    setSearchQuery("");
    setMobileOpen(false);
  };

  const handleLogout = async () => {
    await signOut(auth);
    setMobileOpen(false);
  };

  return (
    <header className={`sticky top-0 z-50 bg-white transition-shadow ${scrolled ? "shadow-md" : "border-b border-gray-100"}`}>
      {/* 상단 유틸 바 */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-8 text-xs text-gray-500">
          <span className="hidden sm:inline">평일 09:00–18:00 | 토 09:00–13:00 | 카카오톡 상담</span>
          <span className="sm:hidden">평일 09–18시 | 카톡 상담</span>
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            {user ? (
              <>
                <span className="hidden sm:inline truncate max-w-[120px]">{user.displayName ?? user.email}</span>
                <Link href="/mypage" className="hover:text-primary-600 shrink-0">마이페이지</Link>
                <button onClick={handleLogout} className="hover:text-primary-600 shrink-0">로그아웃</button>
              </>
            ) : (
              <>
                <Link href="/login" className="hover:text-primary-600 shrink-0">로그인</Link>
                <Link href="/register" className="hover:text-primary-600 shrink-0">회원가입</Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* 메인 헤더 */}
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-4">
        {/* 로고 */}
        <Link href="/" className="shrink-0">
          <img src="/logo.png" alt="주보라" className="h-9 w-auto" />
        </Link>

        {/* 검색 (데스크톱 — 가운데 정렬) */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-1 justify-center">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="업종 또는 상품으로 검색해보세요"
              className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-200 transition-all bg-gray-50 focus:bg-white"
            />
            <button type="submit" className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-primary-600 transition-colors">
              <Search size={18} />
            </button>
          </div>
        </form>

        {/* 유틸 아이콘 */}
        <div className="hidden md:flex items-center gap-1 shrink-0">
          {user?.email === ADMIN_EMAIL && (
            <Link href="/admin" className="flex flex-col items-center gap-0.5 px-3 py-1 text-red-500 hover:text-red-600 transition-colors">
              <ShieldCheck size={20} />
              <span className="text-[10px] font-medium">관리자</span>
            </Link>
          )}
          <Link href={user ? "/mypage" : "/login"} className="flex flex-col items-center gap-0.5 px-3 py-1 text-gray-500 hover:text-primary-600 transition-colors">
            <UserIcon size={20} />
            <span className="text-[10px]">마이페이지</span>
          </Link>
          <Link href="/orders" className="flex flex-col items-center gap-0.5 px-3 py-1 text-gray-500 hover:text-primary-600 transition-colors">
            <ShoppingCart size={20} />
            <span className="text-[10px]">주문/배송</span>
          </Link>
        </div>

        {/* 모바일 햄버거 */}
        <button className="lg:hidden ml-auto p-2 text-gray-600" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* 카테고리 바 (데스크톱 + 모바일 가로 스크롤) */}
      <div className="hidden lg:block border-t border-gray-100 bg-gradient-to-r from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide py-2.5">
            {(() => {
              const isAllTemplates = pathname === "/templates" && !searchParams.get("cat");
              return (
                <Link href="/templates" className={`shrink-0 flex items-center gap-1.5 px-4 py-2.5 text-sm font-bold rounded-full transition-all ${
                  isAllTemplates
                    ? "text-white bg-primary-600 shadow-sm"
                    : "text-gray-600 border border-transparent hover:bg-primary-50 hover:text-primary-600 hover:border-primary-200"
                }`}>
                  <span className="text-xs">✨</span>
                  전체보기
                </Link>
              );
            })()}
            {CATEGORIES.map(({ label, href, icon, active, hover }) => {
              const isActive = currentPath === href || (!href.startsWith("/templates") && pathname === href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`shrink-0 flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium rounded-full border transition-all ${
                    isActive
                      ? `${active} font-bold`
                      : `text-gray-600 border-transparent ${hover}`
                  }`}
                >
                  <span className="text-xs">{icon}</span>
                  {label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* 모바일 메뉴 */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white shadow-lg">
          <form onSubmit={handleSearch} className="px-4 pt-4 pb-2 flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="검색어를 입력하세요"
              className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-primary-500"
            />
            <button type="submit" className="px-4 py-2.5 bg-primary-600 text-white rounded-lg">
              <Search size={16} />
            </button>
          </form>

          {user?.email === ADMIN_EMAIL && (
            <Link href="/admin" className="flex items-center gap-2 px-6 py-3 text-sm font-semibold text-red-600 border-b border-gray-50 hover:bg-red-50" onClick={() => setMobileOpen(false)}>
              <ShieldCheck size={16} /> 관리자 페이지
            </Link>
          )}

          <div className="py-2">
            {[
              { label: "시안 갤러리", href: "/templates" },
              { label: "주문하기", href: "/order" },
              { label: "가격안내", href: "/price" },
              { label: "이용안내", href: "/guide" },
              { label: "마이페이지", href: user ? "/mypage" : "/login" },
            ].map(({ label, href }) => (
              <Link key={href} href={href} className="block px-6 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors" onClick={() => setMobileOpen(false)}>
                {label}
              </Link>
            ))}
          </div>

          <div className="px-4 pb-4 grid grid-cols-2 gap-2">
            <Link href="/templates" className="text-center py-2.5 bg-primary-600 text-white rounded-lg text-sm font-semibold" onClick={() => setMobileOpen(false)}>
              시안 보기
            </Link>
            <Link href="/order" className="text-center py-2.5 border border-primary-600 text-primary-600 rounded-lg text-sm font-semibold" onClick={() => setMobileOpen(false)}>
              주문하기
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
