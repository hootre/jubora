const BASE = "https://jubora.co.kr/data/file/sp01_01";

export const TEMPLATE_CATEGORIES = [
  { id: "all",       label: "전체" },
  { id: "banner",    label: "현수막/배너" },
  { id: "print",     label: "포스터/전단지/리플렛" },
  { id: "sticker",   label: "스티커" },
  { id: "namecard",  label: "명함/쿠폰" },
  { id: "church",    label: "교회용품" },
  { id: "promo",     label: "판촉물" },
];

// 시안 템플릿의 category → 상위 카테고리 매핑
export const TEMPLATE_PARENT_MAP: Record<string, string> = {
  // 현수막/배너
  bg: "banner", season: "banner", worship: "banner", event: "banner",
  vertical: "banner", xbanner: "banner", rollup: "banner",
  // 포스터/전단지/리플렛
  flyer: "print", poster: "print", leaflet: "print", card: "print",
  // 스티커
  "sticker-type": "sticker", signage: "sticker",
  // 명함/쿠폰
  "namecard-type": "namecard", "coupon-type": "namecard", "envelope-type": "namecard",
  // 교회용품
  "church-item": "church", "sash-flag": "church",
  // 판촉물
  evangel: "promo", "promo-item": "promo",
};

// 카테고리별 서브 필터 목록
export const TEMPLATE_FILTERS: Record<string, { id: string; label: string }[]> = {
  banner: [
    { id: "bg",       label: "배경" },
    { id: "season",   label: "절기현수막" },
    { id: "worship",  label: "예배현수막" },
    { id: "event",    label: "행사현수막" },
    { id: "xbanner",  label: "X배너" },
    { id: "rollup",   label: "롤업배너" },
    { id: "vertical", label: "세로형 배너" },
  ],
  print: [
    { id: "flyer",   label: "전단지" },
    { id: "poster",  label: "포스터" },
    { id: "leaflet", label: "리플렛/팜플렛" },
    { id: "card",    label: "엽서/카드" },
  ],
  sticker: [
    { id: "sticker-type", label: "스티커" },
    { id: "signage",      label: "실사·광고물" },
  ],
  namecard: [
    { id: "namecard-type", label: "명함" },
    { id: "coupon-type",   label: "쿠폰/도장" },
    { id: "envelope-type", label: "봉투" },
  ],
  church: [
    { id: "church-item", label: "교회용품" },
    { id: "sash-flag",   label: "어깨띠·깃발" },
  ],
  promo: [
    { id: "evangel",    label: "전도용품" },
    { id: "promo-item", label: "판촉물" },
  ],
};

export type TemplateOrientation = "wide" | "portrait" | "square";

export interface SampleTemplate {
  id: string;
  name: string;
  category: string;
  orientation: TemplateOrientation;
  img: string | null;
  color?: string;
  tags: string[];
  productId?: string;    // 주문 시 연결할 제품 ID (없으면 template 기반 주문)
  isInquiry?: boolean;   // 견적문의 여부
}

