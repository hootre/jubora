"use client";
import { useEffect, useState, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signInWithEmailAndPassword, GoogleAuthProvider, signInWithRedirect, getRedirectResult } from "firebase/auth";
import { createOrder } from "@/lib/firestore";
import { calcPrice, MATERIALS, OPTIONS, PRODUCT_TYPES } from "@/constants/pricing";
import { getProductById, ORDER_FORM_CONFIGS, type OrderType, type OrderFormConfig, type ProductSpec } from "@/constants/products";
import { SAMPLE_TEMPLATES, TEMPLATE_CATEGORIES } from "@/lib/templates";
import {
  Package, MapPin, MessageSquare, CreditCard, Loader2, ImagePlus, RefreshCw,
  LayoutTemplate, X, Check, LogIn, Mail, Eye, EyeOff, User, Phone, Search,
  ChevronRight, FileText, Info
} from "lucide-react";

const DRAFT_KEY = "jubora_order_drafts";

function saveDraft(draftId: string, data: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  try {
    const drafts = JSON.parse(localStorage.getItem(DRAFT_KEY) ?? "[]");
    const idx = drafts.findIndex((d: any) => d.id === draftId);
    const entry = { ...data, id: draftId, savedAt: new Date().toISOString() };
    if (idx >= 0) drafts[idx] = entry; else drafts.unshift(entry);
    localStorage.setItem(DRAFT_KEY, JSON.stringify(drafts.slice(0, 10)));
  } catch {}
}

export default function OrderPage() {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 size={36} className="animate-spin text-primary-600" />
      </div>
    }>
      <OrderForm />
    </Suspense>
  );
}

// ═══════════════════════════════════════════════════
// 예상 가격 계산 (banner 이외 타입)
// ═══════════════════════════════════════════════════
function estimatePrice(config: OrderFormConfig, specs: Record<string, string>, quantity: number): number {
  if (!config.basePrice) return 0;
  let price = config.basePrice * quantity;

  // 용지 등급에 따른 배율
  const paperSpec = specs["paper"];
  if (paperSpec) {
    const paperConfig = config.specs.find(s => s.id === "paper");
    const opt = paperConfig?.options.find(o => o.id === paperSpec);
    if (opt?.pricePerUnit) {
      const match = opt.pricePerUnit.match(/\+(\d+)%/);
      if (match) price *= (1 + parseInt(match[1]) / 100);
    }
  }

  // 양면 인쇄
  if (specs["sides"] === "double") price *= 1.5;

  // 코팅
  const coatingSpec = specs["coating"];
  if (coatingSpec && coatingSpec !== "none") {
    const coatingConfig = config.specs.find(s => s.id === "coating");
    const opt = coatingConfig?.options.find(o => o.id === coatingSpec);
    if (opt?.pricePerUnit) {
      const match = opt.pricePerUnit.match(/\+(\d+)%/);
      if (match) price *= (1 + parseInt(match[1]) / 100);
    }
  }

  return Math.ceil(price);
}

