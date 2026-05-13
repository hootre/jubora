"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { Menu, X, Search, ShoppingCart, User as UserIcon, ShieldCheck, ChevronDown, ChevronRight, LayoutGrid } from "lucide-react";
import { PRODUCT_CATEGORIES } from "@/constants/products";
import NotificationBell from "@/components/NotificationBell";

const ADMIN_EMAIL = "mm1895@naver.com";

// ═══════════════════════════════════════════
// 메가메뉴 데이터 — products.ts 에서 자동 생성
// ═══════════════════════════════════════════
const MEGA_MENU = PRODUCT_CATEGORIES.map((cat) => ({
  id: cat.id,
  label: cat.label,
  icon: cat.icon,
  subs: cat.subs.map((sub) => ({
    title: sub.title,
    items: sub.items.map((item) => ({
      label: item.name,
      href: item.galleryLink
        ? item.galleryLink
        : item.orderType === "inquiry"
          ? `/order?product=${item.id}&mode=inquiry`
          : `/order?product=${item.id}`,
      badge: item.badge,
    })),
  })),
}));

// ═══════════════════════════════════════════
// Header 컴포넌트
// ═══════════════════════════════════════════
export default function Header() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // 메가메뉴 상태
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const megaRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 모바일 아코디언
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, setUser);
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { unsub(); window.removeEventListener("scroll", onScroll); };
  }, []);

  // 페이지 이동 시 메가메뉴 닫기
  useEffect(() => {
    setActiveMenu(null);
    setMobileOpen(false);
  }, [pathname, searchParams]);

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

  const openMenu = (id: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveMenu(id);
  };

  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setActiveMenu(null), 200);
  };

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
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
        <Link href="/" className="shrink-0">
          <img src="/logo.png" alt="주보라" className="h-9 w-auto" />
        </Link>

        <form onSubmit={handleSearch} className="hidden md:flex flex-1 justify-center">
          <div className="relative w-full max-w-md">
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="찾으시는 상품이 있나요?"
              className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-200 transition-all bg-gray-50 focus:bg-white" />
            <button type="submit" className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-primary-600 transition-colors">
              <Search size={18} />
            </button>
          </div>
        </form>

        <div className="hidden md:flex items-center gap-1 shrink-0">
          {user?.email === ADMIN_EMAIL && (
            <Link href="/admin" className="flex flex-col items-center gap-0.5 px-3 py-1 text-red-500 hover:text-red-600 transition-colors">
              <ShieldCheck size={20} /><span className="text-[10px] font-medium">관리자</span>
            </Link>
          )}
          <NotificationBell />
          <Link href={user ? "/mypage" : "/login"} className="flex flex-col items-center gap-0.5 px-3 py-1 text-gray-500 hover:text-primary-600 transition-colors">
            <UserIcon size={20} /><span className="text-[10px]">마이페이지</span>
          </Link>
          <Link href="/orders" className="flex flex-col items-center gap-0.5 px-3 py-1 text-gray-500 hover:text-primary-600 transition-colors">
            <ShoppingCart size={20} /><span className="text-[10px]">주문/배송</span>
          </Link>
        </div>

        <div className="md:hidden ml-auto"><NotificationBell /></div>
        <button className="lg:hidden p-2 text-gray-600" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* ══ 카테고리 메뉴 바 (데스크톱 — 메가메뉴) ══ */}
      <div className="hidden lg:block border-t border-gray-100" ref={megaRef}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-0">
            <Link href="/templates"
              className="shrink-0 flex items-center gap-1.5 px-4 py-3 text-sm font-bold text-primary-700 hover:bg-primary-50 transition-colors border-r border-gray-100">
              <LayoutGrid size={15} /> 상품 전체보기
            </Link>

            {MEGA_MENU.map((cat) => (
              <div key={cat.id} className="relative"
                onMouseEnter={() => openMenu(cat.id)} onMouseLeave={scheduleClose}>
                <Link href={`/products/${cat.id}`}
                  className={`flex items-center gap-1 px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap
                    ${activeMenu === cat.id
                      ? "text-primary-600 bg-primary-50 border-b-2 border-primary-600"
                      : "text-gray-700 hover:text-primary-600 hover:bg-gray-50 border-b-2 border-transparent"
                    }`}>
                  <span className="text-xs">{cat.icon}</span>
                  {cat.label}
                  <ChevronDown size={12} className={`ml-0.5 transition-transform ${activeMenu === cat.id ? "rotate-180" : ""}`} />
                </Link>
              </div>
            ))}

            <div className="flex items-center ml-auto gap-0">
              <Link href="/price" className="px-4 py-3 text-sm text-gray-600 hover:text-primary-600 hover:bg-gray-50 transition-colors">가격안내</Link>
              <Link href="/guide" className="px-4 py-3 text-sm text-gray-600 hover:text-primary-600 hover:bg-gray-50 transition-colors">이용안내</Link>
            </div>
          </div>
        </div>

        {/* 메가 드롭다운 패널 */}
        {activeMenu && (
          <div className="absolute left-0 right-0 bg-white border-t border-gray-200 shadow-xl z-40"
            onMouseEnter={cancelClose} onMouseLeave={scheduleClose}>
            <div className="max-w-7xl mx-auto px-6 py-6">
              {(() => {
                const cat = MEGA_MENU.find((c) => c.id === activeMenu);
                if (!cat) return null;
                const catData = PRODUCT_CATEGORIES.find((c) => c.id === activeMenu);
                return (
                  <div>
                    <div className="grid grid-cols-4 gap-8">
                      {cat.subs.map((sub) => (
                        <div key={sub.title}>
                          <h3 className="text-sm font-bold text-gray-900 mb-3 pb-2 border-b border-gray-100 flex items-center gap-1.5">
                            <ChevronRight size={12} className="text-primary-500" />
                            {sub.title}
                          </h3>
                          <ul className="space-y-1.5">
                            {sub.items.map((item) => (
                              <li key={item.label}>
                                <Link href={item.href}
                                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary-600 hover:pl-1 transition-all"
                                  onClick={() => setActiveMenu(null)}>
                                  {item.label}
                                  {item.badge && (
                                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                                      item.badge === "BEST" ? "bg-red-100 text-red-600" :
                                      item.badge === "NEW" ? "bg-blue-100 text-blue-600" :
                                      "bg-amber-100 text-amber-600"
                                    }`}>{item.badge}</span>
                                  )}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    {/* 카테고리 전체보기 링크 */}
                    <div className="mt-5 pt-4 border-t border-gray-100">
                      <Link href={`/products/${activeMenu}`}
                        className="inline-flex items-center gap-1 text-sm text-primary-600 font-semibold hover:underline"
                        onClick={() => setActiveMenu(null)}>
                        {catData?.label} 전체보기 <ChevronRight size={14} />
                      </Link>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        )}
      </div>

      {/* ══ 모바일 메뉴 ══ */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white shadow-lg max-h-[80vh] overflow-y-auto">
          <form onSubmit={handleSearch} className="px-4 pt-4 pb-2 flex gap-2">
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="검색어를 입력하세요"
              className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-primary-500" />
            <button type="submit" className="px-4 py-2.5 bg-primary-600 text-white rounded-lg"><Search size={16} /></button>
          </form>

          {user?.email === ADMIN_EMAIL && (
            <Link href="/admin" className="flex items-center gap-2 px-6 py-3 text-sm font-semibold text-red-600 border-b border-gray-50 hover:bg-red-50" onClick={() => setMobileOpen(false)}>
              <ShieldCheck size={16} /> 관리자 페이지
            </Link>
          )}

          <div className="py-2">
            <Link href="/templates" className="flex items-center gap-2 px-6 py-3 text-sm font-bold text-primary-700 hover:bg-primary-50" onClick={() => setMobileOpen(false)}>
              <LayoutGrid size={15} /> 상품 전체보기
            </Link>

            {MEGA_MENU.map((cat) => (
              <div key={cat.id}>
                <div className="flex items-center">
                  <Link href={`/products/${cat.id}`}
                    className="flex-1 flex items-center gap-2 px-6 py-3 text-sm font-medium text-gray-800 hover:bg-gray-50"
                    onClick={() => setMobileOpen(false)}>
                    <span>{cat.icon}</span> {cat.label}
                  </Link>
                  <button onClick={() => setMobileExpanded(mobileExpanded === cat.id ? null : cat.id)}
                    className="px-4 py-3 text-gray-400 hover:text-gray-600">
                    <ChevronDown size={14} className={`transition-transform ${mobileExpanded === cat.id ? "rotate-180" : ""}`} />
                  </button>
                </div>

                {mobileExpanded === cat.id && (
                  <div className="bg-gray-50 pb-2">
                    {cat.subs.map((sub) => (
                      <div key={sub.title} className="px-8 pt-3">
                        <p className="text-xs font-bold text-gray-500 mb-1.5">{sub.title}</p>
                        {sub.items.map((item) => (
                          <Link key={item.label} href={item.href}
                            className="block py-1.5 text-sm text-gray-600 hover:text-primary-600"
                            onClick={() => setMobileOpen(false)}>
                            {item.label}
                            {item.badge && (
                              <span className={`ml-1.5 text-[10px] font-bold px-1 py-0.5 rounded ${
                                item.badge === "BEST" ? "bg-red-100 text-red-600" :
                                item.badge === "NEW" ? "bg-blue-100 text-blue-600" :
                                "bg-amber-100 text-amber-600"
                              }`}>{item.badge}</span>
                            )}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="border-t border-gray-100 mt-2 pt-2">
              {[
                { label: "가격안내", href: "/price" },
                { label: "이용안내", href: "/guide" },
                { label: "주문하기", href: "/order" },
                { label: "마이페이지", href: user ? "/mypage" : "/login" },
              ].map(({ label, href }) => (
                <Link key={href} href={href} className="block px-6 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors" onClick={() => setMobileOpen(false)}>
                  {label}
                </Link>
              ))}
            </div>
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
