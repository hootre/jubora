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
  bg: "banner", season: "banner", worship: "banner", event: "banner",
  vertical: "banner", xbanner: "banner", rollup: "banner",
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

  // ── 인쇄물 ────────────────────────────────────────────────────────
  { id: "t20",  name: "전도지 기본형",        category: "print", orientation: "square", img: null, color: "from-gray-400 to-slate-500",         tags: ["인쇄","전도지"] },
  { id: "t100", name: "주보 기본형",          category: "print", orientation: "square", img: null, color: "from-blue-400 to-indigo-500",        tags: ["인쇄","주보"] },
  { id: "t101", name: "주보 컬러형",          category: "print", orientation: "square", img: null, color: "from-sky-400 to-blue-500",           tags: ["인쇄","주보"] },
  { id: "t102", name: "행사 초대장",          category: "print", orientation: "square", img: null, color: "from-amber-400 to-yellow-500",       tags: ["인쇄","초대장"] },
  { id: "t103", name: "봉투 (헌금봉투)",      category: "print", orientation: "square", img: null, color: "from-emerald-400 to-teal-500",       tags: ["인쇄","봉투"] },
  { id: "t104", name: "명함 기본형",          category: "print", orientation: "square", img: null, color: "from-gray-500 to-gray-700",          tags: ["인쇄","명함"] },
  { id: "t105", name: "스티커 원형",          category: "print", orientation: "square", img: null, color: "from-pink-400 to-rose-500",          tags: ["인쇄","스티커"] },
  { id: "t106", name: "리플렛 A4 3단",       category: "print", orientation: "square", img: null, color: "from-violet-400 to-purple-500",      tags: ["인쇄","리플렛"] },
  { id: "t107", name: "포스터 A3",            category: "print", orientation: "square", img: null, color: "from-orange-400 to-red-500",         tags: ["인쇄","포스터"] },
  { id: "t108", name: "전단지 A4 양면",       category: "print", orientation: "square", img: null, color: "from-cyan-400 to-teal-500",          tags: ["인쇄","전단지"] },
];
