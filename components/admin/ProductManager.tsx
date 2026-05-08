"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import {
  getAllProducts, addProduct, updateProduct, deleteProduct,
  toggleProductActive, seedProductsFromConstants,
  type FirestoreProduct,
} from "@/lib/firestore-products";
import {
  getAllOrderForms, saveOrderForm, seedOrderFormsFromConstants,
  type FirestoreOrderForm,
} from "@/lib/firestore-orderforms";
import { PRODUCT_CATEGORIES, type OrderType } from "@/constants/products";
import {
  Plus, Pencil, Trash2, ChevronDown, ChevronRight,
  Loader2, Search, Package, Save, X, Upload,
  Database, AlertCircle, Check, Settings2,
  ToggleLeft, ToggleRight, Image as ImageIcon,
} from "lucide-react";

// ═══ 상수 ═══
const CATEGORIES = PRODUCT_CATEGORIES.map((c) => ({
  id: c.id, label: c.label, icon: c.icon,
  subs: c.subs.map((s) => ({ id: s.id, title: s.title })),
}));

const ORDER_TYPES: { id: OrderType; label: string }[] = [
  { id: "banner", label: "현수막/배너" }, { id: "poster", label: "포스터/전단지" },
  { id: "leaflet", label: "리플렛" }, { id: "sticker", label: "스티커" },
  { id: "namecard", label: "명함" }, { id: "envelope", label: "봉투" },
  { id: "inquiry", label: "맞춤견적" },
];

const BADGE_OPTIONS = [
  { id: "", label: "없음" }, { id: "BEST", label: "BEST" },
  { id: "NEW", label: "NEW" }, { id: "HOT", label: "HOT" },
];

// ═══ 이미지 업로드 함수 ═══
async function uploadProductImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch("/api/upload/product", { method: "POST", body: formData });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "업로드 실패" }));
    throw new Error(err.error ?? "업로드 실패");
  }
  const data = await res.json();
  return data.url;
}

// ═══ 서브탭 타입 ═══
type SubTab = "products" | "orderforms";

// ═══════════════════════════════════════════
// 메인 컴포넌트
// ═══════════════════════════════════════════
export default function ProductManager() {
  const [subTab, setSubTab] = useState<SubTab>("products");

  return (
    <div>
      {/* 서브탭 */}
      <div className="flex gap-1 mb-6 bg-gray-100 rounded-lg p-1 w-fit">
        <button onClick={() => setSubTab("products")}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            subTab === "products" ? "bg-white shadow-sm text-gray-900" : "text-gray-500 hover:text-gray-700"
          }`}>
          <Package size={14} /> 제품 관리
        </button>
        <button onClick={() => setSubTab("orderforms")}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            subTab === "orderforms" ? "bg-white shadow-sm text-gray-900" : "text-gray-500 hover:text-gray-700"
          }`}>
          <Settings2 size={14} /> 주문폼 설정
        </button>
      </div>

      {subTab === "products" && <ProductListPanel />}
      {subTab === "orderforms" && <OrderFormPanel />}
    </div>
  );
}

