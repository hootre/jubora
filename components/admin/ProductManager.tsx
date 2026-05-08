"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import {
  getAllProducts, addProduct, updateProduct, deleteProduct,
  toggleProductActive, seedProductsFromConstants, hasProducts,
  type FirestoreProduct,
} from "@/lib/firestore-products";
import { PRODUCT_CATEGORIES, ORDER_FORM_CONFIGS, type OrderType } from "@/constants/products";
import {
  Plus, Pencil, Trash2, ChevronDown, ChevronRight,
  Loader2, Search, Package, Eye, EyeOff, Save, X,
  Database, AlertCircle, Check, Image as ImageIcon,
  GripVertical, ToggleLeft, ToggleRight, Star, Tag,
} from "lucide-react";

// ── 카테고리 메타 (constants에서 가져옴) ──
const CATEGORIES = PRODUCT_CATEGORIES.map((c) => ({
  id: c.id,
  label: c.label,
  icon: c.icon,
  subs: c.subs.map((s) => ({ id: s.id, title: s.title })),
}));

const ORDER_TYPES: { id: OrderType; label: string }[] = [
  { id: "banner", label: "현수막/배너" },
  { id: "poster", label: "포스터/전단지" },
  { id: "leaflet", label: "리플렛" },
  { id: "sticker", label: "스티커" },
  { id: "namecard", label: "명함" },
  { id: "envelope", label: "봉투" },
  { id: "inquiry", label: "맞춤견적" },
];

const BADGE_OPTIONS = [
  { id: "", label: "없음" },
  { id: "BEST", label: "BEST" },
  { id: "NEW", label: "NEW" },
  { id: "HOT", label: "HOT" },
];

