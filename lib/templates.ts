const BASE = "https://jubora.co.kr/data/file/sp01_01";

export const TEMPLATE_CATEGORIES = [
  { id: "all",        label: "전체" },
  { id: "horizontal", label: "가로형 현수막" },
  { id: "season",     label: "절기 현수막" },
  { id: "worship",    label: "예배·행사" },
  { id: "vertical",   label: "세로형 배너" },
  { id: "banner",     label: "X배너" },
  { id: "rollup",     label: "롤업배너" },
  { id: "print",      label: "인쇄물" },
];

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
  // ── 가로형 현수막 ──────────────────────────────────────────────────
  { id: "t1",  name: "현수막 배경 A",     category: "horizontal", orientation: "wide",     img: `${BASE}/thumb-32066518_RAXza1sl_b96_780x0.jpg`, tags: ["가로형","배경"] },
  { id: "t2",  name: "현수막 배경 B",     category: "horizontal", orientation: "wide",     img: `${BASE}/thumb-32078213_ETOlUxhF_b95_780x0.jpg`, tags: ["가로형","배경"] },
  { id: "t3",  name: "현수막 배경 C",     category: "horizontal", orientation: "wide",     img: `${BASE}/thumb-32078213_ZxswIjCF_b94_780x0.jpg`, tags: ["가로형","배경"] },
  { id: "t4",  name: "현수막 배경 D",     category: "horizontal", orientation: "wide",     img: `${BASE}/thumb-32078213_cdgepKXQ_B93_780x0.jpg`, tags: ["가로형","배경"] },
  { id: "t5",  name: "현수막 배경 E",     category: "horizontal", orientation: "wide",     img: `${BASE}/thumb-32078213_Gi7zxDYE_B92_780x0.jpg`, tags: ["가로형","배경"] },
  { id: "t6",  name: "현수막 배경 F",     category: "horizontal", orientation: "wide",     img: `${BASE}/thumb-32078213_1NICatEb_b91_780x0.jpg`, tags: ["가로형","배경"] },
  { id: "t7",  name: "현수막 배경 G",     category: "horizontal", orientation: "wide",     img: `${BASE}/thumb-32078213_4zEcBeoJ_b90_780x0.jpg`, tags: ["가로형","배경"] },
  { id: "t8",  name: "현수막 배경 H",     category: "horizontal", orientation: "wide",     img: `${BASE}/thumb-32078213_Clrf1EaZ_b89_780x0.jpg`, tags: ["가로형","배경"] },
  { id: "t9",  name: "현수막 배경 I",     category: "horizontal", orientation: "wide",     img: `${BASE}/thumb-32078213_JtsFkUCV_b88_780x0.jpg`, tags: ["가로형","배경"] },
  { id: "t10", name: "현수막 배경 J",     category: "horizontal", orientation: "wide",     img: `${BASE}/thumb-32078213_RF6xgGDp_b87_780x0.jpg`, tags: ["가로형","배경"] },
  // ── 절기 ──────────────────────────────────────────────────────────
  { id: "t11", name: "부활절 현수막 A",       category: "season", orientation: "wide", img: `${BASE}/thumb-32066518_RAXza1sl_b96_780x0.jpg`, tags: ["절기","부활절"] },
  { id: "t12", name: "성탄절 현수막 A",       category: "season", orientation: "wide", img: `${BASE}/thumb-32078213_Gi7zxDYE_B92_780x0.jpg`, tags: ["절기","성탄"] },
  { id: "t13", name: "추수감사절 현수막 A",   category: "season", orientation: "wide", img: `${BASE}/thumb-32078213_RF6xgGDp_b87_780x0.jpg`, tags: ["절기","추수"] },
  { id: "t50", name: "부활절 현수막 B",       category: "season", orientation: "wide", img: null, color: "from-rose-400 to-pink-500",       tags: ["절기","부활절"] },
  { id: "t51", name: "성탄절 현수막 B",       category: "season", orientation: "wide", img: null, color: "from-red-500 to-green-600",       tags: ["절기","성탄"] },
  { id: "t52", name: "추수감사절 현수막 B",   category: "season", orientation: "wide", img: null, color: "from-amber-400 to-orange-500",    tags: ["절기","추수"] },
  { id: "t53", name: "사순절 현수막",         category: "season", orientation: "wide", img: null, color: "from-violet-500 to-purple-700",   tags: ["절기","사순절"] },
  { id: "t54", name: "맥추감사절 현수막",     category: "season", orientation: "wide", img: null, color: "from-yellow-400 to-amber-500",    tags: ["절기","맥추"] },
  { id: "t55", name: "종려주일 현수막",       category: "season", orientation: "wide", img: null, color: "from-emerald-400 to-green-600",   tags: ["절기","종려주일"] },
  { id: "t56", name: "성탄절 현수막 C",       category: "season", orientation: "wide", img: null, color: "from-red-600 to-rose-500",        tags: ["절기","성탄"] },
  { id: "t57", name: "부활절 현수막 C",       category: "season", orientation: "wide", img: null, color: "from-sky-400 to-indigo-400",      tags: ["절기","부활절"] },

  // ── 예배·행사 ─────────────────────────────────────────────────────
  { id: "t14", name: "주일예배 안내 A",       category: "worship", orientation: "wide", img: `${BASE}/thumb-32078213_cdgepKXQ_B93_780x0.jpg`, tags: ["예배","주일"] },
  { id: "t15", name: "특별집회 현수막",       category: "worship", orientation: "wide", img: `${BASE}/thumb-32078213_ETOlUxhF_b95_780x0.jpg`, tags: ["집회","행사"] },
  { id: "t60", name: "주일예배 안내 B",       category: "worship", orientation: "wide", img: null, color: "from-blue-500 to-indigo-600",     tags: ["예배","주일"] },
  { id: "t61", name: "수요예배 안내",         category: "worship", orientation: "wide", img: null, color: "from-sky-400 to-blue-500",        tags: ["예배","수요"] },
  { id: "t62", name: "새벽기도회 안내",       category: "worship", orientation: "wide", img: null, color: "from-amber-300 to-orange-400",    tags: ["기도","새벽"] },
  { id: "t63", name: "찬양예배 안내",         category: "worship", orientation: "wide", img: null, color: "from-violet-400 to-purple-500",   tags: ["찬양","예배"] },
  { id: "t64", name: "부흥회 현수막",         category: "worship", orientation: "wide", img: null, color: "from-red-500 to-orange-500",      tags: ["부흥회","행사"] },
  { id: "t65", name: "바자회·축제 현수막",    category: "worship", orientation: "wide", img: null, color: "from-pink-400 to-rose-500",       tags: ["바자회","축제"] },
  { id: "t66", name: "수련회 현수막",         category: "worship", orientation: "wide", img: null, color: "from-teal-400 to-cyan-500",       tags: ["수련회","캠프"] },
  { id: "t67", name: "교회 창립기념 현수막",  category: "worship", orientation: "wide", img: null, color: "from-yellow-500 to-amber-600",    tags: ["창립","기념"] },
  { id: "t68", name: "선교대회 현수막",       category: "worship", orientation: "wide", img: null, color: "from-emerald-500 to-teal-600",    tags: ["선교","대회"] },
  { id: "t69", name: "성경학교 현수막",       category: "worship", orientation: "wide", img: null, color: "from-cyan-400 to-blue-500",       tags: ["성경학교","여름"] },

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
  { id: "t18", name: "X배너 기본형",          category: "banner", orientation: "portrait", img: null, color: "from-cyan-400 to-blue-500",        tags: ["X배너","기본"] },
  { id: "t80", name: "X배너 예배안내",        category: "banner", orientation: "portrait", img: null, color: "from-blue-500 to-indigo-600",      tags: ["X배너","예배"] },
  { id: "t81", name: "X배너 행사안내",        category: "banner", orientation: "portrait", img: null, color: "from-red-400 to-rose-500",         tags: ["X배너","행사"] },
  { id: "t82", name: "X배너 환영",            category: "banner", orientation: "portrait", img: null, color: "from-amber-400 to-orange-500",     tags: ["X배너","환영"] },
  { id: "t83", name: "X배너 절기",            category: "banner", orientation: "portrait", img: null, color: "from-emerald-400 to-teal-500",     tags: ["X배너","절기"] },
  { id: "t84", name: "X배너 부흥회",          category: "banner", orientation: "portrait", img: null, color: "from-orange-500 to-red-600",       tags: ["X배너","부흥회"] },
  { id: "t85", name: "X배너 성경학교",        category: "banner", orientation: "portrait", img: null, color: "from-sky-400 to-blue-500",         tags: ["X배너","성경학교"] },
  { id: "t86", name: "X배너 수련회",          category: "banner", orientation: "portrait", img: null, color: "from-teal-400 to-cyan-500",        tags: ["X배너","수련회"] },
  { id: "t87", name: "X배너 선교대회",        category: "banner", orientation: "portrait", img: null, color: "from-violet-400 to-purple-500",    tags: ["X배너","선교"] },
  { id: "t88", name: "X배너 카페안내",        category: "banner", orientation: "portrait", img: null, color: "from-yellow-600 to-amber-700",     tags: ["X배너","카페"] },

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