// ═══════════════════════════════════════════
// 제품 목록 패널
// ═══════════════════════════════════════════
function ProductListPanel() {
  const [products, setProducts] = useState<FirestoreProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCats, setExpandedCats] = useState<Set<string>>(new Set());
  const [expandedSubs, setExpandedSubs] = useState<Set<string>>(new Set());
  const [editProduct, setEditProduct] = useState<FirestoreProduct | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [addTarget, setAddTarget] = useState<{ categoryId: string; subId: string } | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<FirestoreProduct | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const loadProducts = useCallback(async () => {
    setLoading(true);
    try { setProducts(await getAllProducts()); }
    catch { showToast("제품 데이터를 불러오지 못했습니다.", "error"); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { loadProducts(); }, [loadProducts]);

  const handleSeed = async () => {
    if (!confirm("기존 상품 데이터를 Firestore에 동기화합니다. 계속할까요?")) return;
    setSeeding(true);
    try {
      const count = await seedProductsFromConstants();
      showToast(`${count}개 제품이 동기화되었습니다.`);
      await loadProducts();
    } catch { showToast("동기화에 실패했습니다.", "error"); }
    finally { setSeeding(false); }
  };

  const handleToggleActive = async (product: FirestoreProduct) => {
    try {
      await toggleProductActive(product.id, !product.isActive);
      setProducts((prev) => prev.map((p) => (p.id === product.id ? { ...p, isActive: !p.isActive } : p)));
    } catch { showToast("상태 변경 실패", "error"); }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteProduct(deleteTarget.id);
      setProducts((prev) => prev.filter((p) => p.id !== deleteTarget.id));
      showToast(`${deleteTarget.name} 삭제 완료`);
      setDeleteTarget(null);
    } catch { showToast("삭제 실패", "error"); }
    finally { setDeleting(false); }
  };

  const filtered = searchQuery.trim()
    ? products.filter((p) => p.name.includes(searchQuery) || p.description.includes(searchQuery) || p.productId.includes(searchQuery))
    : products;

  const getSubProducts = (catId: string, subId: string) => filtered.filter((p) => p.categoryId === catId && p.subId === subId);
  const getCatCount = (catId: string) => filtered.filter((p) => p.categoryId === catId).length;

  const toggle = (set: React.Dispatch<React.SetStateAction<Set<string>>>, id: string) =>
    set((prev) => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });

  if (loading) return <div className="flex justify-center py-20"><Loader2 size={32} className="animate-spin text-primary-600" /></div>;

  return (
    <div>
      {/* 툴바 */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="제품명, 설명, ID로 검색..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary-500 bg-white" />
        </div>
        <button onClick={handleSeed} disabled={seeding}
          className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50">
          {seeding ? <Loader2 size={14} className="animate-spin" /> : <Database size={14} />}
          {seeding ? "동기화 중..." : "초기 데이터 동기화"}
        </button>
      </div>

      {/* 통계 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { val: products.length, label: "전체 제품", color: "text-gray-900" },
          { val: products.filter((p) => p.isActive).length, label: "활성", color: "text-green-600" },
          { val: products.filter((p) => !p.isActive).length, label: "비활성", color: "text-gray-400" },
          { val: CATEGORIES.length, label: "카테고리", color: "text-blue-600" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-lg border border-gray-100 p-3 text-center">
            <p className={`text-2xl font-bold ${s.color}`}>{s.val}</p>
            <p className="text-xs text-gray-500">{s.label}</p>
          </div>
        ))}
      </div>

      {/* 빈 상태 */}
      {products.length === 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-6 text-center">
          <AlertCircle size={32} className="mx-auto mb-3 text-amber-500" />
          <p className="font-bold text-amber-800 mb-1">등록된 제품이 없습니다</p>
          <p className="text-sm text-amber-600 mb-4">&ldquo;초기 데이터 동기화&rdquo; 버튼을 눌러 기본 제품 데이터를 불러오세요.</p>
        </div>
      )}

      {/* 카테고리 아코디언 */}
      <div className="space-y-3">
        {CATEGORIES.map((cat) => (
          <div key={cat.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <button onClick={() => toggle(setExpandedCats, cat.id)}
              className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50 transition-colors">
              <span className="text-lg">{cat.icon}</span>
              <span className="font-bold text-gray-900 text-sm">{cat.label}</span>
              <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{getCatCount(cat.id)}개</span>
              <div className="ml-auto">
                {expandedCats.has(cat.id) ? <ChevronDown size={16} className="text-gray-400" /> : <ChevronRight size={16} className="text-gray-400" />}
              </div>
            </button>
            {expandedCats.has(cat.id) && (
              <div className="border-t border-gray-100">
                {cat.subs.map((sub) => {
                  const subKey = `${cat.id}-${sub.id}`;
                  const subProds = getSubProducts(cat.id, sub.id);
                  return (
                    <div key={sub.id} className="border-b border-gray-50 last:border-b-0">
                      <div className="flex items-center">
                        <button onClick={() => toggle(setExpandedSubs, subKey)}
                          className="flex-1 flex items-center gap-2 px-6 py-2.5 hover:bg-gray-50 transition-colors text-left">
                          {expandedSubs.has(subKey) ? <ChevronDown size={14} className="text-gray-400" /> : <ChevronRight size={14} className="text-gray-400" />}
                          <span className="text-sm font-medium text-gray-700">{sub.title}</span>
                          <span className="text-xs text-gray-400">({subProds.length})</span>
                        </button>
                        <button onClick={() => { setAddTarget({ categoryId: cat.id, subId: sub.id }); setShowAddModal(true); }}
                          className="mr-4 flex items-center gap-1 text-xs text-primary-600 hover:text-primary-700 font-medium px-2 py-1 rounded hover:bg-primary-50">
                          <Plus size={12} /> 제품 추가
                        </button>
                      </div>
                      {expandedSubs.has(subKey) && (
                        <div className="px-4 pb-3">
                          {subProds.length === 0
                            ? <p className="text-xs text-gray-400 text-center py-4">등록된 제품이 없습니다</p>
                            : <div className="space-y-1.5">
                                {subProds.map((p) => (
                                  <ProductRow key={p.id} product={p}
                                    onEdit={() => setEditProduct(p)}
                                    onDelete={() => setDeleteTarget(p)}
                                    onToggle={() => handleToggleActive(p)} />
                                ))}
                              </div>
                          }
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 모달들 */}
      {editProduct && (
        <ProductModal mode="edit" initial={editProduct}
          onSave={async (data) => {
            await updateProduct(data.id!, data);
            setProducts((prev) => prev.map((p) => (p.id === data.id ? { ...p, ...data } : p)));
            setEditProduct(null);
            showToast(`${data.name} 수정 완료`);
          }}
          onClose={() => setEditProduct(null)} />
      )}
      {showAddModal && addTarget && (
        <ProductModal mode="add" categoryId={addTarget.categoryId} subId={addTarget.subId} totalCount={products.length}
          onSave={async (data) => {
            const docId = await addProduct(data as any);
            setProducts((prev) => [...prev, { ...data, id: docId, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() } as FirestoreProduct]);
            setShowAddModal(false); setAddTarget(null);
            showToast(`${data.name} 추가 완료`);
          }}
          onClose={() => { setShowAddModal(false); setAddTarget(null); }} />
      )}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setDeleteTarget(null)} />
          <div className="relative bg-white rounded-lg shadow-xl w-full max-w-sm p-6">
            <h3 className="font-bold text-gray-900 mb-2">제품 삭제</h3>
            <p className="text-sm text-gray-600 mb-4"><span className="font-bold text-red-600">{deleteTarget.name}</span>을(를) 정말 삭제하시겠습니까?</p>
            <div className="flex gap-2">
              <button onClick={() => setDeleteTarget(null)} className="flex-1 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50">취소</button>
              <button onClick={handleDelete} disabled={deleting}
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-semibold disabled:opacity-50 flex items-center justify-center gap-2">
                {deleting ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />} {deleting ? "삭제 중..." : "삭제"}
              </button>
            </div>
          </div>
        </div>
      )}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 ${toast.type === "success" ? "bg-green-600" : "bg-red-600"} text-white px-5 py-3 rounded-lg shadow-xl flex items-center gap-2 text-sm font-medium`}>
          {toast.type === "success" ? <Check size={16} /> : <AlertCircle size={16} />} {toast.msg}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════
// 제품 행
// ═══════════════════════════════════════════
function ProductRow({ product, onEdit, onDelete, onToggle }: {
  product: FirestoreProduct; onEdit: () => void; onDelete: () => void; onToggle: () => void;
}) {
  return (
    <div className={`flex items-center gap-3 px-3 py-2.5 rounded-lg border transition-colors ${
      product.isActive ? "border-gray-100 bg-white hover:bg-gray-50" : "border-gray-100 bg-gray-50 opacity-60"}`}>
      <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-gray-200">
        {product.thumbnail
          ? <img src={product.thumbnail} alt={product.name} className="w-full h-full object-cover" />
          : <div className={`w-full h-full bg-gradient-to-br ${product.color ?? "from-gray-300 to-gray-400"} flex items-center justify-center`}><Package size={14} className="text-white/70" /></div>
        }
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-medium text-gray-900 truncate">{product.name}</span>
          {product.badge && <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${product.badge === "BEST" ? "bg-red-100 text-red-600" : product.badge === "NEW" ? "bg-blue-100 text-blue-600" : "bg-amber-100 text-amber-600"}`}>{product.badge}</span>}
          {!product.isActive && <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-gray-200 text-gray-500">비활성</span>}
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <span className="font-mono">{product.productId}</span>
          <span>·</span><span>{product.orderType}</span>
          {product.startPrice && <><span>·</span><span className="text-primary-600">{product.startPrice.toLocaleString()}원~</span></>}
        </div>
      </div>
      <div className="flex items-center gap-1 shrink-0">
        <button onClick={onToggle} title={product.isActive ? "비활성화" : "활성화"}
          className={`p-1.5 rounded-lg transition-colors ${product.isActive ? "text-green-600 hover:bg-green-50" : "text-gray-400 hover:bg-gray-100"}`}>
          {product.isActive ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
        </button>
        <button onClick={onEdit} className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50"><Pencil size={14} /></button>
        <button onClick={onDelete} className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50"><Trash2 size={14} /></button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// 제품 추가/수정 모달 (이미지 업로드 포함)
// ═══════════════════════════════════════════
function ProductModal({ mode, initial, categoryId, subId, totalCount, onSave, onClose }: {
  mode: "add" | "edit";
  initial?: FirestoreProduct;
  categoryId?: string;
  subId?: string;
  totalCount?: number;
  onSave: (data: any) => Promise<void>;
  onClose: () => void;
}) {
  const cat = CATEGORIES.find((c) => c.id === (categoryId ?? initial?.categoryId));
  const sub = cat?.subs.find((s) => s.id === (subId ?? initial?.subId));

  const [form, setForm] = useState(() => {
    if (initial) return { ...initial };
    return {
      id: undefined as string | undefined,
      productId: `${categoryId}-new-${Date.now()}`,
      categoryId: categoryId ?? "",
      subId: subId ?? "",
      name: "", description: "",
      thumbnail: null as string | null,
      color: "from-gray-400 to-gray-500",
      badge: null as string | null,
      startPrice: null as number | null,
      orderType: categoryId === "banner" ? "banner" : categoryId === "print" ? "poster" : "inquiry",
      sortOrder: totalCount ?? 0,
      isActive: true,
    };
  });

  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const set = (key: string, val: any) => setForm((p) => ({ ...p, [key]: val }));

  // ── 이미지 업로드 ──
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = "";
    setUploading(true);
    try {
      const url = await uploadProductImage(file);
      set("thumbnail", url);
    } catch (err: any) {
      alert(err.message ?? "이미지 업로드 실패");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!form.name.trim()) { alert("제품명을 입력해주세요."); return; }
    if (!form.productId.trim()) { alert("제품 ID를 입력해주세요."); return; }
    setSaving(true);
    try { await onSave(form); } catch { alert("저장 실패"); }
    finally { setSaving(false); }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden">
        {/* 헤더 */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
          <div>
            <h2 className="font-bold text-gray-900">{mode === "add" ? "제품 추가" : "제품 수정"}</h2>
            {cat && sub && <p className="text-xs text-gray-400 mt-0.5">{cat.icon} {cat.label} &gt; {sub.title}</p>}
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg text-gray-400"><X size={18} /></button>
        </div>

        {/* 폼 */}
        <div className="overflow-y-auto flex-1 p-6 space-y-4">
          {/* ── 이미지 업로드 영역 ── */}
          <div>
            <label className="text-xs font-semibold text-gray-500 block mb-2">제품 이미지</label>
            <div className="flex gap-4 items-start">
              {/* 미리보기 */}
              <div className="w-24 h-24 rounded-xl border-2 border-dashed border-gray-200 overflow-hidden shrink-0 relative group">
                {form.thumbnail ? (
                  <>
                    <img src={form.thumbnail} alt="미리보기" className="w-full h-full object-cover" />
                    <button type="button" onClick={() => set("thumbnail", null)}
                      className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <X size={20} className="text-white" />
                    </button>
                  </>
                ) : (
                  <div className={`w-full h-full bg-gradient-to-br ${form.color ?? "from-gray-300 to-gray-400"} flex items-center justify-center`}>
                    <ImageIcon size={24} className="text-white/50" />
                  </div>
                )}
              </div>
              <div className="flex-1 space-y-2">
                <button type="button" onClick={() => fileRef.current?.click()} disabled={uploading}
                  className="w-full flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50 transition-colors">
                  {uploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
                  {uploading ? "업로드 중..." : "이미지 업로드"}
                </button>
                <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp,image/gif" className="hidden" onChange={handleImageUpload} />
                <p className="text-[10px] text-gray-400">JPG, PNG, WEBP, GIF · 최대 5MB</p>
                {/* 직접 URL 입력 */}
                <input type="text" value={form.thumbnail ?? ""} onChange={(e) => set("thumbnail", e.target.value || null)}
                  placeholder="또는 이미지 URL 직접 입력"
                  className="w-full px-3 py-1.5 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-primary-500" />
              </div>
            </div>
          </div>

          {/* 그라디언트 색상 */}
          <div>
            <label className="text-xs font-semibold text-gray-500 block mb-1">배경 그라디언트 (이미지 없을 때)</label>
            <input type="text" value={form.color ?? ""} onChange={(e) => set("color", e.target.value || null)}
              placeholder="from-blue-400 to-indigo-500"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-mono focus:outline-none focus:border-primary-500" />
          </div>

          {/* 제품 ID */}
          <div>
            <label className="text-xs font-semibold text-gray-500 block mb-1">제품 ID *</label>
            <input type="text" value={form.productId} onChange={(e) => set("productId", e.target.value)}
              placeholder="banner-basic"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-mono focus:outline-none focus:border-primary-500" />
          </div>

          {/* 제품명 */}
          <div>
            <label className="text-xs font-semibold text-gray-500 block mb-1">제품명 *</label>
            <input type="text" value={form.name} onChange={(e) => set("name", e.target.value)}
              placeholder="기본 현수막"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary-500" />
          </div>

          {/* 설명 */}
          <div>
            <label className="text-xs font-semibold text-gray-500 block mb-1">제품 설명</label>
            <textarea value={form.description} onChange={(e) => set("description", e.target.value)}
              placeholder="제품에 대한 간단한 설명" rows={2}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary-500 resize-none" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-500 block mb-1">주문 유형</label>
              <select value={form.orderType} onChange={(e) => set("orderType", e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary-500 bg-white">
                {ORDER_TYPES.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 block mb-1">뱃지</label>
              <select value={form.badge ?? ""} onChange={(e) => set("badge", e.target.value || null)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary-500 bg-white">
                {BADGE_OPTIONS.map((b) => <option key={b.id} value={b.id}>{b.label}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-500 block mb-1">시작 가격 (원)</label>
              <input type="number" value={form.startPrice ?? ""} onChange={(e) => set("startPrice", e.target.value ? Number(e.target.value) : null)}
                placeholder="5000" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary-500" />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 block mb-1">정렬 순서</label>
              <input type="number" value={form.sortOrder} onChange={(e) => set("sortOrder", Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary-500" />
            </div>
          </div>

          {/* 활성 상태 */}
          <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
            <button type="button" onClick={() => set("isActive", !form.isActive)}
              className={form.isActive ? "text-green-600" : "text-gray-400"}>
              {form.isActive ? <ToggleRight size={24} /> : <ToggleLeft size={24} />}
            </button>
            <div>
              <p className="text-sm font-medium text-gray-900">{form.isActive ? "활성 상태" : "비활성 상태"}</p>
              <p className="text-xs text-gray-400">{form.isActive ? "고객에게 표시됩니다" : "고객에게 숨겨집니다"}</p>
            </div>
          </div>
        </div>

        {/* 푸터 */}
        <div className="px-6 py-4 border-t border-gray-100 flex gap-2 shrink-0">
          <button onClick={onClose} className="flex-1 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50">취소</button>
          <button onClick={handleSave} disabled={saving}
            className="flex-1 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-semibold disabled:opacity-50 flex items-center justify-center gap-2">
            {saving ? <Loader2 size={14} className="animate-spin" /> : mode === "add" ? <Plus size={14} /> : <Save size={14} />}
            {saving ? "저장 중..." : mode === "add" ? "제품 추가" : "저장"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// 주문폼 설정 패널
// ═══════════════════════════════════════════
function OrderFormPanel() {
  const [forms, setForms] = useState<Record<string, FirestoreOrderForm>>({});
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);
  const [editType, setEditType] = useState<string | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      try { setForms(await getAllOrderForms()); }
      catch { showToast("주문폼 데이터를 불러오지 못했습니다.", "error"); }
      finally { setLoading(false); }
    })();
  }, []);

  const handleSeed = async () => {
    if (!confirm("기본 주문폼 설정을 Firestore에 동기화합니다. 계속할까요?")) return;
    setSeeding(true);
    try {
      const count = await seedOrderFormsFromConstants();
      setForms(await getAllOrderForms());
      showToast(`${count}개 주문폼이 동기화되었습니다.`);
    } catch { showToast("동기화 실패", "error"); }
    finally { setSeeding(false); }
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 size={32} className="animate-spin text-primary-600" /></div>;

  const formList = ORDER_TYPES.map((t) => ({
    ...t,
    config: forms[t.id] ?? null,
  }));

  return (
    <div>
      {/* 툴바 */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-gray-500">각 주문 유형별 입력 폼(옵션, 수량, 가격 등)을 관리합니다.</p>
        <button onClick={handleSeed} disabled={seeding}
          className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50">
          {seeding ? <Loader2 size={14} className="animate-spin" /> : <Database size={14} />}
          {seeding ? "동기화 중..." : "초기 데이터 동기화"}
        </button>
      </div>

      {/* 주문폼 카드 목록 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {formList.map(({ id, label, config }) => (
          <div key={id} className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-bold text-gray-900 text-sm">{label}</h3>
                <p className="text-xs text-gray-400 font-mono">{id}</p>
              </div>
              <button onClick={() => setEditType(id)}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-primary-600 border border-primary-200 rounded-lg hover:bg-primary-50 transition-colors">
                <Pencil size={12} /> 편집
              </button>
            </div>
            {config ? (
              <div className="space-y-1.5 text-xs text-gray-600">
                <p>입력 항목: <span className="font-semibold text-gray-900">{config.specs?.length ?? 0}개</span></p>
                <p>수량 프리셋: <span className="font-mono">{config.quantityPresets?.join(", ") || "없음"}</span></p>
                <p>기본 단가: <span className="font-semibold">{config.basePrice ? `${config.basePrice.toLocaleString()}원` : "없음"}</span></p>
                {config.priceNote && <p className="text-gray-400 truncate">안내: {config.priceNote}</p>}
                {config.hasSizeInput && <span className="inline-block bg-blue-100 text-blue-600 text-[10px] font-bold px-1.5 py-0.5 rounded">사이즈 입력</span>}
              </div>
            ) : (
              <p className="text-xs text-amber-600">아직 설정되지 않았습니다. &ldquo;초기 데이터 동기화&rdquo;를 실행하세요.</p>
            )}
          </div>
        ))}
      </div>

      {/* 편집 모달 */}
      {editType && forms[editType] && (
        <OrderFormEditModal
          type={editType}
          config={forms[editType]}
          onSave={async (updated) => {
            await saveOrderForm(editType, updated);
            setForms((prev) => ({ ...prev, [editType]: { ...updated, updatedAt: new Date().toISOString() } }));
            setEditType(null);
            showToast(`${updated.label} 주문폼 저장 완료`);
          }}
          onClose={() => setEditType(null)}
        />
      )}

      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 ${toast.type === "success" ? "bg-green-600" : "bg-red-600"} text-white px-5 py-3 rounded-lg shadow-xl flex items-center gap-2 text-sm font-medium`}>
          {toast.type === "success" ? <Check size={16} /> : <AlertCircle size={16} />} {toast.msg}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════
// 주문폼 편집 모달
// ═══════════════════════════════════════════
function OrderFormEditModal({ type, config, onSave, onClose }: {
  type: string;
  config: FirestoreOrderForm;
  onSave: (data: FirestoreOrderForm) => Promise<void>;
  onClose: () => void;
}) {
  const [form, setForm] = useState<FirestoreOrderForm>(JSON.parse(JSON.stringify(config)));
  const [saving, setSaving] = useState(false);

  // ── 스펙 조작 ──
  const addSpec = () => {
    setForm((prev) => ({
      ...prev,
      specs: [...(prev.specs ?? []), { id: `spec-${Date.now()}`, label: "새 항목", options: [{ id: "opt-1", label: "옵션 1" }] }],
    }));
  };

  const removeSpec = (idx: number) => {
    setForm((prev) => ({ ...prev, specs: prev.specs.filter((_, i) => i !== idx) }));
  };

  const updateSpec = (idx: number, key: string, val: any) => {
    setForm((prev) => {
      const specs = [...prev.specs];
      specs[idx] = { ...specs[idx], [key]: val };
      return { ...prev, specs };
    });
  };

  // ── 옵션 조작 ──
  const addOption = (specIdx: number) => {
    setForm((prev) => {
      const specs = [...prev.specs];
      specs[specIdx] = {
        ...specs[specIdx],
        options: [...specs[specIdx].options, { id: `opt-${Date.now()}`, label: "새 옵션" }],
      };
      return { ...prev, specs };
    });
  };

  const removeOption = (specIdx: number, optIdx: number) => {
    setForm((prev) => {
      const specs = [...prev.specs];
      specs[specIdx] = {
        ...specs[specIdx],
        options: specs[specIdx].options.filter((_, i) => i !== optIdx),
      };
      return { ...prev, specs };
    });
  };

  const updateOption = (specIdx: number, optIdx: number, key: string, val: any) => {
    setForm((prev) => {
      const specs = [...prev.specs];
      const options = [...specs[specIdx].options];
      options[optIdx] = { ...options[optIdx], [key]: val };
      specs[specIdx] = { ...specs[specIdx], options };
      return { ...prev, specs };
    });
  };

  // ── 수량 프리셋 ──
  const [presetInput, setPresetInput] = useState("");
  const addPreset = () => {
    const num = parseInt(presetInput);
    if (isNaN(num) || num <= 0) return;
    setForm((prev) => ({
      ...prev,
      quantityPresets: [...(prev.quantityPresets ?? []), num].sort((a, b) => a - b),
    }));
    setPresetInput("");
  };
  const removePreset = (idx: number) => {
    setForm((prev) => ({ ...prev, quantityPresets: (prev.quantityPresets ?? []).filter((_, i) => i !== idx) }));
  };

  const handleSave = async () => {
    setSaving(true);
    try { await onSave(form); } catch { alert("저장 실패"); }
    finally { setSaving(false); }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[92vh] flex flex-col overflow-hidden">
        {/* 헤더 */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
          <div>
            <h2 className="font-bold text-gray-900">주문폼 편집</h2>
            <p className="text-xs text-gray-400 mt-0.5">{form.label} <span className="font-mono">({type})</span></p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg text-gray-400"><X size={18} /></button>
        </div>

        {/* 폼 */}
        <div className="overflow-y-auto flex-1 p-6 space-y-6">

          {/* 기본 설정 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-500 block mb-1">폼 이름</label>
              <input type="text" value={form.label} onChange={(e) => setForm((p) => ({ ...p, label: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary-500" />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 block mb-1">수량 단위</label>
              <input type="text" value={form.quantityUnit ?? ""} onChange={(e) => setForm((p) => ({ ...p, quantityUnit: e.target.value }))}
                placeholder="개, 매, 부, 장..."
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary-500" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-500 block mb-1">기본 단가 (원)</label>
              <input type="number" value={form.basePrice ?? ""} onChange={(e) => setForm((p) => ({ ...p, basePrice: e.target.value ? Number(e.target.value) : undefined }))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary-500" />
            </div>
            <div className="flex items-end gap-2">
              <label className="flex items-center gap-2 p-2.5 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 flex-1">
                <input type="checkbox" checked={form.hasSizeInput ?? false}
                  onChange={(e) => setForm((p) => ({ ...p, hasSizeInput: e.target.checked }))}
                  className="accent-primary-600" />
                <span className="text-sm text-gray-700">사이즈 입력 사용</span>
              </label>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-500 block mb-1">가격 안내 문구</label>
            <input type="text" value={form.priceNote ?? ""} onChange={(e) => setForm((p) => ({ ...p, priceNote: e.target.value }))}
              placeholder="100매 기준, 사이즈·용지에 따라 변동됩니다."
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary-500" />
          </div>

          {/* 수량 프리셋 */}
          <div>
            <label className="text-xs font-semibold text-gray-500 block mb-2">수량 프리셋</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {(form.quantityPresets ?? []).map((q, i) => (
                <span key={i} className="flex items-center gap-1 bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-lg">
                  {q.toLocaleString()}
                  <button onClick={() => removePreset(i)} className="text-gray-400 hover:text-red-500 ml-1"><X size={12} /></button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input type="number" value={presetInput} onChange={(e) => setPresetInput(e.target.value)}
                placeholder="수량 입력" onKeyDown={(e) => e.key === "Enter" && addPreset()}
                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary-500" />
              <button onClick={addPreset}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors">
                추가
              </button>
            </div>
          </div>

          {/* ══ 입력 항목(Specs) 관리 ══ */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-semibold text-gray-500">입력 항목 (Specs)</label>
              <button onClick={addSpec}
                className="flex items-center gap-1 text-xs text-primary-600 font-medium px-2 py-1 rounded hover:bg-primary-50">
                <Plus size={12} /> 항목 추가
              </button>
            </div>

            <div className="space-y-4">
              {(form.specs ?? []).map((spec, sIdx) => (
                <div key={sIdx} className="border border-gray-200 rounded-lg overflow-hidden">
                  {/* Spec 헤더 */}
                  <div className="bg-gray-50 px-4 py-3 flex items-center gap-3">
                    <div className="flex-1 grid grid-cols-2 gap-2">
                      <input type="text" value={spec.id} onChange={(e) => updateSpec(sIdx, "id", e.target.value)}
                        placeholder="spec ID" className="px-2 py-1 border border-gray-200 rounded text-xs font-mono focus:outline-none focus:border-primary-500" />
                      <input type="text" value={spec.label} onChange={(e) => updateSpec(sIdx, "label", e.target.value)}
                        placeholder="표시 이름" className="px-2 py-1 border border-gray-200 rounded text-xs focus:outline-none focus:border-primary-500" />
                    </div>
                    <button onClick={() => removeSpec(sIdx)}
                      className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded">
                      <Trash2 size={14} />
                    </button>
                  </div>

                  {/* 옵션 리스트 */}
                  <div className="px-4 py-3 space-y-2">
                    {spec.options.map((opt, oIdx) => (
                      <div key={oIdx} className="flex items-center gap-2">
                        <input type="text" value={opt.id} onChange={(e) => updateOption(sIdx, oIdx, "id", e.target.value)}
                          placeholder="ID" className="w-24 px-2 py-1.5 border border-gray-200 rounded text-xs font-mono focus:outline-none focus:border-primary-500" />
                        <input type="text" value={opt.label} onChange={(e) => updateOption(sIdx, oIdx, "label", e.target.value)}
                          placeholder="옵션명" className="flex-1 px-2 py-1.5 border border-gray-200 rounded text-xs focus:outline-none focus:border-primary-500" />
                        <input type="text" value={opt.pricePerUnit ?? ""} onChange={(e) => updateOption(sIdx, oIdx, "pricePerUnit", e.target.value || undefined)}
                          placeholder="가격정보" className="w-24 px-2 py-1.5 border border-gray-200 rounded text-xs focus:outline-none focus:border-primary-500" />
                        <input type="number" value={opt.price ?? ""} onChange={(e) => updateOption(sIdx, oIdx, "price", e.target.value ? Number(e.target.value) : undefined)}
                          placeholder="가격" className="w-20 px-2 py-1.5 border border-gray-200 rounded text-xs focus:outline-none focus:border-primary-500" />
                        <button onClick={() => removeOption(sIdx, oIdx)}
                          className="p-1 text-gray-400 hover:text-red-500 shrink-0"><X size={14} /></button>
                      </div>
                    ))}
                    <button onClick={() => addOption(sIdx)}
                      className="flex items-center gap-1 text-xs text-gray-500 hover:text-primary-600 font-medium px-2 py-1 rounded hover:bg-gray-50">
                      <Plus size={11} /> 옵션 추가
                    </button>
                  </div>
                </div>
              ))}

              {(form.specs ?? []).length === 0 && (
                <p className="text-xs text-gray-400 text-center py-4">입력 항목이 없습니다. &ldquo;항목 추가&rdquo;를 눌러 추가하세요.</p>
              )}
            </div>
          </div>
        </div>

        {/* 푸터 */}
        <div className="px-6 py-4 border-t border-gray-100 flex gap-2 shrink-0">
          <button onClick={onClose} className="flex-1 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50">취소</button>
          <button onClick={handleSave} disabled={saving}
            className="flex-1 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-semibold disabled:opacity-50 flex items-center justify-center gap-2">
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            {saving ? "저장 중..." : "저장"}
          </button>
        </div>
      </div>
    </div>
  );
}
