"use client";
import { use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PRODUCT_CATEGORIES, getCategoryById } from "@/constants/products";
import type { Category, ProductItem } from "@/constants/products";
import { ChevronRight, ShoppingCart, MessageSquare, ArrowRight } from "lucide-react";

function ProductCard({ item, categoryId }: { item: ProductItem; categoryId: string }) {
  const isInquiry = item.orderType === "inquiry";
  const href = isInquiry
    ? `/order?product=${item.id}&mode=inquiry`
    : `/order?product=${item.id}`;

  return (
    <div className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-primary-400 hover:shadow-lg transition-all duration-200">
      {/* 썸네일 */}
      {item.thumbnail ? (
        <div className="h-40 relative overflow-hidden bg-gray-50">
          <img src={item.thumbnail} alt={item.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
        </div>
      ) : (
        <div className={`h-40 bg-gradient-to-br ${item.color ?? "from-gray-300 to-gray-400"} relative overflow-hidden flex items-center justify-center`}>
          <div className="text-center text-white/90">
            <p className="font-bold text-lg drop-shadow">{item.name}</p>
          </div>
          {/* 장식 패턴 */}
          <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-white/10" />
          <div className="absolute -left-4 -bottom-4 w-16 h-16 rounded-full bg-white/10" />
        </div>
      )}

      {/* 뱃지 */}
      {item.badge && (
        <div className="absolute top-3 left-3">
          <span className={`text-[10px] font-bold px-2 py-1 rounded-full shadow-sm ${
            item.badge === "BEST" ? "bg-red-500 text-white" :
            item.badge === "NEW" ? "bg-blue-500 text-white" :
            "bg-amber-500 text-white"
          }`}>
            {item.badge}
          </span>
        </div>
      )}

      {/* 정보 */}
      <div className="p-4">
        <h3 className="font-bold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors">{item.name}</h3>
        <p className="text-sm text-gray-500 mb-3 line-clamp-2">{item.description}</p>

        <div className="flex items-center justify-between">
          {item.startPrice ? (
            <p className="text-primary-600 font-bold text-sm">
              {item.startPrice.toLocaleString()}원~
            </p>
          ) : (
            <p className="text-gray-400 text-sm">별도 견적</p>
          )}

          <Link href={href}
            className="flex items-center gap-1.5 px-3 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-xs font-semibold transition-colors">
            {isInquiry ? (
              <><MessageSquare size={12} /> 견적문의</>
            ) : (
              <><ShoppingCart size={12} /> 주문하기</>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: slug } = use(params);
  const cat = getCategoryById(slug);

  if (!cat) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <p className="text-4xl mb-4">🔍</p>
        <p className="text-gray-600 mb-4">해당 카테고리를 찾을 수 없습니다.</p>
        <Link href="/templates" className="btn-primary">전체 상품 보기</Link>
      </div>
    );
  }

  return (
    <div>
      {/* 히어로 */}
      <div className={`bg-gradient-to-r ${cat.bannerColor} text-white py-12 px-4`}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-1.5 text-white/50 text-sm mb-3">
            <Link href="/" className="hover:text-white/80">홈</Link>
            <ChevronRight size={12} />
            <span className="text-white/80">{cat.label}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-3xl">{cat.icon}</span>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">{cat.label}</h1>
              <p className="text-white/80 text-sm mt-1">{cat.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {cat.subs.map((sub) => (
          <section key={sub.id} className="mb-10">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-1 h-6 bg-primary-500 rounded-full" />
              <h2 className="text-xl font-bold text-gray-900">{sub.title}</h2>
              <span className="text-sm text-gray-400">({sub.items.length})</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {sub.items.map((item) => (
                <ProductCard key={item.id} item={item} categoryId={cat.id} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