// ── 메인 컴포넌트 ──
export default function ProductManager() {
  const [products, setProducts] = useState<FirestoreProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // 아코디언 상태
  const [expandedCats, setExpandedCats] = useState<Set<string>>(new Set());
  const [expandedSubs, setExpandedSubs] = useState<Set<string>>(new Set());

  // 편집 모달
  const [editProduct, setEditProduct] = useState<FirestoreProduct | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [addTarget, setAddTarget] = useState<{ categoryId: string; subId: string } | null>(null);

  // 삭제 확인
  const [deleteTarget, setDeleteTarget] = useState<FirestoreProduct | null>(null);
  const [deleting, setDeleting] = useState(false);

  // 토스트
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  // ── 데이터 로드 ──
  const loadProducts = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAllProducts();
      setProducts(data);
      setIsEmpty(data.length === 0);
    } catch (err) {
      console.error("제품 로드 실패:", err);
      showToast("제품 데이터를 불러오지 못했습니다.", "error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadProducts(); }, [loadProducts]);

  // ── 초기 데이터 동기화 ──
  const handleSeed = async () => {
    if (!confirm("기존 상품 데이터(constants/products.ts)를 Firestore에 동기화합니다.\n기존 Firestore 데이터는 유지됩니다. 계속할까요?")) return;
    setSeeding(true);
    try {
      const count = await seedProductsFromConstants();
      showToast(`${count}개 제품이 동기화되었습니다.`);
      await loadProducts();
    } catch (err) {
      console.error("동기화 실패:", err);
      showToast("동기화에 실패했습니다.", "error");
    } finally {
      setSeeding(false);
    }
  };

  // ── 활성/비활성 토글 ──
  const handleToggleActive = async (product: FirestoreProduct) => {
    try {
      await toggleProductActive(product.id, !product.isActive);
      setProducts((prev) =>
        prev.map((p) => (p.id === product.id ? { ...p, isActive: !p.isActive } : p))
      );
      showToast(`${product.name} ${product.isActive ? "비활성화" : "활성화"} 완료`);
    } catch {
      showToast("상태 변경 실패", "error");
    }
  };

  // ── 삭제 ──
  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteProduct(deleteTarget.id);
      setProducts((prev) => prev.filter((p) => p.id !== deleteTarget.id));
      showToast(`${deleteTarget.name} 삭제 완료`);
      setDeleteTarget(null);
    } catch {
      showToast("삭제 실패", "error");
    } finally {
      setDeleting(false);
    }
  };

  // ── 검색 필터 ──
  const filteredProducts = searchQuery.trim()
    ? products.filter(
        (p) =>
          p.name.includes(searchQuery) ||
          p.description.includes(searchQuery) ||
          p.productId.includes(searchQuery)
      )
    : products;

  // ── 카테고리별 그룹핑 ──
  const getProductsForSub = (catId: string, subId: string) =>
    filteredProducts.filter((p) => p.categoryId === catId && p.subId === subId);

  const getCategoryProductCount = (catId: string) =>
    filteredProducts.filter((p) => p.categoryId === catId).length;

  const toggleCat = (id: string) => {
    setExpandedCats((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSub = (id: string) => {
    setExpandedSubs((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // ── 로딩 ──
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 size={32} className="animate-spin text-primary-600" />
      </div>
    );
  }

  return (
    <div>
      {/* 상단 툴바 */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="제품명, 설명, ID로 검색..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary-500 bg-white"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleSeed}
            disabled={seeding}
            className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            {seeding ? <Loader2 size={14} className="animate-spin" /> : <Database size={14} />}
            {seeding ? "동기화 중..." : "초기 데이터 동기화"}
          </button>
        </div>
      </div>

      {/* 통계 바 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <div className="bg-white rounded-lg border border-gray-100 p-3 text-center">
          <p className="text-2xl font-bold text-gray-900">{products.length}</p>
          <p className="text-xs text-gray-500">전체 제품</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-100 p-3 text-center">
          <p className="text-2xl font-bold text-green-600">{products.filter((p) => p.isActive).length}</p>
          <p className="text-xs text-gray-500">활성 제품</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-100 p-3 text-center">
          <p className="text-2xl font-bold text-gray-400">{products.filter((p) => !p.isActive).length}</p>
          <p className="text-xs text-gray-500">비활성 제품</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-100 p-3 text-center">
          <p className="text-2xl font-bold text-blue-600">{CATEGORIES.length}</p>
          <p className="text-xs text-gray-500">카테고리</p>
        </div>
      </div>

      {/* 빈 상태 */}
      {isEmpty && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-6 text-center">
          <AlertCircle size={32} className="mx-auto mb-3 text-amber-500" />
          <p className="font-bold text-amber-800 mb-1">등록된 제품이 없습니다</p>
          <p className="text-sm text-amber-600 mb-4">
            &ldquo;초기 데이터 동기화&rdquo; 버튼을 눌러 기본 제품 데이터를 불러오세요.
          </p>
          <button
            onClick={handleSeed}
            disabled={seeding}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-sm font-semibold transition-colors disabled:opacity-50"
          >
            {seeding ? <Loader2 size={14} className="animate-spin" /> : <Database size={14} />}
            {seeding ? "동기화 중..." : "초기 데이터 동기화"}
          </button>
        </div>
      )}

      {/* ══ 카테고리 아코디언 ══ */}
      <div className="space-y-3">
        {CATEGORIES.map((cat) => {
          const catCount = getCategoryProductCount(cat.id);
          const isExpanded = expandedCats.has(cat.id);

          return (
            <div key={cat.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              {/* 카테고리 헤더 */}
              <button
                onClick={() => toggleCat(cat.id)}
                className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50 transition-colors"
              >
                <span className="text-lg">{cat.icon}</span>
                <span className="font-bold text-gray-900 text-sm">{cat.label}</span>
                <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{catCount}개</span>
                <div className="ml-auto">
                  {isExpanded ? <ChevronDown size={16} className="text-gray-400" /> : <ChevronRight size={16} className="text-gray-400" />}
                </div>
              </button>

              {/* 서브카테고리 */}
              {isExpanded && (
                <div className="border-t border-gray-100">
                  {cat.subs.map((sub) => {
                    const subProducts = getProductsForSub(cat.id, sub.id);
                    const subKey = `${cat.id}-${sub.id}`;
                    const isSubExpanded = expandedSubs.has(subKey);

                    return (
                      <div key={sub.id} className="border-b border-gray-50 last:border-b-0">
                        {/* 서브카테고리 헤더 */}
                        <div className="flex items-center">
                          <button
                            onClick={() => toggleSub(subKey)}
                            className="flex-1 flex items-center gap-2 px-6 py-2.5 hover:bg-gray-50 transition-colors text-left"
                          >
                            {isSubExpanded ? <ChevronDown size={14} className="text-gray-400" /> : <ChevronRight size={14} className="text-gray-400" />}
                            <span className="text-sm font-medium text-gray-700">{sub.title}</span>
                            <span className="text-xs text-gray-400">({subProducts.length})</span>
                          </button>
                          <button
                            onClick={() => {
                              setAddTarget({ categoryId: cat.id, subId: sub.id });
                              setShowAddModal(true);
                            }}
                            className="mr-4 flex items-center gap-1 text-xs text-primary-600 hover:text-primary-700 font-medium px-2 py-1 rounded hover:bg-primary-50 transition-colors"
                          >
                            <Plus size={12} /> 제품 추가
                          </button>
                        </div>

                        {/* 제품 리스트 */}
                        {isSubExpanded && (
                          <div className="px-4 pb-3">
                            {subProducts.length === 0 ? (
                              <p className="text-xs text-gray-400 text-center py-4">등록된 제품이 없습니다</p>
                            ) : (
                              <div className="space-y-1.5">
                                {subProducts.map((product) => (
                                  <ProductRow
                                    key={product.id}
                                    product={product}
                                    onEdit={() => setEditProduct(product)}
                                    onDelete={() => setDeleteTarget(product)}
                                    onToggle={() => handleToggleActive(product)}
                                  />
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ══ 수정 모달 ══ */}
      {editProduct && (
        <ProductEditModal
          product={editProduct}
          onSave={async (updated) => {
            await updateProduct(updated.id, updated);
            setProducts((prev) =>
              prev.map((p) => (p.id === updated.id ? { ...p, ...updated } : p))
            );
            setEditProduct(null);
            showToast(`${updated.name} 수정 완료`);
          }}
          onClose={() => setEditProduct(null)}
        />
      )}

      {/* ══ 추가 모달 ══ */}
      {showAddModal && addTarget && (
        <ProductAddModal
          categoryId={addTarget.categoryId}
          subId={addTarget.subId}
          existingCount={getProductsForSub(addTarget.categoryId, addTarget.subId).length}
          totalCount={products.length}
          onSave={async (newProduct) => {
            const docId = await addProduct(newProduct);
            const created: FirestoreProduct = {
              ...newProduct,
              id: docId,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            };
            setProducts((prev) => [...prev, created]);
            setShowAddModal(false);
            setAddTarget(null);
            showToast(`${newProduct.name} 추가 완료`);
          }}
          onClose={() => { setShowAddModal(false); setAddTarget(null); }}
        />
      )}

      {/* ══ 삭제 확인 모달 ══ */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setDeleteTarget(null)} />
          <div className="relative bg-white rounded-lg shadow-xl w-full max-w-sm p-6">
            <h3 className="font-bold text-gray-900 mb-2">제품 삭제</h3>
            <p className="text-sm text-gray-600 mb-4">
              <span className="font-bold text-red-600">{deleteTarget.name}</span>을(를) 정말 삭제하시겠습니까?
              <br />이 작업은 되돌릴 수 없습니다.
            </p>
            <div className="flex gap-2">
              <button onClick={() => setDeleteTarget(null)}
                className="flex-1 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                취소
              </button>
              <button onClick={handleDelete} disabled={deleting}
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-semibold transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                {deleting ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                {deleting ? "삭제 중..." : "삭제"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 토스트 */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 ${toast.type === "success" ? "bg-green-600" : "bg-red-600"} text-white px-5 py-3 rounded-lg shadow-xl flex items-center gap-2 text-sm font-medium`}>
          {toast.type === "success" ? <Check size={16} /> : <AlertCircle size={16} />}
          {toast.msg}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════
// 제품 행 컴포넌트
// ═══════════════════════════════════════════
function ProductRow({
  product,
  onEdit,
  onDelete,
  onToggle,
}: {
  product: FirestoreProduct;
  onEdit: () => void;
  onDelete: () => void;
  onToggle: () => void;
}) {
  return (
    <div className={`flex items-center gap-3 px-3 py-2.5 rounded-lg border transition-colors ${
      product.isActive ? "border-gray-100 bg-white hover:bg-gray-50" : "border-gray-100 bg-gray-50 opacity-60"
    }`}>
      {/* 썸네일 */}
      <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-gray-200">
        {product.thumbnail ? (
          <img src={product.thumbnail} alt={product.name} className="w-full h-full object-cover" />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${product.color ?? "from-gray-300 to-gray-400"} flex items-center justify-center`}>
            <Package size={14} className="text-white/70" />
          </div>
        )}
      </div>

      {/* 제품 정보 */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-medium text-gray-900 truncate">{product.name}</span>
          {product.badge && (
            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
              product.badge === "BEST" ? "bg-red-100 text-red-600" :
              product.badge === "NEW" ? "bg-blue-100 text-blue-600" :
              "bg-amber-100 text-amber-600"
            }`}>{product.badge}</span>
          )}
          {!product.isActive && (
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-gray-200 text-gray-500">비활성</span>
          )}
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <span className="font-mono">{product.productId}</span>
          <span>·</span>
          <span>{product.orderType}</span>
          {product.startPrice && (
            <>
              <span>·</span>
              <span className="text-primary-600">{product.startPrice.toLocaleString()}원~</span>
            </>
          )}
        </div>
      </div>

      {/* 액션 버튼 */}
      <div className="flex items-center gap-1 shrink-0">
        <button
          onClick={onToggle}
          title={product.isActive ? "비활성화" : "활성화"}
          className={`p-1.5 rounded-lg transition-colors ${
            product.isActive
              ? "text-green-600 hover:bg-green-50"
              : "text-gray-400 hover:bg-gray-100"
          }`}
        >
          {product.isActive ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
        </button>
        <button onClick={onEdit} title="수정"
          className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors">
          <Pencil size={14} />
        </button>
        <button onClick={onDelete} title="삭제"
          className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors">
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// 제품 수정 모달
// ═══════════════════════════════════════════
function ProductEditModal({
  product,
  onSave,
  onClose,
}: {
  product: FirestoreProduct;
  onSave: (updated: FirestoreProduct) => Promise<void>;
  onClose: () => void;
}) {
  const [form, setForm] = useState({ ...product });
  const [saving, setSaving] = useState(false);

  const set = (key: string, val: any) => setForm((p) => ({ ...p, [key]: val }));

  const handleSave = async () => {
    if (!form.name.trim()) { alert("제품명을 입력해주세요."); return; }
    if (!form.productId.trim()) { alert("제품 ID를 입력해주세요."); return; }
    setSaving(true);
    try {
      await onSave(form);
    } catch {
      alert("저장 실패");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
          <h2 className="font-bold text-gray-900">제품 수정</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg text-gray-400"><X size={18} /></button>
        </div>

        <div className="overflow-y-auto flex-1 p-6 space-y-4">
          <ProductFormFields form={form} set={set} />
        </div>

        <div className="px-6 py-4 border-t border-gray-100 flex gap-2 shrink-0">
          <button onClick={onClose} className="flex-1 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50">
            취소
          </button>
          <button onClick={handleSave} disabled={saving}
            className="flex-1 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-semibold transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            {saving ? "저장 중..." : "저장"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// 제품 추가 모달
// ═══════════════════════════════════════════
function ProductAddModal({
  categoryId,
  subId,
  existingCount,
  totalCount,
  onSave,
  onClose,
}: {
  categoryId: string;
  subId: string;
  existingCount: number;
  totalCount: number;
  onSave: (data: Omit<FirestoreProduct, "id" | "createdAt" | "updatedAt">) => Promise<void>;
  onClose: () => void;
}) {
  const cat = CATEGORIES.find((c) => c.id === categoryId);
  const sub = cat?.subs.find((s) => s.id === subId);

  const [form, setForm] = useState({
    productId: `${categoryId}-new-${Date.now()}`,
    categoryId,
    subId,
    name: "",
    description: "",
    thumbnail: null as string | null,
    color: "from-gray-400 to-gray-500",
    badge: null as string | null,
    startPrice: null as number | null,
    orderType: categoryId === "banner" ? "banner" : categoryId === "print" ? "poster" : "inquiry",
    sortOrder: totalCount,
    isActive: true,
  });
  const [saving, setSaving] = useState(false);

  const set = (key: string, val: any) => setForm((p) => ({ ...p, [key]: val }));

  const handleSave = async () => {
    if (!form.name.trim()) { alert("제품명을 입력해주세요."); return; }
    if (!form.productId.trim()) { alert("제품 ID를 입력해주세요."); return; }
    setSaving(true);
    try {
      await onSave(form as any);
    } catch {
      alert("저장 실패");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
          <div>
            <h2 className="font-bold text-gray-900">제품 추가</h2>
            <p className="text-xs text-gray-400 mt-0.5">
              {cat?.icon} {cat?.label} &gt; {sub?.title}
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg text-gray-400"><X size={18} /></button>
        </div>

        <div className="overflow-y-auto flex-1 p-6 space-y-4">
          <ProductFormFields form={form} set={set} />
        </div>

        <div className="px-6 py-4 border-t border-gray-100 flex gap-2 shrink-0">
          <button onClick={onClose} className="flex-1 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50">
            취소
          </button>
          <button onClick={handleSave} disabled={saving}
            className="flex-1 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-semibold transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
            {saving ? "추가 중..." : "제품 추가"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// 공통 폼 필드 컴포넌트
// ═══════════════════════════════════════════
function ProductFormFields({
  form,
  set,
}: {
  form: any;
  set: (key: string, val: any) => void;
}) {
  return (
    <>
      {/* 제품 ID */}
      <div>
        <label className="text-xs font-semibold text-gray-500 block mb-1">제품 ID *</label>
        <input
          type="text"
          value={form.productId}
          onChange={(e) => set("productId", e.target.value)}
          placeholder="banner-basic"
          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-mono focus:outline-none focus:border-primary-500"
        />
        <p className="text-[10px] text-gray-400 mt-1">URL에 사용되는 고유 식별자 (영문, 하이픈)</p>
      </div>

      {/* 제품명 */}
      <div>
        <label className="text-xs font-semibold text-gray-500 block mb-1">제품명 *</label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => set("name", e.target.value)}
          placeholder="기본 현수막"
          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary-500"
        />
      </div>

      {/* 설명 */}
      <div>
        <label className="text-xs font-semibold text-gray-500 block mb-1">제품 설명</label>
        <textarea
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
          placeholder="제품에 대한 간단한 설명"
          rows={2}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary-500 resize-none"
        />
      </div>

      {/* 썸네일 URL */}
      <div>
        <label className="text-xs font-semibold text-gray-500 block mb-1">썸네일 이미지 URL</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={form.thumbnail ?? ""}
            onChange={(e) => set("thumbnail", e.target.value || null)}
            placeholder="https://... 또는 /images/..."
            className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary-500"
          />
          {form.thumbnail && (
            <div className="w-10 h-10 rounded border border-gray-200 overflow-hidden shrink-0">
              <img src={form.thumbnail} alt="미리보기" className="w-full h-full object-cover" />
            </div>
          )}
        </div>
      </div>

      {/* 그라디언트 색상 (썸네일 없을 때) */}
      <div>
        <label className="text-xs font-semibold text-gray-500 block mb-1">배경 그라디언트 (썸네일 없을 때)</label>
        <input
          type="text"
          value={form.color ?? ""}
          onChange={(e) => set("color", e.target.value || null)}
          placeholder="from-blue-400 to-indigo-500"
          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-mono focus:outline-none focus:border-primary-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* 주문 유형 */}
        <div>
          <label className="text-xs font-semibold text-gray-500 block mb-1">주문 유형</label>
          <select
            value={form.orderType}
            onChange={(e) => set("orderType", e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary-500 bg-white"
          >
            {ORDER_TYPES.map((t) => (
              <option key={t.id} value={t.id}>{t.label}</option>
            ))}
          </select>
        </div>

        {/* 뱃지 */}
        <div>
          <label className="text-xs font-semibold text-gray-500 block mb-1">뱃지</label>
          <select
            value={form.badge ?? ""}
            onChange={(e) => set("badge", e.target.value || null)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary-500 bg-white"
          >
            {BADGE_OPTIONS.map((b) => (
              <option key={b.id} value={b.id}>{b.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* 시작 가격 */}
        <div>
          <label className="text-xs font-semibold text-gray-500 block mb-1">시작 가격 (원)</label>
          <input
            type="number"
            value={form.startPrice ?? ""}
            onChange={(e) => set("startPrice", e.target.value ? Number(e.target.value) : null)}
            placeholder="5000"
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary-500"
          />
          <p className="text-[10px] text-gray-400 mt-1">비워두면 &ldquo;별도 견적&rdquo;으로 표시</p>
        </div>

        {/* 정렬 순서 */}
        <div>
          <label className="text-xs font-semibold text-gray-500 block mb-1">정렬 순서</label>
          <input
            type="number"
            value={form.sortOrder}
            onChange={(e) => set("sortOrder", Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary-500"
          />
        </div>
      </div>

      {/* 활성 상태 */}
      <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
        <button
          type="button"
          onClick={() => set("isActive", !form.isActive)}
          className={`${form.isActive ? "text-green-600" : "text-gray-400"}`}
        >
          {form.isActive ? <ToggleRight size={24} /> : <ToggleLeft size={24} />}
        </button>
        <div>
          <p className="text-sm font-medium text-gray-900">{form.isActive ? "활성 상태" : "비활성 상태"}</p>
          <p className="text-xs text-gray-400">{form.isActive ? "고객에게 표시됩니다" : "고객에게 숨겨집니다"}</p>
        </div>
      </div>
    </>
  );
}
