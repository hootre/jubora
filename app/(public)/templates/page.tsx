"use client";
import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ShoppingCart, X } from "lucide-react";
import {
  SAMPLE_TEMPLATES,
  TEMPLATE_CATEGORIES as CATEGORIES,
  TEMPLATE_FILTERS,
} from "@/lib/templates";

import type { SampleTemplate, TemplateOrientation } from "@/lib/templates";
type Orientation = TemplateOrientation;
type Template = SampleTemplate;

const FALLBACK_RATIO: Record<Orientation, string> = {
  wide:     "aspect-[4/1]",
  portrait: "aspect-[2/3]",
  square:   "aspect-[3/4]",
};

function TemplateCard({ tmpl }: { tmpl: Template }) {
  const hasImg = "img" in tmpl && tmpl.img;
  const fallbackColor = ("color" in tmpl ? tmpl.color : null) ?? "from-gray-300 to-gray-400";

  return (
    <div className="group bg-white rounded-lg border border-gray-200 overflow-hidden hover:border-primary-400 hover:shadow-lg transition-all duration-200">
      {hasImg ? (
        <div className={`${tmpl.orientation === "wide" ? "h-36" : tmpl.orientation === "portrait" ? "h-56" : "h-44"} relative overflow-hidden bg-gray-50 flex items-center justify-center`}>
          <img
            src={tmpl.img as string}
            alt={tmpl.name}
            className="w-full h-full object-contain group-hover:scale-[1.02] transition-transform duration-300"
            loading="lazy"
          />
        </div>
      ) : (
        <div className={`${FALLBACK_RATIO[tmpl.orientation as Orientation]} bg-gradient-to-br ${fallbackColor} relative overflow-hidden flex items-center justify-center`}>
          <div className="text-center text-white/80">
            <p className="font-bold text-sm">{tmpl.name}</p>
            <p className="text-xs mt-1 opacity-70">{tmpl.tags.join(" · ")}</p>
          </div>
        </div>
      )}

      <div className="p-3">
        <p className="text-sm font-medium text-gray-800 mb-2 truncate">{tmpl.name}</p>
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

  // 현재 카테고리의 필터 목록
  const availableFilters = TEMPLATE_FILTERS[cat] ?? [];

  const filtered = SAMPLE_TEMPLATES.filter((t) => {
    const matchCat = cat === "all" || t.category === cat;
    const matchQ = q.trim() === "" || [t.name, ...t.tags].some((s) =>
      s.toLowerCase().includes(q.toLowerCase())
    );
    const matchFilter = !filter || t.tags.some((tag) => tag === filter);
    return matchCat && matchQ && matchFilter;
  });

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

  const handleCatChange = (id: string) => {
    router.push(buildUrl({ cat: id, filter: "" }));
  };

  const handleFilterChange = (filterId: string) => {
    router.push(buildUrl({ filter: filter === filterId ? "" : filterId }));
  };

  // 카테고리에 따라 그리드 조절
  const isWide = cat === "all" || cat === "bg" || cat === "season" || cat === "worship" || cat === "event";
  const gridCols = isWide
    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
    : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4";

  // 현재 카테고리/필터 라벨
  const catLabel = CATEGORIES.find((c) => c.id === cat)?.label ?? "전체";
  const filterLabel = availableFilters.find((f) => f.id === filter)?.label ?? "";

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
      {/* 헤더 */}
      <div className="mb-6">
        <h1 className="section-title mb-1">
          시안 갤러리
          {filter && <span className="text-primary-600 ml-2">— {filterLabel}</span>}
        </h1>
        {q ? (
          <div className="flex items-center gap-2 mt-2">
            <p className="text-sm text-gray-500">
              <span className="font-semibold text-gray-800">&ldquo;{q}&rdquo;</span> 검색 결과 {filtered.length}개
            </p>
            <button
              onClick={() => router.push(buildUrl({ q: "" }))}
              className="text-xs text-gray-400 hover:text-red-500 border border-gray-200 hover:border-red-300 px-2 py-0.5 rounded transition-colors"
            >
              ✕ 초기화
            </button>
          </div>
        ) : (
          <p className="text-sm text-gray-500">마음에 드는 시안을 선택하고 바로 주문하세요.</p>
        )}
      </div>

      {/* 카테고리 필터 */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
        {CATEGORIES.map(({ id, label }) => {
          const isActive = cat === id || (id === "all" && !searchParams.get("cat"));
          return (
            <button key={id}
              onClick={() => handleCatChange(id)}
              className={`shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors
                ${isActive
                  ? "bg-primary-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
              {label}
            </button>
          );
        })}
      </div>

      {/* 서브 필터 칩 (카테고리에 필터가 있을 때만) */}
      {availableFilters.length > 0 && (
        <div className="flex gap-1.5 mb-6 overflow-x-auto pb-2 scrollbar-hide">
          <button
            onClick={() => router.push(buildUrl({ filter: "" }))}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors border
              ${!filter
                ? "bg-primary-100 text-primary-700 border-primary-300"
                : "bg-white text-gray-500 border-gray-200 hover:border-primary-300 hover:text-primary-600"
              }`}
          >
            전체
          </button>
          {availableFilters.map(({ id, label }) => (
            <button key={id}
              onClick={() => handleFilterChange(id)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors border
                ${filter === id
                  ? "bg-primary-100 text-primary-700 border-primary-300"
                  : "bg-white text-gray-500 border-gray-200 hover:border-primary-300 hover:text-primary-600"
                }`}
            >
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
            {q ? `"${q}"에 해당하는 시안이 없어요.` : filter ? `"${filterLabel}" 시안이 곧 추가될 예정이에요.` : "해당 카테고리의 시안이 없습니다."}
          </p>
          <p className="text-sm">
            {q ? "다른 키워드로 검색해보세요." : "곧 추가될 예정이에요!"}
          </p>
        </div>
      )}
    </div>
  );
}
