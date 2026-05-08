"use client";
import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Zap, Truck, Shield, FileCheck, ShoppingCart } from "lucide-react";
import SliceSlider from "@/components/ui/SliceSlider";
import type { SlideData } from "@/components/ui/SliceSlider";
import { SAMPLE_TEMPLATES } from "@/lib/templates";
import type { SampleTemplate } from "@/lib/templates";

// 오른쪽 이미지를 넣으려면 /public/slides/ 폴더에 이미지를 추가하고
// 각 슬라이드의 image 필드에 "/slides/파일명.png" 경로를 지정하세요.
const HERO_SLIDES: SlideData[] = [
  {
    bg: "bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-800",
    subtitle: "현수막·배너 전문 온라인 제작",
    title: "시안 선택하고\n문구만 적으면 끝!",
    desc: "원하는 디자인을 고르고 주문하면,\n담당자가 시안 제작 후 전달해 드립니다.",
    primaryBtn: { label: "시안 갤러리 보기", href: "/templates" },
    secondaryBtn: { label: "바로 주문하기", href: "/order" },
    image: "/slides/hero-banner.svg",
  },
  {
    bg: "bg-gradient-to-br from-indigo-800 via-violet-700 to-purple-800",
    subtitle: "절기·행사 현수막 특별 할인",
    title: "절기 현수막,\n미리 준비하세요!",
    desc: "성탄절·부활절·추수감사절 등\n시즌 디자인을 한눈에 보고 주문하세요.",
    primaryBtn: { label: "절기 현수막 보기", href: "/templates?cat=season" },
    secondaryBtn: { label: "가격 안내", href: "/price" },
    image: "/slides/hero-season.svg",
  },
  {
    bg: "bg-gradient-to-br from-sky-700 via-cyan-600 to-teal-700",
    subtitle: "빠른 제작 · 전국 배송",
    title: "오전 주문,\n당일 제작 가능!",
    desc: "시안 확인 후 48시간 이내 제작 완료,\nCJ대한통운으로 전국 어디든 빠르게.",
    primaryBtn: { label: "주문하기", href: "/order" },
    secondaryBtn: { label: "이용안내", href: "/guide" },
    image: "/slides/hero-delivery.svg",
  },
  {
    bg: "bg-gradient-to-br from-emerald-700 via-teal-600 to-cyan-700",
    subtitle: "고품질 인쇄 · 합리적 가격",
    title: "UV코팅, 방수 처리로\n오래가는 퀄리티",
    desc: "전단지·봉투·스티커까지,\n다양한 인쇄물도 함께 제작합니다.",
    primaryBtn: { label: "가격표 보기", href: "/price" },
    secondaryBtn: { label: "시안 갤러리", href: "/templates" },
    image: "/slides/hero-quality.svg",
  },
];

const CATEGORIES = [
  { label: "현수막",       cat: "horizontal", img: "📢" },
  { label: "절기 현수막",  cat: "season",     img: "🌸" },
  { label: "예배·행사",    cat: "worship",    img: "⛪" },
  { label: "세로형 배너",  cat: "vertical",   img: "🎏" },
  { label: "X배너",        cat: "banner",     img: "🪧" },
  { label: "인쇄물",       cat: "print",      img: "🖨️" },
];

const STEPS = [
  { num: "1", title: "시안 선택", desc: "갤러리에서 원하는\n디자인을 골라요", color: "bg-blue-500" },
  { num: "2", title: "주문 접수", desc: "문구·옵션 입력 후\n주문서를 작성해요", color: "bg-indigo-500" },
  { num: "3", title: "시안 확인", desc: "담당자가 제작한\n시안을 확인해요", color: "bg-violet-500" },
  { num: "4", title: "결제·배송", desc: "승인 후 결제하면\n바로 제작·배송!", color: "bg-purple-500" },
];

