"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { Menu, X, Search, ShoppingCart, User as UserIcon, ShieldCheck, ChevronDown, ChevronRight, LayoutGrid } from "lucide-react";

const ADMIN_EMAIL = "mm1895@naver.com";

// ═══════════════════════════════════════════
// 메가메뉴 카테고리 데이터
// ═══════════════════════════════════════════
interface SubCategory {
  title: string;
  items: { label: string; href: string; badge?: string }[];
}

interface MegaCategory {
  id: string;
  label: string;
  icon: string;
  subs: SubCategory[];
}

const MEGA_MENU: MegaCategory[] = [
  {
    id: "banner",
    label: "현수막/배너",
    icon: "📢",
    subs: [
      {
        title: "현수막",
        items: [
          { label: "기본 현수막", href: "/templates?cat=horizontal", badge: "BEST" },
          { label: "대형 현수막", href: "/templates?cat=horizontal&size=large" },
          { label: "게시대 현수막", href: "/templates?cat=horizontal&type=display" },
          { label: "통풍 현수막", href: "/templates?cat=horizontal&type=mesh" },
          { label: "더 오래 가는 현수막", href: "/templates?cat=horizontal&type=durable" },
          { label: "손잡이 현수막", href: "/templates?cat=horizontal&type=handle" },
          { label: "족자형 현수막", href: "/templates?cat=horizontal&type=scroll" },
          { label: "가성비 게릴라 현수막", href: "/templates?cat=horizontal&type=guerrilla" },
        ],
      },
      {
        title: "배너",
        items: [
          { label: "기본 배너", href: "/templates?cat=vertical", badge: "BEST" },
          { label: "스탠드 배너", href: "/templates?cat=banner" },
          { label: "자유사이즈 패브릭(배너)", href: "/templates?cat=banner&type=fabric" },
          { label: "통풍 배너", href: "/templates?cat=banner&type=mesh" },
          { label: "교체용 배너(거치대 미포함)", href: "/templates?cat=banner&type=replace" },
          { label: "포토월 배너", href: "/templates?cat=banner&type=photowall" },
          { label: "슬림형 물통 배너", href: "/templates?cat=banner&type=slim" },
          { label: "미니 배너", href: "/templates?cat=banner&type=mini" },
        ],
      },
      {
        title: "절기 현수막",
        items: [
          { label: "고난(사순절)", href: "/templates?cat=season&sub=lent" },
          { label: "부활절", href: "/templates?cat=season&sub=easter" },
          { label: "맥추감사절", href: "/templates?cat=season&sub=harvest" },
          { label: "추수감사절", href: "/templates?cat=season&sub=thanksgiving" },
          { label: "성탄절", href: "/templates?cat=season&sub=christmas" },
          { label: "송구영신", href: "/templates?cat=season&sub=newyear" },
          { label: "어린이·어버이주일", href: "/templates?cat=season&sub=family" },
        ],
      },
      {
        title: "예배·행사 현수막",
        items: [
          { label: "입학·졸업예배", href: "/templates?cat=worship&sub=graduation" },
          { label: "헌신·임직예배", href: "/templates?cat=worship&sub=dedication" },
          { label: "부흥회·성회", href: "/templates?cat=worship&sub=revival" },
          { label: "세미나·수련회", href: "/templates?cat=worship&sub=seminar" },
          { label: "성경학교", href: "/templates?cat=worship&sub=vbs" },
          { label: "바자회·초청", href: "/templates?cat=worship&sub=bazaar" },
          { label: "찬양·체육대회", href: "/templates?cat=worship&sub=event" },
        ],
      },
    ],
  },
  {
    id: "print",
    label: "포스터/전단지/리플렛/엽서",
    icon: "🖨️",
    subs: [
      {
        title: "전단지",
        items: [
          { label: "대량 단면 전단지", href: "/templates?cat=print&type=flyer-single", badge: "BEST" },
          { label: "대량 양면 전단지", href: "/templates?cat=print&type=flyer-double" },
          { label: "소량 양면 전단지", href: "/templates?cat=print&type=flyer-small" },
        ],
      },
      {
        title: "포스터",
        items: [
          { label: "단면 포스터", href: "/templates?cat=print&type=poster", badge: "BEST" },
          { label: "대형 포스터", href: "/templates?cat=print&type=poster-large" },
        ],
      },
      {
        title: "리플렛/팜플렛",
        items: [
          { label: "2단 리플렛", href: "/templates?cat=print&type=leaflet-2" },
          { label: "3단 리플렛", href: "/templates?cat=print&type=leaflet-3" },
          { label: "팜플렛(소책자)", href: "/templates?cat=print&type=pamphlet" },
        ],
      },
      {
        title: "엽서/카드",
        items: [
          { label: "엽서", href: "/templates?cat=print&type=postcard" },
          { label: "초대장", href: "/templates?cat=print&type=invitation" },
          { label: "순서지", href: "/templates?cat=print&type=program" },
          { label: "주보", href: "/templates?cat=print&type=bulletin" },
          { label: "요람", href: "/templates?cat=print&type=handbook" },
        ],
      },
    ],
  },
  {
    id: "sticker",
    label: "스티커",
    icon: "🏷️",
    subs: [
      {
        title: "스티커",
        items: [
          { label: "싱글 규격 스티커", href: "/templates?cat=sticker&type=single", badge: "BEST" },
          { label: "싱글 비규격 스티커", href: "/templates?cat=sticker&type=custom" },
          { label: "판스티커", href: "/templates?cat=sticker&type=sheet" },
          { label: "롤스티커", href: "/templates?cat=sticker&type=roll" },
          { label: "투명 스티커", href: "/templates?cat=sticker&type=clear" },
          { label: "바닥 스티커", href: "/templates?cat=sticker&type=floor" },
          { label: "레터링 스티커", href: "/templates?cat=sticker&type=lettering" },
        ],
      },
      {
        title: "실사·광고물",
        items: [
          { label: "썬팅·광고", href: "/templates?cat=sticker&type=tinting" },
          { label: "시트지", href: "/templates?cat=sticker&type=sheet-vinyl" },
          { label: "자석 스티커", href: "/templates?cat=sticker&type=magnet" },
        ],
      },
    ],
  },
  {
    id: "namecard",
    label: "명함/쿠폰",
    icon: "💳",
    subs: [
      {
        title: "명함",
        items: [
          { label: "기본 명함", href: "/templates?cat=namecard&type=basic", badge: "BEST" },
          { label: "전도 명함", href: "/templates?cat=namecard&type=evangel" },
          { label: "고급 명함", href: "/templates?cat=namecard&type=premium" },
        ],
      },
      {
        title: "쿠폰/도장",
        items: [
          { label: "쿠폰", href: "/templates?cat=namecard&type=coupon" },
          { label: "도장쿠폰", href: "/templates?cat=namecard&type=stamp" },
        ],
      },
      {
        title: "봉투",
        items: [
          { label: "교회 봉투", href: "/templates?cat=envelope&type=church" },
          { label: "감사 봉투", href: "/templates?cat=envelope&type=thanks" },
          { label: "십일조 봉투", href: "/templates?cat=envelope&type=tithe" },
          { label: "각대 봉투", href: "/templates?cat=envelope&type=standard" },
        ],
      },
    ],
  },
  {
    id: "church",
    label: "교회용품",
    icon: "⛪",
    subs: [
      {
        title: "교회용품",
        items: [
          { label: "교패", href: "/templates?cat=church&type=plaque" },
          { label: "명찰", href: "/templates?cat=church&type=nametag" },
          { label: "교회표찰", href: "/templates?cat=church&type=sign" },
          { label: "기타 교회용품", href: "/templates?cat=church&type=etc" },
        ],
      },
      {
        title: "어깨띠·깃발",
        items: [
          { label: "부직포 어깨띠", href: "/templates?cat=church&type=sash" },
          { label: "근조 깃발", href: "/templates?cat=church&type=flag" },
        ],
      },
      {
        title: "배너 거치대",
        items: [
          { label: "실내형 거치대", href: "/templates?cat=church&type=stand-indoor" },
          { label: "실외형 거치대", href: "/templates?cat=church&type=stand-outdoor" },
          { label: "대형 거치대", href: "/templates?cat=church&type=stand-large" },
        ],
      },
      {
        title: "배경",
        items: [
          { label: "현수막 배경", href: "/templates?cat=church&type=bg-banner" },
          { label: "간단배경 모음", href: "/templates?cat=church&type=bg-simple" },
          { label: "표어", href: "/templates?cat=church&type=motto" },
          { label: "성화·환영", href: "/templates?cat=church&type=art" },
          { label: "시간표", href: "/templates?cat=church&type=timetable" },
        ],
      },
    ],
  },
  {
    id: "promo",
    label: "판촉물",
    icon: "🎁",
    subs: [
      {
        title: "전도용품",
        items: [
          { label: "종이티슈", href: "/templates?cat=promo&type=tissue-paper" },
          { label: "물티슈", href: "/templates?cat=promo&type=tissue-wet" },
          { label: "각티슈", href: "/templates?cat=promo&type=tissue-box" },
          { label: "청소박사", href: "/templates?cat=promo&type=cleaner" },
          { label: "기타 전도용품", href: "/templates?cat=promo&type=etc" },
        ],
      },
      {
        title: "판촉물",
        items: [
          { label: "단체 티셔츠", href: "/templates?cat=promo&type=tshirt" },
          { label: "여름 홍보/판촉", href: "/templates?cat=promo&type=summer" },
          { label: "가정/생활용품", href: "/templates?cat=promo&type=home" },
          { label: "보틀/주방용품/식품", href: "/templates?cat=promo&type=kitchen" },
          { label: "필기구/사무문구", href: "/templates?cat=promo&type=stationery" },
        ],
      },
    ],
  },
];

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
        {/* 로고 */}
        <Link href="/" className="shrink-0">
          <img src="/logo.png" alt="주보라" className="h-9 w-auto" />
        </Link>

        {/* 검색 (데스크톱) */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-1 justify-center">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="찾으시는 상품이 있나요?"
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

      {/* ══════════════════════════════════════════════════ */}
      {/* 카테고리 메뉴 바 (데스크톱 — 메가메뉴) */}
      {/* ══════════════════════════════════════════════════ */}
      <div className="hidden lg:block border-t border-gray-100" ref={megaRef}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-0">
            {/* 전체 상품 보기 */}
            <Link
              href="/templates"
              className="shrink-0 flex items-center gap-1.5 px-4 py-3 text-sm font-bold text-primary-700 hover:bg-primary-50 transition-colors border-r border-gray-100"
            >
              <LayoutGrid size={15} />
              상품 전체보기
            </Link>

            {/* 메가메뉴 카테고리 */}
            {MEGA_MENU.map((cat) => (
              <div
                key={cat.id}
                className="relative"
                onMouseEnter={() => openMenu(cat.id)}
                onMouseLeave={scheduleClose}
              >
                <button
                  className={`flex items-center gap-1 px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap
                    ${activeMenu === cat.id
                      ? "text-primary-600 bg-primary-50 border-b-2 border-primary-600"
                      : "text-gray-700 hover:text-primary-600 hover:bg-gray-50 border-b-2 border-transparent"
                    }`}
                >
                  <span className="text-xs">{cat.icon}</span>
                  {cat.label}
                  <ChevronDown size={12} className={`ml-0.5 transition-transform ${activeMenu === cat.id ? "rotate-180" : ""}`} />
                </button>
              </div>
            ))}

            {/* 유틸 메뉴 */}
            <div className="flex items-center ml-auto gap-0">
              <Link href="/price" className="px-4 py-3 text-sm text-gray-600 hover:text-primary-600 hover:bg-gray-50 transition-colors">
                가격안내
              </Link>
              <Link href="/guide" className="px-4 py-3 text-sm text-gray-600 hover:text-primary-600 hover:bg-gray-50 transition-colors">
                이용안내
              </Link>
            </div>
          </div>
        </div>

        {/* ── 메가 드롭다운 패널 ── */}
        {activeMenu && (
          <div
            className="absolute left-0 right-0 bg-white border-t border-gray-200 shadow-xl z-40"
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
          >
            <div className="max-w-7xl mx-auto px-6 py-6">
              {(() => {
                const cat = MEGA_MENU.find((c) => c.id === activeMenu);
                if (!cat) return null;
                return (
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
                              <Link
                                href={item.href}
                                className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary-600 hover:pl-1 transition-all"
                                onClick={() => setActiveMenu(null)}
                              >
                                {item.label}
                                {item.badge && (
                                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                                    item.badge === "BEST" ? "bg-red-100 text-red-600" :
                                    item.badge === "NEW" ? "bg-blue-100 text-blue-600" :
                                    "bg-gray-100 text-gray-600"
                                  }`}>
                                    {item.badge}
                                  </span>
                                )}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>
          </div>
        )}
      </div>

      {/* ══════════════════════════════════════════════════ */}
      {/* 모바일 메뉴 */}
      {/* ══════════════════════════════════════════════════ */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white shadow-lg max-h-[80vh] overflow-y-auto">
          {/* 검색 */}
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

          {/* 카테고리 아코디언 */}
          <div className="py-2">
            {/* 전체보기 */}
            <Link href="/templates" className="flex items-center gap-2 px-6 py-3 text-sm font-bold text-primary-700 hover:bg-primary-50" onClick={() => setMobileOpen(false)}>
              <LayoutGrid size={15} /> 상품 전체보기
            </Link>

            {MEGA_MENU.map((cat) => (
              <div key={cat.id}>
                <button
                  onClick={() => setMobileExpanded(mobileExpanded === cat.id ? null : cat.id)}
                  className="w-full flex items-center justify-between px-6 py-3 text-sm font-medium text-gray-800 hover:bg-gray-50 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <span>{cat.icon}</span> {cat.label}
                  </span>
                  <ChevronDown size={14} className={`text-gray-400 transition-transform ${mobileExpanded === cat.id ? "rotate-180" : ""}`} />
                </button>

                {mobileExpanded === cat.id && (
                  <div className="bg-gray-50 pb-2">
                    {cat.subs.map((sub) => (
                      <div key={sub.title} className="px-8 pt-3">
                        <p className="text-xs font-bold text-gray-500 mb-1.5">{sub.title}</p>
                        {sub.items.map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            className="block py-1.5 text-sm text-gray-600 hover:text-primary-600"
                            onClick={() => setMobileOpen(false)}
                          >
                            {item.label}
                            {item.badge && (
                              <span className={`ml-1.5 text-[10px] font-bold px-1 py-0.5 rounded ${
                                item.badge === "BEST" ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"
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

            {/* 유틸 링크 */}
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

          {/* 하단 버튼 */}
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