// ═══════════════════════════════════════════════════
// 메인 주문 폼
// ═══════════════════════════════════════════════════
function OrderForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL 파라미터
  const productParam = searchParams.get("product") ?? "";
  const modeParam = searchParams.get("mode") ?? "";
  const templateId = searchParams.get("template") ?? "";
  const imgParam = searchParams.get("img") ?? "";
  const draftId = searchParams.get("draft") ?? `draft-${Date.now()}`;

  // 제품 정보 조회
  const productInfo = productParam ? getProductById(productParam) : undefined;
  const orderType: OrderType = modeParam === "inquiry"
    ? "inquiry"
    : productInfo?.product.orderType ?? "banner";
  const formConfig = ORDER_FORM_CONFIGS[orderType];

  const replaceInputRef = useRef<HTMLInputElement>(null);
  const attachInputRef = useRef<HTMLInputElement>(null);

  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [modalCat, setModalCat] = useState("all");
  const [showLoginModal, setShowLoginModal] = useState(false);

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // 선택된 이미지
  const [selectedImage, setSelectedImage] = useState<string>(imgParam ? decodeURIComponent(imgParam) : "");
  const [selectedImageName, setSelectedImageName] = useState<string>(imgParam ? "선택한 시안" : "");
  const [attachedFiles, setAttachedFiles] = useState<{ name: string; dataUrl: string }[]>([]);

  // ── 공통 폼 상태 ──
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [address, setAddress] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [memo, setMemo] = useState("");
  const [requirements, setRequirements] = useState("");

  // ── Banner 전용 상태 ──
  const [bannerType, setBannerType] = useState("horizontal");
  const [bannerMaterial, setBannerMaterial] = useState("cloth");
  const [bannerWidth, setBannerWidth] = useState(200);
  const [bannerHeight, setBannerHeight] = useState(60);
  const [bannerQty, setBannerQty] = useState(1);
  const [bannerOptions, setBannerOptions] = useState<string[]>(["punching"]);

  // ── 일반(Non-banner) 전용 상태 ──
  const [specs, setSpecs] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(formConfig.quantityPresets?.[0] ?? 100);

  // ── Sticker 사이즈 (hasSizeInput) ──
  const [customWidth, setCustomWidth] = useState(50);
  const [customHeight, setCustomHeight] = useState(50);

  // specs 초기값 설정
  useEffect(() => {
    if (formConfig.specs.length > 0) {
      const initial: Record<string, string> = {};
      formConfig.specs.forEach(spec => {
        if (spec.options.length > 0) {
          initial[spec.id] = spec.options[0].id;
        }
      });
      setSpecs(initial);
    }
  }, [orderType]); // eslint-disable-line

  const ORDER_FORM_BACKUP_KEY = "jubora_order_form_backup";

  useEffect(() => {
    getRedirectResult(auth).then((result) => {
      if (result?.user) { setUser(result.user); setShowLoginModal(false); }
    }).catch(() => {});

    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u ?? null);
      if (u) {
        setShowLoginModal(false);
        if (!customerName && u.displayName) setCustomerName(u.displayName);
      }
    });

    // 다음 주소검색 API
    if (!document.getElementById("daum-postcode-script")) {
      const script = document.createElement("script");
      script.id = "daum-postcode-script";
      script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
      script.async = true;
      document.head.appendChild(script);
    }

    return () => unsub();
  }, []); // eslint-disable-line

  // ── 가격 계산 ──
  const isBanner = orderType === "banner";
  const isInquiry = orderType === "inquiry";

  const bannerCalc = isBanner
    ? calcPrice(bannerMaterial, bannerWidth, bannerHeight, bannerQty, bannerOptions)
    : { productPrice: 0, deliveryFee: 0, totalPrice: 0 };

  const generalPrice = !isBanner && !isInquiry
    ? estimatePrice(formConfig, specs, quantity)
    : 0;
  const generalDelivery = generalPrice >= 100000 ? 0 : 4000;
  const generalTotal = generalPrice + (isInquiry ? 0 : generalDelivery);

  const displayPrice = isBanner ? bannerCalc : { productPrice: generalPrice, deliveryFee: isInquiry ? 0 : generalDelivery, totalPrice: isInquiry ? 0 : generalTotal };

  // 둘레 (banner 사방 끈처리용)
  const perimeterM = 2 * (bannerWidth + bannerHeight) / 100;

  // ── 다음 주소검색 ──
  const openAddressSearch = () => {
    const daum = (window as any).daum;
    if (!daum?.Postcode) { alert("주소 검색을 불러오는 중입니다. 잠시 후 다시 시도해주세요."); return; }
    new daum.Postcode({
      oncomplete: (data: any) => {
        const addr = data.userSelectedType === "R" ? data.roadAddress : data.jibunAddress;
        setAddress(addr);
        setZipCode(data.zonecode);
      },
    }).open();
  };

  // ── 주문 제출 ──
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) { setShowLoginModal(true); return; }
    if (!customerName.trim()) { alert("주문자 이름을 입력해주세요."); return; }
    if (!customerPhone.trim()) { alert("연락처를 입력해주세요."); return; }
    if (!isInquiry && !address) { alert("배송지를 입력해주세요."); return; }
    setLoading(true);

    try {
      const attachedImageUrls = attachedFiles.map(f => f.dataUrl);

      const productData: any = {
        productId: productParam || undefined,
        productName: productInfo?.product.name ?? (isBanner ? "현수막" : formConfig.label),
        orderType,
        quantity: isBanner ? bannerQty : (isInquiry ? 1 : quantity),
      };

      if (isBanner) {
        productData.type = bannerType;
        productData.material = bannerMaterial;
        productData.width = bannerWidth;
        productData.height = bannerHeight;
        productData.options = bannerOptions;
      } else if (!isInquiry) {
        productData.specs = specs;
        if (formConfig.hasSizeInput && orderType !== "banner") {
          productData.width = customWidth;
          productData.height = customHeight;
        }
      }

      const orderId = await createOrder({
        userId: user.uid,
        userName: customerName.trim(),
        userPhone: customerPhone.trim(),
        userEmail: user.email,
        product: productData,
        design: {
          templateId: templateId || undefined,
          previewImageUrl: selectedImage || undefined,
          userRequirements: requirements,
          attachedImages: attachedImageUrls.length > 0 ? attachedImageUrls : undefined,
        },
        delivery: {
          address: address || "상담 후 확정",
          addressDetail,
          zipCode,
          memo,
        },
        pricing: {
          productPrice: displayPrice.productPrice,
          deliveryFee: displayPrice.deliveryFee,
          totalPrice: displayPrice.totalPrice,
        },
      });

      router.push(`/order/${orderId}/complete`);
    } catch (err) {
      console.error(err);
      alert("주문 처리 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  // ── 이미지 핸들러 ──
  const handleReplaceImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => { setSelectedImage(ev.target?.result as string); setSelectedImageName(file.name); };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleAttachFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    Array.from(files).forEach(file => {
      if (attachedFiles.length >= 5) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        setAttachedFiles(prev => prev.length >= 5 ? prev : [...prev, { name: file.name, dataUrl: ev.target?.result as string }]);
      };
      reader.readAsDataURL(file);
    });
    e.target.value = "";
  };

  const toggleBannerOption = (id: string) => {
    if (id === "punching") return;
    setBannerOptions(prev => prev.includes(id) ? prev.filter(o => o !== id) : [...prev, id]);
  };

  // ── 헤더 제목 ──
  const pageTitle = productInfo
    ? `${productInfo.product.name} ${isInquiry ? "견적문의" : "주문"}`
    : formConfig.label;

  return (
    <div>
      {/* 페이지 히어로 */}
      <div className="bg-gradient-to-r from-primary-700 to-primary-900 text-white py-10 px-4 mb-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-1.5 text-white/50 text-sm mb-2">
            <Link href="/" className="hover:text-white/80">홈</Link>
            <ChevronRight size={12} />
            {productInfo && (
              <>
                <Link href={`/products/${productInfo.category.id}`} className="hover:text-white/80">{productInfo.category.label}</Link>
                <ChevronRight size={12} />
              </>
            )}
            <span className="text-white/80">{isInquiry ? "견적문의" : "주문하기"}</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold">{pageTitle}</h1>
          {productInfo && (
            <p className="text-white/80 text-sm mt-1">{productInfo.product.description}</p>
          )}
          {!productInfo && (
            <p className="text-white/80 text-sm mt-1">옵션을 선택하고 배송 정보를 입력해주세요.</p>
          )}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 pb-10">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">

            {/* ── 디자인 이미지 (inquiry 아닌 경우) ── */}
            {!isInquiry && (
              <div className="card">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-bold text-gray-900 flex items-center gap-2">
                    <ImagePlus size={18} className="text-primary-500" /> 디자인 시안
                  </h2>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => replaceInputRef.current?.click()}
                      className="flex items-center gap-1.5 text-xs px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-600 transition-colors">
                      <RefreshCw size={12} /> 이미지 교체
                    </button>
                    {isBanner && (
                      <button type="button" onClick={() => { setModalCat("all"); setShowTemplateModal(true); }}
                        className="flex items-center gap-1.5 text-xs px-3 py-1.5 border border-primary-300 bg-primary-50 rounded-lg hover:bg-primary-100 text-primary-700 transition-colors">
                        <LayoutTemplate size={12} /> 시안 선택
                      </button>
                    )}
                  </div>
                </div>

                {selectedImage ? (
                  <div className="relative group">
                    <img src={selectedImage} alt="선택한 이미지"
                      className="w-full rounded-lg border border-gray-200 object-contain max-h-56 bg-gray-50" />
                    <button type="button" onClick={() => { setSelectedImage(""); setSelectedImageName(""); }}
                      className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <X size={14} />
                    </button>
                    {selectedImageName && <p className="text-xs text-gray-400 mt-1.5">{selectedImageName}</p>}
                  </div>
                ) : (
                  <div onClick={() => replaceInputRef.current?.click()}
                    className="w-full h-44 border-2 border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center text-gray-400 hover:border-primary-400 hover:text-primary-500 transition-colors cursor-pointer bg-gray-50/50">
                    <ImagePlus size={32} className="mb-2 opacity-60" />
                    <p className="text-sm font-medium">이미지를 업로드해주세요</p>
                    <p className="text-xs mt-0.5">디자인 시안, 로고, 참고 이미지 등</p>
                  </div>
                )}
                <input ref={replaceInputRef} type="file" accept="image/png,image/jpeg,image/webp" className="hidden" onChange={handleReplaceImage} />

                {/* 추가 참고 이미지 */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-gray-700">참고 이미지 첨부 <span className="text-gray-400 font-normal">(최대 5장)</span></p>
                    {attachedFiles.length < 5 && (
                      <button type="button" onClick={() => attachInputRef.current?.click()}
                        className="text-xs px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-600 transition-colors">
                        + 이미지 추가
                      </button>
                    )}
                  </div>
                  {attachedFiles.length > 0 && (
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                      {attachedFiles.map((f, i) => (
                        <div key={i} className="relative group">
                          <img src={f.dataUrl} alt={f.name} className="w-full h-20 rounded-lg border border-gray-200 object-cover bg-gray-50" />
                          <button type="button" onClick={() => setAttachedFiles(prev => prev.filter((_, idx) => idx !== i))}
                            className="absolute -top-1 -right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                            <X size={10} />
                          </button>
                          <p className="text-[10px] text-gray-400 mt-0.5 truncate">{f.name}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  <input ref={attachInputRef} type="file" accept="image/png,image/jpeg,image/webp" multiple className="hidden" onChange={handleAttachFiles} />
                </div>
                <p className="text-xs text-gray-400 mt-2">* 실제 시안은 담당자가 검토 후 카카오톡으로 전달됩니다.</p>
              </div>
            )}

            {/* ══════════════════════════════════════ */}
            {/* 제품 옵션 — 타입별 분기 렌더링 */}
            {/* ══════════════════════════════════════ */}

            {/* ── BANNER 타입 ── */}
            {isBanner && (
              <div className="card">
                <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><Package size={18} /> 제품 옵션</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="label">제품 종류</label>
                    <select className="input" value={bannerType} onChange={(e) => setBannerType(e.target.value)}>
                      {PRODUCT_TYPES.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="label">재질</label>
                    <select className="input" value={bannerMaterial} onChange={(e) => setBannerMaterial(e.target.value)}>
                      {MATERIALS.map((m) => <option key={m.id} value={m.id}>{m.name} (m²당 {m.pricePerM2.toLocaleString()}원)</option>)}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="label">가로 (cm)</label>
                    <input type="number" className="input" value={bannerWidth} min={30} max={2000}
                      onChange={(e) => setBannerWidth(Number(e.target.value))} />
                  </div>
                  <div>
                    <label className="label">세로 (cm)</label>
                    <input type="number" className="input" value={bannerHeight} min={30} max={2000}
                      onChange={(e) => setBannerHeight(Number(e.target.value))} />
                  </div>
                  <div>
                    <label className="label">수량</label>
                    <input type="number" className="input" value={bannerQty} min={1} max={999}
                      onChange={(e) => setBannerQty(Number(e.target.value))} />
                  </div>
                </div>
                <div>
                  <label className="label">마감 옵션</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {OPTIONS.map((opt) => {
                      const isPunching = opt.id === "punching";
                      const priceLabel = opt.type === "perMeter"
                        ? `m당 ${opt.price.toLocaleString()}원 ≈ ${Math.ceil(opt.price * perimeterM).toLocaleString()}원`
                        : opt.price === 0 ? "무료" : `+${opt.price.toLocaleString()}원`;
                      return (
                        <label key={opt.id} className={`flex items-center gap-3 p-3 border rounded-lg transition-colors
                          ${isPunching ? "border-primary-300 bg-primary-50 cursor-default" : "cursor-pointer"}
                          ${!isPunching && bannerOptions.includes(opt.id) ? "border-primary-500 bg-primary-50" : ""}
                          ${!isPunching && !bannerOptions.includes(opt.id) ? "border-gray-200 hover:bg-gray-50" : ""}`}>
                          <input type="checkbox" checked={bannerOptions.includes(opt.id)}
                            onChange={() => toggleBannerOption(opt.id)} disabled={isPunching}
                            className="accent-primary-600" />
                          <span className="text-sm">
                            {opt.name}
                            <span className="text-gray-400 ml-1">({priceLabel})</span>
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* ── INQUIRY 타입 ── */}
            {isInquiry && (
              <div className="card">
                <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><FileText size={18} /> 견적 문의</h2>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4 text-sm text-blue-700 flex items-start gap-2">
                  <Info size={16} className="shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold mb-1">맞춤 견적 문의입니다</p>
                    <p>원하시는 제품의 상세 사양, 수량, 용도 등을 자유롭게 적어주시면 담당자가 확인 후 견적을 안내해드립니다.</p>
                  </div>
                </div>
                {productInfo && (
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <p className="text-sm font-medium text-gray-700">문의 제품</p>
                    <p className="text-lg font-bold text-gray-900 mt-1">{productInfo.product.name}</p>
                    <p className="text-sm text-gray-500">{productInfo.product.description}</p>
                  </div>
                )}

                {/* 참고 이미지 업로드 */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-gray-700">참고 이미지 <span className="text-gray-400 font-normal">(선택, 최대 5장)</span></p>
                    {attachedFiles.length < 5 && (
                      <button type="button" onClick={() => attachInputRef.current?.click()}
                        className="text-xs px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-600 transition-colors">
                        + 이미지 추가
                      </button>
                    )}
                  </div>
                  {attachedFiles.length > 0 && (
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                      {attachedFiles.map((f, i) => (
                        <div key={i} className="relative group">
                          <img src={f.dataUrl} alt={f.name} className="w-full h-20 rounded-lg border border-gray-200 object-cover bg-gray-50" />
                          <button type="button" onClick={() => setAttachedFiles(prev => prev.filter((_, idx) => idx !== i))}
                            className="absolute -top-1 -right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                            <X size={10} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  <input ref={attachInputRef} type="file" accept="image/png,image/jpeg,image/webp" multiple className="hidden" onChange={handleAttachFiles} />
                </div>

                <div>
                  <label className="label">상세 요청사항 *</label>
                  <textarea className="input resize-none h-40" value={requirements}
                    placeholder={`원하시는 제품의 상세 사양을 적어주세요.\n\n예시:\n- 제품: ${productInfo?.product.name ?? "교회 교패"}\n- 수량: 1개\n- 사이즈: 가로 50cm x 세로 30cm\n- 재질/색상: 금색 아크릴\n- 기타: 교회 로고 포함`}
                    onChange={(e) => setRequirements(e.target.value)} required />
                </div>
              </div>
            )}

            {/* ── 일반 타입 (poster, leaflet, sticker, namecard, envelope) ── */}
            {!isBanner && !isInquiry && (
              <div className="card">
                <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><Package size={18} /> 제품 옵션</h2>

                {/* Spec 선택 드롭다운 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  {formConfig.specs.map((spec) => (
                    <div key={spec.id}>
                      <label className="label">{spec.label}</label>
                      <select className="input" value={specs[spec.id] ?? ""}
                        onChange={(e) => setSpecs(prev => ({ ...prev, [spec.id]: e.target.value }))}>
                        {spec.options.map((opt) => (
                          <option key={opt.id} value={opt.id}>
                            {opt.label}{opt.pricePerUnit ? ` (${opt.pricePerUnit})` : ""}{opt.price !== undefined && opt.price > 0 ? ` (+${opt.price.toLocaleString()}원)` : ""}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>

                {/* 커스텀 사이즈 입력 (sticker 등) */}
                {formConfig.hasSizeInput && (
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="label">가로 (mm)</label>
                      <input type="number" className="input" value={customWidth} min={10} max={1000}
                        onChange={(e) => setCustomWidth(Number(e.target.value))} />
                    </div>
                    <div>
                      <label className="label">세로 (mm)</label>
                      <input type="number" className="input" value={customHeight} min={10} max={1000}
                        onChange={(e) => setCustomHeight(Number(e.target.value))} />
                    </div>
                  </div>
                )}

                {/* 수량 선택 */}
                <div>
                  <label className="label">수량 ({formConfig.quantityUnit ?? "개"})</label>
                  {formConfig.quantityPresets ? (
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-2">
                      {formConfig.quantityPresets.map((q) => (
                        <button key={q} type="button"
                          onClick={() => setQuantity(q)}
                          className={`py-2.5 rounded-lg text-sm font-medium transition-colors border
                            ${quantity === q
                              ? "border-primary-500 bg-primary-50 text-primary-700"
                              : "border-gray-200 text-gray-600 hover:bg-gray-50"
                            }`}>
                          {q.toLocaleString()}{formConfig.quantityUnit ?? ""}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <input type="number" className="input w-40" value={quantity} min={1} max={99999}
                      onChange={(e) => setQuantity(Number(e.target.value))} />
                  )}
                  <p className="text-xs text-gray-400 mt-1">
                    다른 수량이 필요하시면 아래 요청사항에 적어주세요.
                  </p>
                </div>

                {formConfig.priceNote && (
                  <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-700 flex items-start gap-2">
                    <Info size={14} className="shrink-0 mt-0.5" />
                    <span>{formConfig.priceNote}</span>
                  </div>
                )}
              </div>
            )}

            {/* ── 주문자 정보 ── */}
            <div className="card">
              <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><User size={18} /> 주문자 정보</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="label">이름 *</label>
                  <div className="relative">
                    <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="text" className="input pl-9" value={customerName} placeholder="주문자 이름"
                      onChange={(e) => setCustomerName(e.target.value)} required />
                  </div>
                </div>
                <div>
                  <label className="label">연락처 *</label>
                  <div className="relative">
                    <Phone size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="tel" className="input pl-9" value={customerPhone} placeholder="010-0000-0000"
                      onChange={(e) => setCustomerPhone(e.target.value)} required />
                  </div>
                </div>
              </div>
            </div>

            {/* ── 배송 정보 (inquiry가 아닐 때) ── */}
            {!isInquiry && (
              <div className="card">
                <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><MapPin size={18} /> 배송 정보</h2>
                <div className="space-y-3">
                  <div>
                    <label className="label">주소 *</label>
                    <div className="flex gap-2">
                      <input type="text" className="input flex-1" value={address} placeholder="주소 검색을 눌러주세요" readOnly required />
                      <button type="button" onClick={openAddressSearch}
                        className="shrink-0 flex items-center gap-1.5 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium transition-colors">
                        <Search size={14} /> 주소 검색
                      </button>
                    </div>
                    {zipCode && <p className="text-xs text-gray-400 mt-1">우편번호: {zipCode}</p>}
                  </div>
                  <div>
                    <label className="label">상세 주소</label>
                    <input type="text" className="input" value={addressDetail} placeholder="동·호수 등"
                      onChange={(e) => setAddressDetail(e.target.value)} />
                  </div>
                  <div>
                    <label className="label">배송 메모</label>
                    <input type="text" className="input" value={memo} placeholder="배송 시 요청사항"
                      onChange={(e) => setMemo(e.target.value)} />
                  </div>
                </div>
              </div>
            )}

            {/* ── 추가 요구사항 (inquiry 아닐 때만 별도 표시) ── */}
            {!isInquiry && (
              <div className="card">
                <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><MessageSquare size={18} /> 추가 요구사항</h2>
                <textarea className="input resize-none h-28" value={requirements}
                  placeholder="추가로 원하시는 사항을 자유롭게 입력해주세요."
                  onChange={(e) => setRequirements(e.target.value)} />
              </div>
            )}

            {/* inquiry일 때 배송지/연락처 안내 */}
            {isInquiry && (
              <div className="card">
                <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><MapPin size={18} /> 연락처 / 배송지</h2>
                <p className="text-sm text-gray-500 mb-3">배송지는 견적 확정 후 안내받으실 수 있습니다. 지금은 연락 가능한 정보만 입력해주세요.</p>
                <div>
                  <label className="label">배송지 (선택)</label>
                  <div className="flex gap-2">
                    <input type="text" className="input flex-1" value={address} placeholder="주소 검색 (선택사항)" readOnly />
                    <button type="button" onClick={openAddressSearch}
                      className="shrink-0 flex items-center gap-1.5 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg text-sm font-medium transition-colors">
                      <Search size={14} /> 주소 검색
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ══ 우측 주문 요약 ══ */}
          <div className="space-y-4">
            <div className="card sticky top-24">
              <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <CreditCard size={18} /> {isInquiry ? "문의 정보" : "결제 예상 금액"}
              </h2>

              {/* 선택한 제품 정보 요약 */}
              {productInfo && (
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <p className="text-xs text-gray-500">선택 상품</p>
                  <p className="font-bold text-gray-900 text-sm">{productInfo.product.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{productInfo.category.label} &gt; {productInfo.sub.title}</p>
                </div>
              )}

              {!isInquiry ? (
                <>
                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex justify-between text-gray-600">
                      <span>제품 금액</span>
                      <span>{displayPrice.productPrice > 0 ? `${displayPrice.productPrice.toLocaleString()}원` : "상담 후 확정"}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>배송비</span>
                      <span>{displayPrice.deliveryFee === 0 ? "무료" : `${displayPrice.deliveryFee.toLocaleString()}원`}</span>
                    </div>
                    <div className="border-t border-gray-200 pt-2 flex justify-between font-bold text-gray-900 text-base">
                      <span>총 합계</span>
                      <span className="text-primary-600">
                        {displayPrice.totalPrice > 0 ? `${displayPrice.totalPrice.toLocaleString()}원` : "상담 후 확정"}
                      </span>
                    </div>
                  </div>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-xs text-yellow-800 mb-4">
                    최종 금액은 시안 확인 후 결제가 진행됩니다. 지금은 주문만 접수돼요.
                  </div>
                </>
              ) : (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs text-blue-700 mb-4">
                  견적 문의 접수 후 담당자가 카카오톡으로 견적을 안내해드립니다.
                </div>
              )}

              {!user && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs text-blue-700 mb-3 flex items-start gap-2">
                  <LogIn size={14} className="shrink-0 mt-0.5" />
                  <span>{isInquiry ? "문의 접수" : "주문 접수"}를 위해 로그인이 필요해요.</span>
                </div>
              )}

              <button type="submit" disabled={loading}
                className="w-full btn-primary text-center flex items-center justify-center gap-2 disabled:opacity-60">
                {loading
                  ? (isInquiry ? "문의 접수 중..." : "주문 접수 중...")
                  : user
                    ? (isInquiry ? "견적 문의하기" : "주문 접수하기")
                    : (isInquiry ? "로그인 후 문의하기" : "로그인 후 주문하기")
                }
              </button>
              <p className="text-xs text-gray-400 text-center mt-2">
                {isInquiry
                  ? "문의 접수 → 담당자 확인 → 견적 안내 순으로 진행됩니다"
                  : "시안 확인 → 승인 → 결제 → 제작 순으로 진행됩니다"
                }
              </p>
            </div>
          </div>
        </form>

        {/* ── 로그인 팝업 모달 ── */}
        {showLoginModal && (
          <LoginModal onClose={() => setShowLoginModal(false)} onLoginSuccess={() => setShowLoginModal(false)} />
        )}

        {/* ── 시안 선택 모달 (banner 타입) ── */}
        {showTemplateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowTemplateModal(false)} />
            <div className="relative bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[88vh] flex flex-col overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
                <div>
                  <h2 className="font-bold text-gray-900 text-lg">시안 선택</h2>
                  <p className="text-xs text-gray-400 mt-0.5">원하는 시안을 선택하면 바로 적용됩니다</p>
                </div>
                <button type="button" onClick={() => setShowTemplateModal(false)} className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors">
                  <X size={20} />
                </button>
              </div>
              <div className="flex gap-2 px-6 py-3 border-b border-gray-100 overflow-x-auto scrollbar-hide shrink-0">
                {TEMPLATE_CATEGORIES.map(({ id, label }) => (
                  <button key={id} type="button" onClick={() => setModalCat(id)}
                    className={`shrink-0 px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${modalCat === id ? "bg-primary-600 text-white shadow-sm" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                    {label}
                  </button>
                ))}
              </div>
              <div className="overflow-y-auto flex-1 p-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {SAMPLE_TEMPLATES
                    .filter((t) => modalCat === "all" || t.category === modalCat)
                    .filter((t) => t.img !== null)
                    .map((tmpl) => (
                      <div key={tmpl.id}
                        className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-primary-400 hover:shadow-md transition-all cursor-pointer"
                        onClick={() => { if (tmpl.img) { setSelectedImage(tmpl.img); setSelectedImageName(tmpl.name); } setShowTemplateModal(false); }}>
                        <div className="relative bg-gray-50 overflow-hidden" style={{ height: tmpl.orientation === "wide" ? "80px" : "110px" }}>
                          {tmpl.img ? (
                            <img src={tmpl.img} alt={tmpl.name} className="w-full h-full object-contain group-hover:scale-[1.03] transition-transform duration-200" loading="lazy" />
                          ) : (
                            <div className={`w-full h-full bg-gradient-to-br ${tmpl.color ?? "from-gray-300 to-gray-400"} flex items-center justify-center`}>
                              <span className="text-white/80 text-xs font-bold">{tmpl.name}</span>
                            </div>
                          )}
                        </div>
                        <div className="px-2.5 py-2 flex items-center justify-between gap-1">
                          <span className="text-xs text-gray-700 font-medium truncate">{tmpl.name}</span>
                          <button type="button"
                            onClick={(e) => { e.stopPropagation(); if (tmpl.img) { setSelectedImage(tmpl.img); setSelectedImageName(tmpl.name); } setShowTemplateModal(false); }}
                            className="shrink-0 flex items-center gap-0.5 bg-primary-600 hover:bg-primary-700 text-white px-2 py-1 rounded-lg text-xs font-semibold transition-colors">
                            <Check size={10} /> 선택
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════
// 로그인 팝업 모달
// ═══════════════════════════════════════════════════
function LoginModal({ onClose, onLoginSuccess }: { onClose: () => void; onLoginSuccess: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { setError("이메일과 비밀번호를 입력해주세요."); return; }
    setError(""); setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onLoginSuccess();
    } catch (err: any) {
      const code = err?.code ?? "";
      if (code === "auth/user-not-found" || code === "auth/wrong-password" || code === "auth/invalid-credential") {
        setError("이메일 또는 비밀번호가 올바르지 않습니다.");
      } else if (code === "auth/too-many-requests") {
        setError("로그인 시도가 너무 많습니다. 잠시 후 다시 시도해주세요.");
      } else { setError("로그인 중 오류가 발생했습니다."); }
    } finally { setLoading(false); }
  };

  const handleGoogleLogin = async () => {
    setError(""); setLoading(true);
    try { await signInWithRedirect(auth, new GoogleAuthProvider()); }
    catch (err: any) { setError(`Google 로그인 오류가 발생했어요. 이메일로 로그인해주세요.`); setLoading(false); }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-2xl w-full max-w-sm overflow-hidden">
        <div className="px-6 pt-6 pb-2 flex items-center justify-between">
          <div>
            <h2 className="font-bold text-gray-900 text-lg">로그인</h2>
            <p className="text-xs text-gray-400 mt-0.5">주문 접수를 위해 로그인이 필요해요</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 transition-colors"><X size={18} /></button>
        </div>
        <div className="px-6 pb-6 pt-2">
          {error && <div className="bg-red-50 border border-red-200 text-red-600 text-xs rounded-lg px-3 py-2 mb-4">{error}</div>}
          <form onSubmit={handleEmailLogin} className="space-y-3 mb-4">
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">이메일</label>
              <div className="relative">
                <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="example@email.com"
                  className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary-500 transition-colors" autoFocus />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">비밀번호</label>
              <div className="relative">
                <input type={showPw ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="비밀번호 입력"
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary-500 transition-colors pr-10" />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading}
              className="w-full py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-semibold transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
              {loading ? <Loader2 size={15} className="animate-spin" /> : <LogIn size={15} />}
              {loading ? "로그인 중..." : "로그인"}
            </button>
          </form>
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-gray-200" /><span className="text-xs text-gray-400">또는</span><div className="flex-1 h-px bg-gray-200" />
          </div>
          <button type="button" onClick={handleGoogleLogin} disabled={loading}
            className="w-full py-2.5 border border-gray-200 hover:bg-gray-50 rounded-lg text-sm font-medium text-gray-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-60">
            <svg width="16" height="16" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Google 계정으로 로그인
          </button>
          <div className="flex justify-center gap-3 mt-4 text-xs text-gray-400">
            <Link href="/register" className="hover:text-primary-600 transition-colors" onClick={onClose}>회원가입</Link>
            <span>·</span>
            <Link href="/login" className="hover:text-primary-600 transition-colors" onClick={onClose}>비밀번호 찾기</Link>
          </div>
          <p className="text-[11px] text-gray-400 text-center mt-4 leading-relaxed">로그인 후에도 작성 중인 주문 정보가 그대로 유지됩니다.</p>
        </div>
      </div>
    </div>
  );
}