export const SAMPLE_TEMPLATES: SampleTemplate[] = [
  // ── 배경 ──────────────────────────────────────────────────────────
  { id: "t1",  name: "현수막 배경 A",     category: "bg", orientation: "wide", img: `${BASE}/thumb-32066518_RAXza1sl_b96_780x0.jpg`, tags: ["현수막배경","배경"] },
  { id: "t2",  name: "현수막 배경 B",     category: "bg", orientation: "wide", img: `${BASE}/thumb-32078213_ETOlUxhF_b95_780x0.jpg`, tags: ["현수막배경","배경"] },
  { id: "t3",  name: "현수막 배경 C",     category: "bg", orientation: "wide", img: `${BASE}/thumb-32078213_ZxswIjCF_b94_780x0.jpg`, tags: ["현수막배경","배경"] },
  { id: "t4",  name: "현수막 배경 D",     category: "bg", orientation: "wide", img: `${BASE}/thumb-32078213_cdgepKXQ_B93_780x0.jpg`, tags: ["현수막배경","배경"] },
  { id: "t5",  name: "현수막 배경 E",     category: "bg", orientation: "wide", img: `${BASE}/thumb-32078213_Gi7zxDYE_B92_780x0.jpg`, tags: ["현수막배경","배경"] },
  { id: "t6",  name: "간단배경 A",        category: "bg", orientation: "wide", img: `${BASE}/thumb-32078213_1NICatEb_b91_780x0.jpg`, tags: ["간단배경","배경"] },
  { id: "t7",  name: "간단배경 B",        category: "bg", orientation: "wide", img: `${BASE}/thumb-32078213_4zEcBeoJ_b90_780x0.jpg`, tags: ["간단배경","배경"] },
  { id: "t8",  name: "표어 현수막 A",     category: "bg", orientation: "wide", img: `${BASE}/thumb-32078213_Clrf1EaZ_b89_780x0.jpg`, tags: ["표어","배경"] },
  { id: "t9",  name: "성화·환영 A",       category: "bg", orientation: "wide", img: `${BASE}/thumb-32078213_JtsFkUCV_b88_780x0.jpg`, tags: ["성화","배경"] },
  { id: "t10", name: "시간표 현수막 A",   category: "bg", orientation: "wide", img: `${BASE}/thumb-32078213_RF6xgGDp_b87_780x0.jpg`, tags: ["시간표","배경"] },

  // ── 절기현수막 ────────────────────────────────────────────────────
  { id: "t11", name: "부활절 현수막 A",       category: "season", orientation: "wide", img: `${BASE}/thumb-32066518_RAXza1sl_b96_780x0.jpg`, tags: ["부활절","절기"] },
  { id: "t12", name: "성탄절 현수막 A",       category: "season", orientation: "wide", img: `${BASE}/thumb-32078213_Gi7zxDYE_B92_780x0.jpg`, tags: ["성탄절","절기"] },
  { id: "t13", name: "추수감사절 현수막 A",   category: "season", orientation: "wide", img: `${BASE}/thumb-32078213_RF6xgGDp_b87_780x0.jpg`, tags: ["추수감사절","절기"] },
  { id: "t50", name: "부활절 현수막 B",       category: "season", orientation: "wide", img: null, color: "from-rose-400 to-pink-500",       tags: ["부활절","절기"] },
  { id: "t51", name: "성탄절 현수막 B",       category: "season", orientation: "wide", img: null, color: "from-red-500 to-green-600",       tags: ["성탄절","절기"] },
  { id: "t52", name: "추수감사절 현수막 B",   category: "season", orientation: "wide", img: null, color: "from-amber-400 to-orange-500",    tags: ["추수감사절","절기"] },
  { id: "t53", name: "사순절 현수막",         category: "season", orientation: "wide", img: null, color: "from-violet-500 to-purple-700",   tags: ["사순절","절기"] },
  { id: "t54", name: "맥추감사절 현수막",     category: "season", orientation: "wide", img: null, color: "from-yellow-400 to-amber-500",    tags: ["맥추감사절","절기"] },
  { id: "t55", name: "송구영신 현수막",       category: "season", orientation: "wide", img: null, color: "from-amber-400 to-yellow-500",    tags: ["송구영신","절기"] },
  { id: "t56", name: "성탄절 현수막 C",       category: "season", orientation: "wide", img: null, color: "from-red-600 to-rose-500",        tags: ["성탄절","절기"] },
  { id: "t57", name: "부활절 현수막 C",       category: "season", orientation: "wide", img: null, color: "from-sky-400 to-indigo-400",      tags: ["부활절","절기"] },
  { id: "t58", name: "어린이주일 현수막",     category: "season", orientation: "wide", img: null, color: "from-pink-400 to-rose-400",        tags: ["어린이주일","절기"] },
  { id: "t59", name: "스승·어버이주일 현수막", category: "season", orientation: "wide", img: null, color: "from-emerald-400 to-green-500",  tags: ["스승어버이주일","절기"] },

  // ── 예배현수막 ────────────────────────────────────────────────────
  { id: "t14", name: "주일예배 안내 A",       category: "worship", orientation: "wide", img: `${BASE}/thumb-32078213_cdgepKXQ_B93_780x0.jpg`, tags: ["주도예배","예배"] },
  { id: "t15", name: "입학·졸업 축하",       category: "worship", orientation: "wide", img: `${BASE}/thumb-32078213_ETOlUxhF_b95_780x0.jpg`, tags: ["입학졸업","예배"] },
  { id: "t60", name: "주도예배 안내 A",       category: "worship", orientation: "wide", img: null, color: "from-blue-500 to-indigo-600",     tags: ["주도예배","예배"] },
  { id: "t61", name: "가정의달 현수막",       category: "worship", orientation: "wide", img: null, color: "from-pink-400 to-rose-400",       tags: ["가정의달","예배"] },
  { id: "t62", name: "헌신예배 현수막",       category: "worship", orientation: "wide", img: null, color: "from-amber-300 to-orange-400",    tags: ["헌신예배","예배"] },
  { id: "t63", name: "임직·취임 현수막",     category: "worship", orientation: "wide", img: null, color: "from-violet-400 to-purple-500",   tags: ["임직취임","예배"] },
  { id: "t64", name: "입당·창립 현수막",     category: "worship", orientation: "wide", img: null, color: "from-yellow-500 to-amber-600",    tags: ["입당창립","예배"] },
  { id: "t65", name: "노회·총회 현수막",     category: "worship", orientation: "wide", img: null, color: "from-indigo-400 to-blue-500",     tags: ["노회총회","예배"] },
  { id: "t66", name: "선교·파송 현수막",     category: "worship", orientation: "wide", img: null, color: "from-emerald-500 to-teal-600",    tags: ["선교파송","예배"] },

  // ── 행사현수막 ────────────────────────────────────────────────────
  { id: "t67", name: "기도회 현수막",         category: "event", orientation: "wide", img: null, color: "from-blue-500 to-indigo-600",       tags: ["기도회","행사"] },
  { id: "t68", name: "부흥회 현수막",         category: "event", orientation: "wide", img: null, color: "from-red-500 to-orange-500",        tags: ["부흥회","행사"] },
  { id: "t69", name: "세미나·수련회 현수막",  category: "event", orientation: "wide", img: null, color: "from-teal-400 to-cyan-500",         tags: ["세미나수련회","행사"] },
  { id: "t70b", name: "전도 현수막",          category: "event", orientation: "wide", img: null, color: "from-green-400 to-emerald-500",     tags: ["전도","행사"] },
  { id: "t71b", name: "여름행사 현수막",      category: "event", orientation: "wide", img: null, color: "from-cyan-400 to-blue-500",         tags: ["여름겨울","행사"] },
  { id: "t72b", name: "성경학교 현수막",      category: "event", orientation: "wide", img: null, color: "from-sky-400 to-blue-500",          tags: ["성경학교","행사"] },
  { id: "t73b", name: "바자회 현수막",        category: "event", orientation: "wide", img: null, color: "from-pink-400 to-rose-500",         tags: ["바자회","행사"] },
  { id: "t74b", name: "찬양예배 현수막",      category: "event", orientation: "wide", img: null, color: "from-violet-400 to-purple-500",     tags: ["찬양","행사"] },
  { id: "t75b", name: "체육대회 현수막",      category: "event", orientation: "wide", img: null, color: "from-emerald-400 to-green-500",     tags: ["체육대회","행사"] },
  { id: "t76b", name: "양육·제자훈련 현수막", category: "event", orientation: "wide", img: null, color: "from-amber-400 to-orange-500",      tags: ["양육","행사"] },
  { id: "t77b", name: "초청행사 현수막",      category: "event", orientation: "wide", img: null, color: "from-rose-400 to-pink-500",         tags: ["초청","행사"] },
  { id: "t78b", name: "효도잔치 현수막",      category: "event", orientation: "wide", img: null, color: "from-orange-400 to-amber-500",      tags: ["효도잔치","행사"] },

  // ── 세로형 배너 ───────────────────────────────────────────────────
  { id: "t16", name: "세로형 배너 A",         category: "vertical", orientation: "portrait", img: null, color: "from-green-400 to-teal-500",     tags: ["세로형","기본"] },
  { id: "t17", name: "세로형 배너 B",         category: "vertical", orientation: "portrait", img: null, color: "from-purple-400 to-indigo-500",  tags: ["세로형","기본"] },
  { id: "t70", name: "예배 안내 세로배너",    category: "vertical", orientation: "portrait", img: null, color: "from-blue-400 to-indigo-500",    tags: ["세로형","예배"] },
  { id: "t71", name: "절기 세로배너",         category: "vertical", orientation: "portrait", img: null, color: "from-rose-400 to-pink-500",      tags: ["세로형","절기"] },
  { id: "t72", name: "환영 세로배너",         category: "vertical", orientation: "portrait", img: null, color: "from-amber-400 to-yellow-500",   tags: ["세로형","환영"] },
  { id: "t73", name: "찬양 세로배너",         category: "vertical", orientation: "portrait", img: null, color: "from-violet-400 to-fuchsia-500", tags: ["세로형","찬양"] },
  { id: "t74", name: "교회학교 세로배너",     category: "vertical", orientation: "portrait", img: null, color: "from-orange-400 to-red-500",     tags: ["세로형","교회학교"] },
  { id: "t75", name: "선교 세로배너",         category: "vertical", orientation: "portrait", img: null, color: "from-emerald-400 to-green-500",  tags: ["세로형","선교"] },
  { id: "t76", name: "감사 세로배너",         category: "vertical", orientation: "portrait", img: null, color: "from-sky-400 to-cyan-500",       tags: ["세로형","감사"] },
  { id: "t77", name: "축복 세로배너",         category: "vertical", orientation: "portrait", img: null, color: "from-pink-400 to-rose-500",      tags: ["세로형","축복"] },

  // ── X배너 ─────────────────────────────────────────────────────────
  { id: "t18", name: "X배너 기본형",          category: "xbanner", orientation: "portrait", img: null, color: "from-cyan-400 to-blue-500",        tags: ["X배너","기본"] },
  { id: "t80", name: "X배너 예배안내",        category: "xbanner", orientation: "portrait", img: null, color: "from-blue-500 to-indigo-600",      tags: ["X배너","예배"] },
  { id: "t81", name: "X배너 행사안내",        category: "xbanner", orientation: "portrait", img: null, color: "from-red-400 to-rose-500",         tags: ["X배너","행사"] },
  { id: "t82", name: "X배너 환영",            category: "xbanner", orientation: "portrait", img: null, color: "from-amber-400 to-orange-500",     tags: ["X배너","환영"] },
  { id: "t83", name: "X배너 절기",            category: "xbanner", orientation: "portrait", img: null, color: "from-emerald-400 to-teal-500",     tags: ["X배너","절기"] },
  { id: "t84", name: "X배너 부흥회",          category: "xbanner", orientation: "portrait", img: null, color: "from-orange-500 to-red-600",       tags: ["X배너","부흥회"] },
  { id: "t85", name: "X배너 성경학교",        category: "xbanner", orientation: "portrait", img: null, color: "from-sky-400 to-blue-500",         tags: ["X배너","성경학교"] },
  { id: "t86", name: "X배너 수련회",          category: "xbanner", orientation: "portrait", img: null, color: "from-teal-400 to-cyan-500",        tags: ["X배너","수련회"] },
  { id: "t87", name: "X배너 선교대회",        category: "xbanner", orientation: "portrait", img: null, color: "from-violet-400 to-purple-500",    tags: ["X배너","선교"] },
  { id: "t88", name: "X배너 카페안내",        category: "xbanner", orientation: "portrait", img: null, color: "from-yellow-600 to-amber-700",     tags: ["X배너","카페"] },

  // ── 롤업배너 ──────────────────────────────────────────────────────
  { id: "t19", name: "롤업배너 기본형",       category: "rollup", orientation: "portrait", img: null, color: "from-teal-400 to-green-500",       tags: ["롤업","기본"] },
  { id: "t90", name: "롤업배너 예배안내",     category: "rollup", orientation: "portrait", img: null, color: "from-blue-500 to-indigo-600",      tags: ["롤업","예배"] },
  { id: "t91", name: "롤업배너 환영",         category: "rollup", orientation: "portrait", img: null, color: "from-amber-400 to-yellow-500",     tags: ["롤업","환영"] },
  { id: "t92", name: "롤업배너 절기",         category: "rollup", orientation: "portrait", img: null, color: "from-rose-400 to-pink-500",        tags: ["롤업","절기"] },
  { id: "t93", name: "롤업배너 행사",         category: "rollup", orientation: "portrait", img: null, color: "from-orange-400 to-red-500",       tags: ["롤업","행사"] },
  { id: "t94", name: "롤업배너 성경학교",     category: "rollup", orientation: "portrait", img: null, color: "from-sky-400 to-cyan-500",         tags: ["롤업","성경학교"] },
  { id: "t95", name: "롤업배너 수련회",       category: "rollup", orientation: "portrait", img: null, color: "from-emerald-500 to-teal-600",     tags: ["롤업","수련회"] },
  { id: "t96", name: "롤업배너 찬양집회",     category: "rollup", orientation: "portrait", img: null, color: "from-violet-500 to-purple-600",    tags: ["롤업","찬양"] },
  { id: "t97", name: "롤업배너 선교대회",     category: "rollup", orientation: "portrait", img: null, color: "from-cyan-500 to-blue-600",        tags: ["롤업","선교"] },
  { id: "t98", name: "롤업배너 부흥회",       category: "rollup", orientation: "portrait", img: null, color: "from-red-500 to-orange-600",       tags: ["롤업","부흥회"] },

  // ── 포스터/전단지 ─────────────────────────────────────────────────
  { id: "p01", name: "대량 단면 전단지",     category: "flyer",   orientation: "square", img: null, color: "from-emerald-400 to-green-500",  tags: ["전단지","단면"], productId: "flyer-single" },
  { id: "p02", name: "양면 풀컬러 전단지",   category: "flyer",   orientation: "square", img: null, color: "from-teal-400 to-emerald-500",   tags: ["전단지","양면"], productId: "flyer-double" },
  { id: "p03", name: "소량 양면 전단지",     category: "flyer",   orientation: "square", img: null, color: "from-green-400 to-teal-500",     tags: ["전단지","소량"], productId: "flyer-small" },
  { id: "p04", name: "A3 단면 포스터",       category: "poster",  orientation: "portrait", img: null, color: "from-orange-400 to-red-500",   tags: ["포스터","A3"], productId: "poster-a3" },
  { id: "p05", name: "A1 대형 포스터",       category: "poster",  orientation: "portrait", img: null, color: "from-red-400 to-rose-500",     tags: ["포스터","대형"], productId: "poster-large" },
  { id: "p06", name: "2단 리플렛",           category: "leaflet", orientation: "square", img: null, color: "from-violet-400 to-purple-500",  tags: ["리플렛","2단"], productId: "leaflet-2" },
  { id: "p07", name: "3단 리플렛",           category: "leaflet", orientation: "square", img: null, color: "from-purple-400 to-indigo-500",  tags: ["리플렛","3단"], productId: "leaflet-3" },
  { id: "p08", name: "팜플렛(소책자)",       category: "leaflet", orientation: "square", img: null, color: "from-indigo-400 to-blue-500",    tags: ["리플렛","소책자"], productId: "pamphlet" },
  { id: "p09", name: "감사 엽서",            category: "card",    orientation: "square", img: null, color: "from-pink-400 to-rose-500",      tags: ["엽서","감사"], productId: "postcard" },
  { id: "p10", name: "행사 초대장",          category: "card",    orientation: "square", img: null, color: "from-rose-400 to-pink-500",      tags: ["카드","초대장"], productId: "invitation" },
  { id: "p11", name: "주보 디자인",          category: "card",    orientation: "square", img: null, color: "from-blue-400 to-indigo-500",    tags: ["카드","주보"], productId: "bulletin" },
  { id: "p12", name: "예배 순서지",          category: "card",    orientation: "square", img: null, color: "from-amber-400 to-yellow-500",   tags: ["카드","순서지"], productId: "program" },

  // ── 스티커 ────────────────────────────────────────────────────────
  { id: "s01", name: "원형 규격 스티커",      category: "sticker-type", orientation: "square", img: null, color: "from-pink-400 to-rose-500",     tags: ["스티커","원형"], productId: "sticker-single" },
  { id: "s02", name: "사각 규격 스티커",      category: "sticker-type", orientation: "square", img: null, color: "from-rose-400 to-pink-500",     tags: ["스티커","사각"], productId: "sticker-single" },
  { id: "s03", name: "자유형 칼선 스티커",    category: "sticker-type", orientation: "square", img: null, color: "from-fuchsia-400 to-pink-500",  tags: ["스티커","칼선"], productId: "sticker-custom" },
  { id: "s04", name: "판스티커",              category: "sticker-type", orientation: "square", img: null, color: "from-violet-400 to-fuchsia-500",tags: ["스티커","판"], productId: "sticker-sheet" },
  { id: "s05", name: "롤스티커",              category: "sticker-type", orientation: "square", img: null, color: "from-purple-400 to-violet-500", tags: ["스티커","롤"], productId: "sticker-roll" },
  { id: "s06", name: "투명 PET 스티커",       category: "sticker-type", orientation: "square", img: null, color: "from-sky-400 to-cyan-500",     tags: ["스티커","투명"], productId: "sticker-clear" },
  { id: "s07", name: "바닥 부착용 스티커",    category: "sticker-type", orientation: "square", img: null, color: "from-amber-400 to-orange-500",  tags: ["스티커","바닥"], productId: "sticker-floor" },
  { id: "s08", name: "레터링 스티커",         category: "sticker-type", orientation: "square", img: null, color: "from-emerald-400 to-green-500", tags: ["스티커","레터링"], productId: "sticker-lettering" },
  { id: "s09", name: "유리창 썬팅·광고",      category: "signage",      orientation: "square", img: null, color: "from-gray-400 to-slate-500",    tags: ["실사","썬팅"], productId: "tinting", isInquiry: true },
  { id: "s10", name: "인테리어 시트지",       category: "signage",      orientation: "square", img: null, color: "from-slate-400 to-gray-500",    tags: ["실사","시트지"], productId: "sheet-vinyl", isInquiry: true },
  { id: "s11", name: "차량용 자석 스티커",    category: "signage",      orientation: "square", img: null, color: "from-zinc-400 to-gray-500",     tags: ["실사","자석"], productId: "magnet-sticker", isInquiry: true },

  // ── 명함/쿠폰 ────────────────────────────────────────────────────
  { id: "n01", name: "기본 명함",             category: "namecard-type", orientation: "square", img: null, color: "from-amber-400 to-orange-500",  tags: ["명함","기본"], productId: "namecard-basic" },
  { id: "n02", name: "전도 명함",             category: "namecard-type", orientation: "square", img: null, color: "from-orange-400 to-red-500",    tags: ["명함","전도"], productId: "namecard-evangel" },
  { id: "n03", name: "고급 명함 (펄지·박)",   category: "namecard-type", orientation: "square", img: null, color: "from-yellow-500 to-amber-600",  tags: ["명함","고급"], productId: "namecard-premium" },
  { id: "n04", name: "할인·이벤트 쿠폰",     category: "coupon-type",   orientation: "square", img: null, color: "from-red-400 to-rose-500",      tags: ["쿠폰","할인"], productId: "coupon" },
  { id: "n05", name: "도장 적립 카드",        category: "coupon-type",   orientation: "square", img: null, color: "from-rose-400 to-pink-500",     tags: ["쿠폰","도장"], productId: "stamp-card" },
  { id: "n06", name: "교회 헌금봉투",         category: "envelope-type", orientation: "square", img: null, color: "from-blue-400 to-indigo-500",   tags: ["봉투","헌금"], productId: "env-church" },
  { id: "n07", name: "감사 봉투",             category: "envelope-type", orientation: "square", img: null, color: "from-emerald-400 to-teal-500",  tags: ["봉투","감사"], productId: "env-thanks" },
  { id: "n08", name: "십일조 봉투",           category: "envelope-type", orientation: "square", img: null, color: "from-violet-400 to-purple-500", tags: ["봉투","십일조"], productId: "env-tithe" },
  { id: "n09", name: "각대 봉투 (일반)",      category: "envelope-type", orientation: "square", img: null, color: "from-gray-400 to-slate-500",    tags: ["봉투","각대"], productId: "env-standard" },

  // ── 교회용품 ──────────────────────────────────────────────────────
  { id: "c01", name: "교회 교패",             category: "church-item", orientation: "square", img: null, color: "from-violet-400 to-purple-500",  tags: ["교회용품","교패"], productId: "church-plaque", isInquiry: true },
  { id: "c02", name: "직분자 명찰",           category: "church-item", orientation: "square", img: null, color: "from-purple-400 to-indigo-500",  tags: ["교회용품","명찰"], productId: "church-nametag", isInquiry: true },
  { id: "c03", name: "교회 외부 표찰",        category: "church-item", orientation: "square", img: null, color: "from-indigo-400 to-blue-500",    tags: ["교회용품","표찰"], productId: "church-sign", isInquiry: true },
  { id: "c04", name: "기타 교회용품",         category: "church-item", orientation: "square", img: null, color: "from-blue-400 to-violet-500",    tags: ["교회용품","기타"], productId: "church-etc", isInquiry: true },
  { id: "c05", name: "부직포 어깨띠",         category: "sash-flag",   orientation: "square", img: null, color: "from-red-400 to-rose-500",       tags: ["어깨띠","행사"], productId: "sash", isInquiry: true },
  { id: "c06", name: "근조 깃발",             category: "sash-flag",   orientation: "square", img: null, color: "from-gray-500 to-slate-600",     tags: ["깃발","근조"], productId: "flag", isInquiry: true },

  // ── 판촉물 ────────────────────────────────────────────────────────
  { id: "r01", name: "교회 포켓 티슈",        category: "evangel",    orientation: "square", img: null, color: "from-sky-400 to-blue-500",       tags: ["전도용품","티슈"], productId: "tissue-paper", isInquiry: true },
  { id: "r02", name: "교회 물티슈",           category: "evangel",    orientation: "square", img: null, color: "from-cyan-400 to-teal-500",      tags: ["전도용품","물티슈"], productId: "tissue-wet", isInquiry: true },
  { id: "r03", name: "교회 각티슈",           category: "evangel",    orientation: "square", img: null, color: "from-blue-400 to-indigo-500",    tags: ["전도용품","각티슈"], productId: "tissue-box", isInquiry: true },
  { id: "r04", name: "다용도 클리너",         category: "evangel",    orientation: "square", img: null, color: "from-emerald-400 to-green-500",  tags: ["전도용품","클리너"], productId: "cleaner", isInquiry: true },
  { id: "r05", name: "기타 전도용품",         category: "evangel",    orientation: "square", img: null, color: "from-violet-400 to-purple-500",  tags: ["전도용품","기타"], productId: "promo-etc", isInquiry: true },
  { id: "r06", name: "단체 티셔츠",           category: "promo-item", orientation: "square", img: null, color: "from-red-400 to-rose-500",       tags: ["판촉물","티셔츠"], productId: "tshirt", isInquiry: true },
  { id: "r07", name: "여름 홍보/판촉물",      category: "promo-item", orientation: "square", img: null, color: "from-orange-400 to-amber-500",   tags: ["판촉물","여름"], productId: "summer-promo", isInquiry: true },
  { id: "r08", name: "에코백·텀블러",         category: "promo-item", orientation: "square", img: null, color: "from-amber-400 to-yellow-500",   tags: ["판촉물","생활용품"], productId: "home-item", isInquiry: true },
  { id: "r09", name: "보틀·머그컵",           category: "promo-item", orientation: "square", img: null, color: "from-green-400 to-teal-500",     tags: ["판촉물","주방"], productId: "kitchen-item", isInquiry: true },
  { id: "r10", name: "볼펜·노트·문구",        category: "promo-item", orientation: "square", img: null, color: "from-gray-400 to-slate-500",     tags: ["판촉물","문구"], productId: "stationery", isInquiry: true },
];
