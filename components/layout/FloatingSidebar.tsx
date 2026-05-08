"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Clock, ChevronUp, MessageCircle, X, Home, LayoutGrid, User } from "lucide-react";

export default function FloatingSidebar() {
  const pathname = usePathname();
  const [showTop, setShowTop] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  // ── 모바일 하단 네비게이션 바 ──
  const mobileNav = [
    { icon: <Home size={20} />, label: "홈", href: "/" },
    { icon: <LayoutGrid size={20} />, label: "시안", href: "/templates" },
    { icon: <ShoppingCart size={20} />, label: "주문", href: "/order" },
    { icon: <MessageCircle size={20} />, label: "상담", href: "https://pf.kakao.com/_jubora", external: true },
    { icon: <User size={20} />, label: "MY", href: "/mypage" },
  ];

  return (
    <>
      {/* ── 모바일 하단 고정 네비게이션 ── */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 safe-area-bottom">
        <div className="flex items-center justify-around h-14">
          {mobileNav.map(({ icon, label, href, external }) => {
            const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
            if (external) {
              return (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-0.5 px-3 py-1 text-gray-400"
                >
                  {icon}
                  <span className="text-[10px] font-medium">{label}</span>
                </a>
              );
            }
            return (
              <Link
                key={label}
                href={href}
                className={`flex flex-col items-center gap-0.5 px-3 py-1 transition-colors ${
                  isActive ? "text-primary-600" : "text-gray-400"
                }`}
              >
                {icon}
                <span className={`text-[10px] font-medium ${isActive ? "text-primary-600" : ""}`}>{label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* ── 데스크톱 플로팅 사이드바 ── */}
      {collapsed ? (
        <div className="fixed right-4 bottom-6 z-40 hidden md:flex flex-col items-center gap-2">
          <button
            onClick={() => setCollapsed(false)}
            className="w-11 h-11 rounded-full bg-primary-600 text-white shadow-lg flex items-center justify-center hover:bg-primary-700 transition-all hover:scale-105"
            title="메뉴 열기"
          >
            <ShoppingCart size={18} />
          </button>
          {showTop && (
            <button
              onClick={scrollToTop}
              className="w-11 h-11 rounded-full bg-gray-800 text-white shadow-lg flex items-center justify-center hover:bg-gray-700 transition-all hover:scale-105"
            >
              <ChevronUp size={18} />
            </button>
          )}
        </div>
      ) : (
        <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-3">
          {/* 메인 카드 */}
          <div className="relative w-[72px] bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            {/* 닫기 */}
            <button
              onClick={() => setCollapsed(true)}
              className="absolute -top-2 -left-2 w-5 h-5 rounded-full bg-gray-400 text-white flex items-center justify-center hover:bg-gray-500 transition-colors text-[10px] z-10"
            >
              <X size={10} />
            </button>

            {/* 간편주문 */}
            <Link
              href="/order"
              className="flex flex-col items-center gap-1.5 px-2 py-4 bg-gradient-to-b from-primary-600 to-primary-700 text-white hover:from-primary-700 hover:to-primary-800 transition-all group"
            >
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                <ShoppingCart size={16} />
              </div>
              <span className="text-[10px] font-bold leading-tight text-center">간편주문</span>
            </Link>

            <div className="h-px bg-gray-100" />

            {/* 카카오톡 상담 */}
            <a
              href="https://pf.kakao.com/_jubora"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1.5 px-2 py-3 hover:bg-yellow-50 transition-colors group"
            >
              <div className="w-9 h-9 rounded-full bg-yellow-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <MessageCircle size={16} className="text-yellow-900" />
              </div>
              <span className="text-[10px] font-semibold text-gray-600 leading-tight text-center">카톡상담</span>
            </a>

            <div className="h-px bg-gray-100" />

            {/* 업무시간 */}
            <div className="flex flex-col items-center px-2 py-3">
              <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center mb-1.5">
                <Clock size={13} className="text-gray-500" />
              </div>
              <span className="text-[10px] font-bold text-gray-700 mb-1">업무시간</span>
              <div className="text-[9px] text-gray-500 leading-relaxed text-center space-y-0.5">
                <p>
                  <span className="inline-block bg-primary-100 text-primary-700 rounded px-1 py-px font-semibold text-[8px]">평일</span>
                </p>
                <p className="font-medium text-gray-600">09–20시</p>
                <p>
                  <span className="inline-block bg-orange-100 text-orange-700 rounded px-1 py-px font-semibold text-[8px]">토요일</span>
                </p>
                <p className="font-medium text-gray-600">09–15시</p>
                <p className="text-[8px] text-gray-400 mt-1">일·공휴일 휴무</p>
              </div>
            </div>
          </div>

          {/* TOP 버튼 */}
          <button
            onClick={scrollToTop}
            className={`w-11 h-11 rounded-full bg-gray-800 text-white shadow-lg flex items-center justify-center hover:bg-gray-700 transition-all hover:scale-105 ${
              showTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
            }`}
          >
            <ChevronUp size={18} />
          </button>
        </div>
      )}
    </>
  );
}
