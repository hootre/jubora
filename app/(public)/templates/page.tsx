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
import { PRODUCT_CATEGORIES } from "@/constants/products";
import type { SampleTemplate, TemplateOrientation } from "@/lib/templates";
import type { ProductItem } from "@/constants/products";

// ── 통합 갤러리 아이템 타입 ──
interface GalleryItem {
  id: string;
  name: string;
  description?: string;
  img: string | null;
  color?: string;
  badge?: string;
  startPrice?: number;
  orientation: TemplateOrientation;
  href: string;
  isInquiry?: boolean;
}

// ── 시안 템플릿 → GalleryItem 변환 ──
function templateToGallery(t: SampleTemplate): GalleryItem {
  const hasImg = t.img !== null;
  return {
    id: t.id,
    name: t.name,
    img: t.img,
    color: t.color,
    orientation: t.orientation,
    href: hasImg
      ? `/order?template=${t.id}&img=${encodeURIComponent(t.img as string)}`
      : `/order?template=${t.id}`,
  };
}

// ── 제품 아이템 → GalleryItem 변환 ──
function productToGallery(p: ProductItem): GalleryItem {
  const isInquiry = p.orderType === "inquiry";
  return {
    id: p.id,
    name: p.name,
    description: p.description,
    img: p.thumbnail,
    color: p.color,
    badge: p.badge,
    startPrice: p.startPrice,
    orientation: "square",
    href: isInquiry
      ? `/order?product=${p.id}&mode=inquiry`
      : `/order?product=${p.id}`,
    isInquiry,
  };
}

// ── 카드 컴포넌트 ──
function GalleryCard({ item }: { item: GalleryItem }) {
  const hasImg = item.img !== null;
  const fallbackColor = item.color ?? "from-gray-300 to-gray-400";

  const heightClass =
    item.orientation === "wide" ? "h-36" :
    item.orientation === "portrait" ? "h-56" : "h-44";

  return (
    <div className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-primary-400 hover:shadow-lg transition-all duration-200 relative">
      {/* 뱃지 */}
      {item.badge && (
        <div className="absolute top-3 left-3 z-10">
          <span className={`text-[10px] font-bold px-2 py-1 rounded-full shadow-sm ${
            item.badge === "BEST" ? "bg-red-500 text-white" :
            item.badge === "NEW" ? "bg-blue-500 text-white" :
            "bg-amber-500 text-white"
          }`}>{item.badge}</span>
        </div>
      )}

      {/* 이미지/그라디언트 */}
      {hasImg ? (
        <div className={`${heightClass} relative overflow-hidden bg-gray-50 flex items-center justify-center`}>
          <img src={item.img!} alt={item.name}
            className="w-full h-full object-contain group-hover:scale-[1.02] transition-transform duration-300"
            loading="lazy" />
        </div>
      ) : (
        <div className={`${heightClass} bg-gradient-to-br ${fallbackColor} relative overflow-hidden flex items-center justify-center`}>
          <div className="text-center text-white/90 px-3">
            <p className="font-bold text-sm sm:text-base drop-shadow">{item.name}</p>
            {item.description && (
              <p className="text-xs mt-1 opacity-70 line-clamp-2">{item.description}</p>
            )}
          </div>
          <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-white/10" />
          <div className="absolute -left-4 -bottom-4 w-16 h-16 rounded-full bg-white/10" />
        </div>
      )}

      {/* 하단 정보 */}
      <div className="p-3">
        <p className="text-sm font-medium text-gray-800 mb-1 truncate">{item.name}</p>
        {item.startPrice !== undefined && (
          <p className="text-xs text-primary-600 font-bold mb-2">
            {item.startPrice.toLocaleString()}원~
          </p>
        )}
        <Link href={item.href}
          className="w-full flex items-center justify-center gap-1.5 bg-primary-600 hover:bg-primary-700 text-white py-2 rounded-lg text-xs font-semibold transition-colors">
          {item.isInquiry ? (
            <><MessageSquare size={12} /> 견적문의</>
          ) : (
            <><ShoppingCart size={12} /> 주문하기</>
          )}
        </Link>
      </div>
    </div>
  );
}