export default function HomePage() {
  return (
    <div className="bg-white">

      {/* ── 히어로 조각 슬라이더 ── */}
      <SliceSlider slides={HERO_SLIDES} />

      {/* ── 상품 둘러보기 ── */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="section-title">상품 둘러보기</h2>
            <Link href="/templates" className="text-sm text-gray-500 hover:text-primary-600 flex items-center gap-1 transition-colors">
              전체보기 <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-6">
            {CATEGORIES.map(({ label, cat, img }) => (
              <Link key={cat} href={`/templates?cat=${cat}`} className="group flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-50 rounded-xl flex items-center justify-center text-3xl md:text-4xl group-hover:bg-blue-50 group-hover:scale-105 transition-all">
                  {img}
                </div>
                <span className="text-sm font-medium text-gray-700 group-hover:text-primary-600 transition-colors">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 추천 제품 ── */}
      <ProductShowcase />

      {/* ── 구분선 ── */}
      <div className="max-w-7xl mx-auto px-4"><div className="border-t border-gray-100" /></div>

      {/* ── 주문 흐름 ── */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="section-title mb-3">이렇게 진행돼요</h2>
          <p className="text-gray-500 text-sm mb-10">주문부터 배송까지 간단한 4단계</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {STEPS.map(({ num, title, desc, color }, i) => (
              <div key={num} className="relative">
                <div className="bg-gray-50 rounded-xl p-6 text-center h-full hover:bg-blue-50 transition-colors">
                  <div className={`w-10 h-10 ${color} text-white rounded-full flex items-center justify-center font-bold text-sm mx-auto mb-4`}>
                    {num}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 text-sm md:text-base">{title}</h3>
                  <p className="text-xs md:text-sm text-gray-500 whitespace-pre-line leading-relaxed">{desc}</p>
                </div>
                {i < 3 && (
                  <div className="hidden md:flex absolute top-1/2 -right-3 -translate-y-1/2 z-10">
                    <ChevronRight size={16} className="text-gray-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 구분선 ── */}
      <div className="max-w-7xl mx-auto px-4"><div className="border-t border-gray-100" /></div>

      {/* ── 왜 주보라? ── */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="section-title mb-10">주보라가 특별한 이유</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
            {[
              { icon: <FileCheck size={24} />, title: "시안 확인 후 제작", desc: "결제 전 시안을 확인하고 승인하는 안전한 프로세스" },
              { icon: <Zap size={24} />, title: "당일 제작", desc: "오전 주문 시 당일 제작·발송 가능" },
              { icon: <Truck size={24} />, title: "전국 배송", desc: "CJ대한통운으로 전국 어디든 빠른 배송" },
              { icon: <Shield size={24} />, title: "품질 보장", desc: "UV코팅, 방수 처리로 오래가는 퀄리티" },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="flex items-start gap-4 p-5 rounded-xl border border-gray-100 hover:border-primary-200 hover:bg-blue-50/30 transition-all">
                <div className="text-primary-600 shrink-0 mt-0.5">{icon}</div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm mb-1">{title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA 배너 ── */}
      <section className="bg-gray-900 py-10 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">지금 바로 주문해보세요</h2>
            <p className="text-gray-400 text-xs sm:text-sm">시안 선택부터 배송까지, 주보라가 빠르고 정확하게 제작해 드립니다.</p>
          </div>
          <div className="flex gap-3">
            <Link href="/templates" className="bg-white text-gray-900 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold text-sm transition-colors">
              시안 보기
            </Link>
            <Link href="/order" className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold text-sm transition-colors">
              주문하기
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ── 추천 제품 섹션 ── */
const PRODUCT_TABS = [
  { id: "all",        label: "전체" },
  { id: "horizontal", label: "현수막" },
  { id: "season",     label: "절기" },
  { id: "worship",    label: "예배·행사" },
  { id: "vertical",   label: "세로형 배너" },
];

function ProductShowcase() {
  const [tab, setTab] = useState("all");

  const filtered = SAMPLE_TEMPLATES.filter((t) => {
    if (tab === "all") return true;
    return t.category === tab;
  });

  // 최대 8개만 표시
  const display = filtered.slice(0, 8);

  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* 헤더 + 탭 */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <h2 className="section-title">인기 시안</h2>
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
            {PRODUCT_TABS.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  tab === id
                    ? "bg-primary-600 text-white"
                    : "bg-white text-gray-500 border border-gray-200 hover:border-primary-300 hover:text-primary-600"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* 제품 그리드 */}
        <div className={`grid gap-4 ${
          tab === "all" || tab === "horizontal" || tab === "season" || tab === "worship"
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
            : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
        }`}>
          {display.map((tmpl) => (
            <ProductCard key={tmpl.id} tmpl={tmpl} />
          ))}
        </div>

        {/* 전체보기 버튼 */}
        {filtered.length > 8 && (
          <div className="text-center mt-8">
            <Link
              href={tab === "all" ? "/templates" : `/templates?cat=${tab}`}
              className="inline-flex items-center gap-1.5 px-6 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-600 hover:border-primary-400 hover:text-primary-600 transition-colors bg-white"
            >
              더 많은 시안 보기 <ChevronRight size={14} />
            </Link>
          </div>
        )}

        {display.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <p className="text-sm">해당 카테고리의 시안이 준비 중입니다.</p>
          </div>
        )}
      </div>
    </section>
  );
}

function ProductCard({ tmpl }: { tmpl: SampleTemplate }) {
  const hasImg = tmpl.img !== null;
  const fallbackColor = tmpl.color ?? "from-gray-300 to-gray-400";
  const isWide = tmpl.orientation === "wide";

  return (
    <div className="group bg-white rounded-lg border border-gray-200 overflow-hidden hover:border-primary-400 hover:shadow-lg transition-all duration-200">
      {/* 썸네일 */}
      {hasImg ? (
        <div className={`${isWide ? "h-36" : "h-52"} relative overflow-hidden bg-gray-50 flex items-center justify-center`}>
          <img
            src={tmpl.img as string}
            alt={tmpl.name}
            className="w-full h-full object-contain group-hover:scale-[1.02] transition-transform duration-300"
            loading="lazy"
          />
        </div>
      ) : (
        <div className={`${isWide ? "h-36" : "h-52"} bg-gradient-to-br ${fallbackColor} relative overflow-hidden flex items-center justify-center`}>
          <div className="text-center text-white/80">
            <p className="font-bold text-sm">{tmpl.name}</p>
            <p className="text-xs mt-1 opacity-70">{tmpl.tags.join(" · ")}</p>
          </div>
        </div>
      )}

      {/* 정보 */}
      <div className="p-3">
        <p className="text-sm font-medium text-gray-800 mb-1 truncate">{tmpl.name}</p>
        <div className="flex items-center gap-1.5 mb-2.5">
          {tmpl.tags.map((tag) => (
            <span key={tag} className="text-[10px] text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded">
              {tag}
            </span>
          ))}
        </div>
        <Link
          href={
            hasImg
              ? `/order?template=${tmpl.id}&img=${encodeURIComponent(tmpl.img as string)}`
              : `/order?template=${tmpl.id}`
          }
          className="w-full flex items-center justify-center gap-1.5 bg-primary-600 hover:bg-primary-700 text-white py-2 rounded-lg text-xs font-semibold transition-colors"
        >
          <ShoppingCart size={12} />
          주문하기
        </Link>
      </div>
    </div>
  );
}
