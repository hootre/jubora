"use client";
import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ShoppingCart, MessageSquare, X } from "lucide-react";
import {
  SAMPLE_TEMPLATES,
  TEMPLATE_CATEGORIES as CATEGORIES,
  TEMPLATE_FILTERS,
  TEMPLATE_PARENT_MAP,
} from "@/lib/templates";
import type { SampleTemplate, TemplateOrientation } from "@/lib/templates";

const FALLBACK_RATIO: Record<TemplateOrientation, string> = {
  wide:     "h-36",
  portrait: "h-56",
  square:   "h-44",
};

function TemplateCard({ tmpl }: { tmpl: SampleTemplate }) {
  const hasImg = tmpl.img !== null;
  const fallbackColor = tmpl.color ?? "from-gray-300 to-gray-400";

  // 주문 링크: productId가 있으면 product 기반, 없으면 template 기반
  const href = tmpl.productId
    ? (tmpl.isInquiry
        ? `/order?product=${tmpl.productId}&mode=inquiry`
        : `/order?product=${tmpl.productId}`)
    : (hasImg
        ? `/order?template=${tmpl.id}&img=${encodeURIComponent(tmpl.img as string)}`
        : `/order?template=${tmpl.id}`);

  return (
    <div className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-primary-400 hover:shadow-lg transition-all duration-200 relative">
      {hasImg ? (
        <div className={`${FALLBACK_RATIO[tmpl.orientation]} relative overflow-hidden bg-gray-50 flex items-center justify-center`}>
          <img src={tmpl.img!} alt={tmpl.name}
            className="w-full h-full object-contain group-hover:scale-[1.02] transition-transform duration-300"
            loading="lazy" />
        </div>
      ) : (
        <div className={`${FALLBACK_RATIO[tmpl.orientation]} bg-gradient-to-br ${fallbackColor} relative overflow-hidden flex items-center justify-center`}>
          <div className="text-center text-white/90 px-3">
            <p className="font-bold text-sm sm:text-base drop-shadow">{tmpl.name}</p>
            <p className="text-xs mt-1 opacity-70">{tmpl.tags.join(" · ")}</p>
          </div>
          <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-white/10" />
          <div className="absolute -left-4 -bottom-4 w-16 h-16 rounded-full bg-white/10" />
        </div>
      )}

      <div className="p-3">
        <p className="text-sm font-medium text-gray-800 mb-2 truncate">{tmpl.name}</p>
        <Link href={href}
          className="w-full flex items-center justify-center gap-1.5 bg-primary-600 hover:bg-primary-700 text-white py-2 rounded-lg text-xs font-semibold transition-colors">
          {tmpl.isInquiry ? (
            <><MessageSquare size={12} /> 견적문의</>
          ) : (
            <><ShoppingCart size={12} /> 주문하기</>
          )}
        </Link>
      </div>
    </div>
  );
}

export default function TemplatesPage() {
  return (
    <Suspense>
      <TemplatesContent />
    </Suspense>
  );
}

function TemplatesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const cat = searchParams.get("cat") ?? "all";
  const q = searchParams.get("q") ?? "";
  const filter = searchParams.get("filter") ?? "";

  const availableFilters = TEMPLATE_FILTERS[cat] ?? [];

  // ── 필터링 ──
  const filtered = SAMPLE_TEMPLATES.filter((t) => {
    const parent = TEMPLATE_PARENT_MAP[t.category] ?? t.category;

    // 카테고리 필터
    if (cat !== "all" && parent !== cat) return false;

    // 서브 필터
    if (filter && t.category !== filter) return false;

    // 검색
    if (q.trim()) {
      const lower = q.toLowerCase();
      if (![t.name, ...t.tags].some((s) => s.toLowerCase().includes(lower))) return false;
    }

    return true;
  });

  // URL 빌더
  const buildUrl = (params: { cat?: string; filter?: string; q?: string }) => {
    const p = new URLSearchParams();
    const newCat = params.cat ?? cat;
    const newFilter = params.filter ?? (params.cat !== undefined ? "" : filter);
    const newQ = params.q ?? q;
    if (newCat !== "all") p.set("cat", newCat);
    if (newFilter) p.set("filter", newFilter);
    if (newQ) p.set("q", newQ);
    return `/templates${p.toString() ? `?${p}` : ""}`;
  };

  const handleCatChange = (id: string) => router.push(buildUrl({ cat: id, filter: "" }));
  const handleFilterChange = (fid: string) => router.push(buildUrl({ filter: filter === fid ? "" : fid }));

  // 그리드 — 가로형(현수막) 카테고리는 넓게
  const isWide = cat === "banner" && (!filter || ["bg", "season", "worship", "event"].includes(filter));
  const gridCols = isWide
    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
    : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4";

  const filterLabel = availableFilters.find((f) => f.id === filter)?.label ?? "";

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
      {/* 헤더 */}
      <div className="mb-6">
        <h1 className="section-title mb-1">
          상품 갤러리
          {filter && <span className="text-primary-600 ml-2">— {filterLabel}</span>}
        </h1>
        {q ? (
          <div className="flex items-center gap-2 mt-2">
            <p className="text-sm text-gray-500">
              <span className="font-semibold text-gray-800">&ldquo;{q}&rdquo;</span> 검색 결과 {filtered.length}개
            </p>
            <button onClick={() => router.push(buildUrl({ q: "" }))}
              className="text-xs text-gray-400 hover:text-red-500 border border-gray-200 hover:border-red-300 px-2 py-0.5 rounded transition-colors">
              ✕ 초기화
            </button>
          </div>
        ) : (
          <p className="text-sm text-gray-500">원하시는 상품을 선택하고 바로 주문하세요.</p>
        )}
      </div>

      {/* 카테고리 탭 */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
        {CATEGORIES.map(({ id, label }) => {
          const isActive = cat === id || (id === "all" && !searchParams.get("cat"));
          return (
            <button key={id} onClick={() => handleCatChange(id)}
              className={`shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors
                ${isActive
                  ? "bg-primary-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
              {label}
            </button>
          );
        })}
      </div>

      {/* 서브 필터 칩 */}
      {availableFilters.length > 0 && (
        <div className="flex gap-1.5 mb-6 overflow-x-auto pb-2 scrollbar-hide">
          <button onClick={() => router.push(buildUrl({ filter: "" }))}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors border
              ${!filter
                ? "bg-primary-100 text-primary-700 border-primary-300"
                : "bg-white text-gray-500 border-gray-200 hover:border-primary-300 hover:text-primary-600"}`}>
            전체
          </button>
          {availableFilters.map(({ id, label }) => (
            <button key={id} onClick={() => handleFilterChange(id)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors border
                ${filter === id
                  ? "bg-primary-100 text-primary-700 border-primary-300"
                  : "bg-white text-gray-500 border-gray-200 hover:border-primary-300 hover:text-primary-600"}`}>
              {label}
            </button>
          ))}
        </div>
      )}

      {/* 활성 필터 표시 */}
      {filter && (
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs text-gray-400">필터:</span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-primary-50 text-primary-700 rounded-full text-xs font-medium">
            {filterLabel}
            <button onClick={() => router.push(buildUrl({ filter: "" }))} className="hover:text-primary-900">
              <X size={12} />
            </button>
          </span>
          <span className="text-xs text-gray-400">{filtered.length}개</span>
        </div>
      )}

      {/* 그리드 */}
      <div className={`grid ${gridCols} gap-4`}>
        {filtered.map((tmpl) => (
          <TemplateCard key={tmpl.id} tmpl={tmpl} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          <p className="text-4xl mb-4">{q ? "🔍" : "🖼️"}</p>
          <p className="text-base font-medium mb-1">
            {q ? `"${q}"에 해당하는 상품이 없어요.` : filter ? `"${filterLabel}" 상품이 곧 추가될 예정이에요.` : "해당 카테고리의 상품이 없습니다."}
          </p>
          <p className="text-sm">{q ? "다른 키워드로 검색해보세요." : "곧 추가될 예정이에요!"}</p>
        </div>
      )}
    </div>
  );
}