// ── 메인 페이지 ──
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

  // ── 갤러리 아이템 생성 ──
  const galleryItems: GalleryItem[] = [];

  if (cat === "all" || cat === "banner") {
    // 현수막/배너: 시안 템플릿 표시
    const bannerTemplates = SAMPLE_TEMPLATES.filter((t) => {
      const parent = TEMPLATE_PARENT_MAP[t.category];
      if (cat === "banner") {
        if (filter) return t.category === filter;
        return parent === "banner";
      }
      // cat === "all"
      return parent === "banner";
    });
    galleryItems.push(...bannerTemplates.map(templateToGallery));
  }

  if (cat === "all" || (cat !== "banner")) {
    // 나머지 카테고리: 제품 아이템 표시
    const targetCats = cat === "all"
      ? PRODUCT_CATEGORIES.filter((c) => c.id !== "banner")
      : PRODUCT_CATEGORIES.filter((c) => c.id === cat);

    for (const category of targetCats) {
      for (const sub of category.subs) {
        // galleryLink가 있는 아이템은 이미 banner 시안으로 표시됨
        const items = sub.items.filter((p) => !p.galleryLink);
        if (filter && cat !== "all") {
          if (sub.id !== filter) continue;
        }
        galleryItems.push(...items.map(productToGallery));
      }
    }
  }

  // 검색 필터
  const filtered = q.trim()
    ? galleryItems.filter((item) =>
        [item.name, item.description ?? ""].some((s) =>
          s.toLowerCase().includes(q.toLowerCase())
        )
      )
    : galleryItems;

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

  const handleCatChange = (id: string) => {
    router.push(buildUrl({ cat: id, filter: "" }));
  };

  const handleFilterChange = (filterId: string) => {
    router.push(buildUrl({ filter: filter === filterId ? "" : filterId }));
  };

  // 그리드 — 현수막은 가로형이 많으므로 넓게
  const isWide = cat === "banner" && (!filter || ["bg", "season", "worship", "event"].includes(filter));
  const gridCols = isWide
    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
    : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4";

  const catLabel = CATEGORIES.find((c) => c.id === cat)?.label ?? "전체";
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

      {/* 서브 필터 칩 */}
      {availableFilters.length > 0 && (
        <div className="flex gap-1.5 mb-6 overflow-x-auto pb-2 scrollbar-hide">
          <button
            onClick={() => router.push(buildUrl({ filter: "" }))}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors border
              ${!filter
                ? "bg-primary-100 text-primary-700 border-primary-300"
                : "bg-white text-gray-500 border-gray-200 hover:border-primary-300 hover:text-primary-600"
              }`}>
            전체
          </button>
          {availableFilters.map(({ id, label }) => (
            <button key={id}
              onClick={() => handleFilterChange(id)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors border
                ${filter === id
                  ? "bg-primary-100 text-primary-700 border-primary-300"
                  : "bg-white text-gray-500 border-gray-200 hover:border-primary-300 hover:text-primary-600"
                }`}>
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
        {filtered.map((item) => (
          <GalleryCard key={item.id} item={item} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          <p className="text-4xl mb-4">{q ? "🔍" : "🖼️"}</p>
          <p className="text-base font-medium mb-1">
            {q ? `"${q}"에 해당하는 상품이 없어요.` : filter ? `"${filterLabel}" 상품이 곧 추가될 예정이에요.` : "해당 카테고리의 상품이 없습니다."}
          </p>
          <p className="text-sm">
            {q ? "다른 키워드로 검색해보세요." : "곧 추가될 예정이에요!"}
          </p>
        </div>
      )}
    </div>
  );
}
