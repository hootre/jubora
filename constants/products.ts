// ═══════════════════════════════════════════
// 주보라 제품 카탈로그 — 카테고리별 제품/옵션 정의
// 관리자는 이 파일의 데이터만 수정하면 됩니다.
// ═══════════════════════════════════════════

// ── 공통 타입 ──
export interface ProductOption {
  id: string;
  label: string;
  price?: number;           // 고정 가격 (원)
  pricePerUnit?: string;    // 가격 설명 (예: "m²당 5,000원")
}

export interface ProductSpec {
  id: string;
  label: string;
  options: ProductOption[];
}

export interface ProductItem {
  id: string;
  name: string;
  description: string;
  thumbnail: string | null;    // null 이면 기본 그라디언트 표시
  color?: string;              // 그라디언트 클래스 (thumbnail 없을 때)
  badge?: "BEST" | "NEW" | "HOT";
  startPrice?: number;         // "~원부터" 표시
  orderType: OrderType;        // 주문 폼 타입
}

export interface SubCategory {
  id: string;
  title: string;
  items: ProductItem[];
}

export interface Category {
  id: string;
  label: string;
  icon: string;
  description: string;
  bannerColor: string;         // 히어로 배경 그라디언트
  subs: SubCategory[];
}

// ── 주문 폼 타입 ──
// 제품 유형에 따라 주문 페이지에서 다른 폼을 보여줌
export type OrderType =
  | "banner"       // 현수막/배너: 커스텀 사이즈 + 재질 + 마감
  | "poster"       // 포스터/전단지: 규격 사이즈 + 용지 + 코팅
  | "leaflet"      // 리플렛: 접지방식 + 용지 + 코팅
  | "sticker"      // 스티커: 모양 + 재질 + 사이즈
  | "namecard"     // 명함: 용지 + 코팅 + 수량(100장 단위)
  | "envelope"     // 봉투: 종류 + 용지 + 수량
  | "inquiry"      // 맞춤 견적: 자유 문의 (교회용품, 판촉물 등)
  ;

// ── 주문 타입별 폼 설정 ──
export interface OrderFormConfig {
  type: OrderType;
  label: string;
  specs: ProductSpec[];      // 선택 옵션들
  hasSizeInput?: boolean;    // 커스텀 사이즈 입력 여부
  sizePresets?: { label: string; width: number; height: number }[];
  quantityUnit?: string;     // 수량 단위 ("개", "장", "매", "box")
  quantityPresets?: number[];
  basePrice?: number;        // 기본 단가 (원)
  priceNote?: string;        // 가격 안내 문구
}

export const ORDER_FORM_CONFIGS: Record<OrderType, OrderFormConfig> = {
  banner: {
    type: "banner",
    label: "현수막/배너 주문",
    hasSizeInput: true,
    quantityUnit: "개",
    specs: [
      {
        id: "material",
        label: "재질",
        options: [
          { id: "cloth", label: "천 현수막", pricePerUnit: "m²당 5,000원" },
          { id: "nonwoven", label: "부직포", pricePerUnit: "m²당 7,000원" },
          { id: "mesh", label: "통풍 메쉬", pricePerUnit: "m²당 8,000원" },
          { id: "tarpaulin", label: "타폴린(고급)", pricePerUnit: "m²당 10,000원" },
        ],
      },
      {
        id: "finishing",
        label: "마감 옵션",
        options: [
          { id: "punching", label: "펀칭 (기본)", price: 0 },
          { id: "wood_rope", label: "나무+끈", price: 5000 },
          { id: "rope_all", label: "사방 끈처리", pricePerUnit: "m당 2,000원" },
          { id: "heat_cut", label: "열재단", price: 0 },
        ],
      },
    ],
    priceNote: "사이즈와 재질에 따라 자동 계산됩니다.",
  },

  poster: {
    type: "poster",
    label: "포스터/전단지 주문",
    quantityUnit: "매",
    quantityPresets: [100, 200, 500, 1000, 2000, 5000],
    specs: [
      {
        id: "size",
        label: "사이즈",
        options: [
          { id: "A4", label: "A4 (210×297mm)" },
          { id: "A3", label: "A3 (297×420mm)" },
          { id: "A2", label: "A2 (420×594mm)" },
          { id: "B5", label: "B5 (176×250mm)" },
          { id: "B4", label: "B4 (250×353mm)" },
        ],
      },
      {
        id: "paper",
        label: "용지",
        options: [
          { id: "art_150", label: "아트지 150g", pricePerUnit: "기본" },
          { id: "art_200", label: "아트지 200g", pricePerUnit: "+10%" },
          { id: "snow_200", label: "스노우지 200g", pricePerUnit: "+15%" },
          { id: "snow_250", label: "스노우지 250g", pricePerUnit: "+25%" },
          { id: "matt_150", label: "모조지 150g", pricePerUnit: "+5%" },
        ],
      },
      {
        id: "sides",
        label: "인쇄면",
        options: [
          { id: "single", label: "단면" },
          { id: "double", label: "양면", pricePerUnit: "+50%" },
        ],
      },
      {
        id: "coating",
        label: "코팅",
        options: [
          { id: "none", label: "무코팅" },
          { id: "glossy", label: "유광 코팅", pricePerUnit: "+10%" },
          { id: "matt", label: "무광 코팅", pricePerUnit: "+10%" },
        ],
      },
    ],
    basePrice: 50,
    priceNote: "100매 기준, 사이즈·용지·코팅에 따라 변동됩니다.",
  },

  leaflet: {
    type: "leaflet",
    label: "리플렛/팜플렛 주문",
    quantityUnit: "부",
    quantityPresets: [200, 500, 1000, 2000, 5000],
    specs: [
      {
        id: "fold",
        label: "접지 방식",
        options: [
          { id: "2fold", label: "2단 접지 (4페이지)" },
          { id: "3fold", label: "3단 접지 (6페이지)" },
          { id: "zigzag", label: "병풍 접지 (6페이지)" },
          { id: "booklet", label: "중철 소책자 (8p~)" },
        ],
      },
      {
        id: "size",
        label: "펼침 사이즈",
        options: [
          { id: "A4", label: "A4 (210×297mm)" },
          { id: "A3", label: "A3 (297×420mm)" },
          { id: "custom", label: "맞춤 사이즈 (별도 문의)" },
        ],
      },
      {
        id: "paper",
        label: "용지",
        options: [
          { id: "art_150", label: "아트지 150g" },
          { id: "art_200", label: "아트지 200g" },
          { id: "snow_200", label: "스노우지 200g" },
          { id: "snow_250", label: "스노우지 250g" },
        ],
      },
      {
        id: "coating",
        label: "코팅",
        options: [
          { id: "none", label: "무코팅" },
          { id: "glossy", label: "유광 코팅" },
          { id: "matt", label: "무광 코팅" },
        ],
      },
    ],
    basePrice: 80,
    priceNote: "200부 기준, 접지·용지에 따라 변동됩니다.",
  },

  sticker: {
    type: "sticker",
    label: "스티커 주문",
    hasSizeInput: true,
    quantityUnit: "매",
    quantityPresets: [100, 200, 500, 1000, 3000],
    specs: [
      {
        id: "shape",
        label: "모양",
        options: [
          { id: "rect", label: "사각형" },
          { id: "round", label: "원형" },
          { id: "oval", label: "타원형" },
          { id: "custom", label: "자유형 (칼선)" },
        ],
      },
      {
        id: "material",
        label: "재질",
        options: [
          { id: "art", label: "아트지 (일반)" },
          { id: "yupo", label: "유포지 (방수)" },
          { id: "clear", label: "투명 PET" },
          { id: "kraft", label: "크라프트지" },
          { id: "gold", label: "금박지" },
          { id: "silver", label: "은박지" },
        ],
      },
      {
        id: "coating",
        label: "코팅",
        options: [
          { id: "none", label: "무코팅" },
          { id: "glossy", label: "유광 코팅" },
          { id: "matt", label: "무광 코팅" },
        ],
      },
    ],
    basePrice: 30,
    priceNote: "100매 기준, 사이즈·재질에 따라 변동됩니다.",
  },

  namecard: {
    type: "namecard",
    label: "명함 주문",
    quantityUnit: "매",
    quantityPresets: [100, 200, 400, 500, 1000],
    specs: [
      {
        id: "size",
        label: "사이즈",
        options: [
          { id: "standard", label: "일반명함 (90×50mm)" },
          { id: "mini", label: "미니명함 (86×50mm)" },
          { id: "wide", label: "와이드 (90×54mm)" },
        ],
      },
      {
        id: "paper",
        label: "용지",
        options: [
          { id: "linen", label: "리넨지 (고급)" },
          { id: "snow_250", label: "스노우지 250g" },
          { id: "art_250", label: "아트지 250g" },
          { id: "kraft", label: "크라프트지" },
          { id: "pearl", label: "펄지 (럭셔리)" },
        ],
      },
      {
        id: "sides",
        label: "인쇄면",
        options: [
          { id: "single", label: "단면" },
          { id: "double", label: "양면", pricePerUnit: "+50%" },
        ],
      },
      {
        id: "coating",
        label: "코팅",
        options: [
          { id: "none", label: "무코팅" },
          { id: "glossy", label: "유광 코팅" },
          { id: "matt", label: "무광 코팅" },
          { id: "soft", label: "소프트 코팅 (벨벳)" },
        ],
      },
    ],
    basePrice: 15,
    priceNote: "100매 기준, 용지·코팅에 따라 변동됩니다.",
  },

  envelope: {
    type: "envelope",
    label: "봉투 주문",
    quantityUnit: "장",
    quantityPresets: [100, 200, 500, 1000],
    specs: [
      {
        id: "type",
        label: "봉투 종류",
        options: [
          { id: "church", label: "교회 헌금봉투" },
          { id: "tithe", label: "십일조 봉투" },
          { id: "thanks", label: "감사 봉투" },
          { id: "standard", label: "각대 봉투 (일반)" },
          { id: "letter", label: "서류 봉투 (대형)" },
        ],
      },
      {
        id: "paper",
        label: "용지",
        options: [
          { id: "kraft_80", label: "크라프트 80g" },
          { id: "white_80", label: "백상지 80g" },
          { id: "snow_120", label: "스노우지 120g" },
        ],
      },
      {
        id: "print",
        label: "인쇄",
        options: [
          { id: "1color", label: "단색 인쇄" },
          { id: "4color", label: "4도 컬러 인쇄" },
        ],
      },
    ],
    basePrice: 80,
    priceNote: "100장 기준, 봉투 종류와 인쇄에 따라 변동됩니다.",
  },

  inquiry: {
    type: "inquiry",
    label: "맞춤 견적 문의",
    specs: [],
    priceNote: "상담 후 견적을 안내해드립니다.",
  },
};

// ═══════════════════════════════════════════
// 전체 카테고리 데이터
// ═══════════════════════════════════════════
export const PRODUCT_CATEGORIES: Category[] = [
  {
    id: "banner",
    label: "현수막/배너",
    icon: "📢",
    description: "실내외 행사, 교회 절기, 홍보에 최적화된 현수막과 배너를 제작합니다.",
    bannerColor: "from-blue-600 to-indigo-800",
    subs: [
      {
        id: "horizontal",
        title: "현수막",
        items: [
          { id: "banner-basic", name: "기본 현수막", description: "가성비 좋은 천 현수막, 실내외 모두 사용 가능", thumbnail: null, color: "from-blue-400 to-indigo-500", badge: "BEST", startPrice: 5000, orderType: "banner" },
          { id: "banner-large", name: "대형 현수막", description: "건물 외벽, 행사장 등 대형 사이즈 전문", thumbnail: null, color: "from-sky-400 to-blue-500", startPrice: 8000, orderType: "banner" },
          { id: "banner-display", name: "게시대 현수막", description: "게시대 규격에 맞춘 현수막", thumbnail: null, color: "from-indigo-400 to-blue-500", startPrice: 6000, orderType: "banner" },
          { id: "banner-mesh", name: "통풍 현수막", description: "바람이 통하는 메쉬 소재, 야외 대형에 적합", thumbnail: null, color: "from-cyan-400 to-blue-500", startPrice: 8000, orderType: "banner" },
          { id: "banner-durable", name: "더 오래 가는 현수막", description: "타폴린 소재, 내구성 최고", thumbnail: null, color: "from-blue-500 to-indigo-600", startPrice: 10000, orderType: "banner" },
          { id: "banner-handle", name: "손잡이 현수막", description: "이동 집회, 거리 홍보용 손잡이 부착", thumbnail: null, color: "from-violet-400 to-indigo-500", startPrice: 7000, orderType: "banner" },
          { id: "banner-scroll", name: "족자형 현수막", description: "실내 장식용 족자 형태", thumbnail: null, color: "from-purple-400 to-indigo-500", startPrice: 12000, orderType: "banner" },
        ],
      },
      {
        id: "stand-banner",
        title: "배너",
        items: [
          { id: "xbanner", name: "X배너", description: "가벼운 거치대 + 배너 세트, 실내 행사 필수", thumbnail: null, color: "from-emerald-400 to-teal-500", badge: "BEST", startPrice: 15000, orderType: "banner" },
          { id: "stand-banner", name: "스탠드 배너", description: "롤업/거치형 배너, 전시회·세미나에 적합", thumbnail: null, color: "from-teal-400 to-cyan-500", startPrice: 25000, orderType: "banner" },
          { id: "fabric-banner", name: "패브릭 배너", description: "고급 원단 느낌, 실내 인테리어용", thumbnail: null, color: "from-green-400 to-emerald-500", startPrice: 20000, orderType: "banner" },
          { id: "photowall", name: "포토월 배너", description: "기념촬영용 대형 배경 배너", thumbnail: null, color: "from-pink-400 to-rose-500", startPrice: 35000, orderType: "banner" },
          { id: "mini-banner", name: "미니 배너", description: "탁상용/데스크 미니 배너", thumbnail: null, color: "from-amber-400 to-orange-500", startPrice: 10000, orderType: "banner" },
        ],
      },
      {
        id: "season",
        title: "절기 현수막",
        items: [
          { id: "season-lent", name: "고난(사순절)", description: "사순절·고난주간 현수막", thumbnail: null, color: "from-violet-500 to-purple-700", orderType: "banner" },
          { id: "season-easter", name: "부활절", description: "부활절 축하 현수막", thumbnail: null, color: "from-rose-400 to-pink-500", badge: "HOT", orderType: "banner" },
          { id: "season-harvest", name: "맥추감사절", description: "맥추감사절 현수막", thumbnail: null, color: "from-yellow-400 to-amber-500", orderType: "banner" },
          { id: "season-thanks", name: "추수감사절", description: "추수감사절 현수막", thumbnail: null, color: "from-orange-400 to-amber-500", orderType: "banner" },
          { id: "season-christmas", name: "성탄절", description: "성탄절·크리스마스 현수막", thumbnail: null, color: "from-red-500 to-green-600", badge: "HOT", orderType: "banner" },
          { id: "season-newyear", name: "송구영신", description: "송구영신·신년감사 현수막", thumbnail: null, color: "from-amber-400 to-yellow-500", orderType: "banner" },
          { id: "season-family", name: "어린이·어버이주일", description: "어린이주일·어버이주일 현수막", thumbnail: null, color: "from-pink-400 to-rose-400", orderType: "banner" },
        ],
      },
      {
        id: "worship",
        title: "예배·행사 현수막",
        items: [
          { id: "worship-grad", name: "입학·졸업예배", description: "입학·졸업·수료 축하 현수막", thumbnail: null, color: "from-blue-400 to-indigo-500", orderType: "banner" },
          { id: "worship-dedicate", name: "헌신·임직예배", description: "헌신·임직·안수 예배 현수막", thumbnail: null, color: "from-amber-400 to-yellow-500", orderType: "banner" },
          { id: "worship-revival", name: "부흥회·성회", description: "부흥회·성회 현수막", thumbnail: null, color: "from-red-500 to-orange-500", orderType: "banner" },
          { id: "worship-seminar", name: "세미나·수련회", description: "세미나·수련회·캠프 현수막", thumbnail: null, color: "from-teal-400 to-cyan-500", orderType: "banner" },
          { id: "worship-vbs", name: "성경학교", description: "여름/겨울 성경학교 현수막", thumbnail: null, color: "from-cyan-400 to-blue-500", badge: "HOT", orderType: "banner" },
          { id: "worship-bazaar", name: "바자회·초청", description: "바자회·초청행사 현수막", thumbnail: null, color: "from-pink-400 to-rose-500", orderType: "banner" },
          { id: "worship-event", name: "찬양·체육대회", description: "찬양예배·체육대회 현수막", thumbnail: null, color: "from-emerald-400 to-green-500", orderType: "banner" },
        ],
      },
    ],
  },
  {
    id: "print",
    label: "포스터/전단지/리플렛/엽서",
    icon: "🖨️",
    description: "전단지부터 포스터, 리플렛, 엽서까지 모든 인쇄물을 제작합니다.",
    bannerColor: "from-emerald-600 to-teal-800",
    subs: [
      {
        id: "flyer",
        title: "전단지",
        items: [
          { id: "flyer-single", name: "대량 단면 전단지", description: "1,000매 이상 대량 인쇄, 가성비 최고", thumbnail: null, color: "from-emerald-400 to-green-500", badge: "BEST", startPrice: 30, orderType: "poster" },
          { id: "flyer-double", name: "대량 양면 전단지", description: "양면 풀컬러, 대량 인쇄 전문", thumbnail: null, color: "from-teal-400 to-emerald-500", startPrice: 50, orderType: "poster" },
          { id: "flyer-small", name: "소량 양면 전단지", description: "100매부터 소량 주문 가능", thumbnail: null, color: "from-green-400 to-teal-500", startPrice: 80, orderType: "poster" },
        ],
      },
      {
        id: "poster",
        title: "포스터",
        items: [
          { id: "poster-a3", name: "단면 포스터", description: "A3·A2 사이즈 포스터 인쇄", thumbnail: null, color: "from-orange-400 to-red-500", badge: "BEST", startPrice: 50, orderType: "poster" },
          { id: "poster-large", name: "대형 포스터", description: "A1 이상 대형 사이즈 포스터", thumbnail: null, color: "from-red-400 to-rose-500", startPrice: 200, orderType: "poster" },
        ],
      },
      {
        id: "leaflet",
        title: "리플렛/팜플렛",
        items: [
          { id: "leaflet-2", name: "2단 리플렛", description: "A4 2단 접지, 교회·기관 안내 필수", thumbnail: null, color: "from-violet-400 to-purple-500", startPrice: 80, orderType: "leaflet" },
          { id: "leaflet-3", name: "3단 리플렛", description: "A4 3단 접지, 더 많은 정보 담기", thumbnail: null, color: "from-purple-400 to-indigo-500", startPrice: 100, orderType: "leaflet" },
          { id: "pamphlet", name: "팜플렛(소책자)", description: "중철 제본 소책자, 요람·프로그램북", thumbnail: null, color: "from-indigo-400 to-blue-500", startPrice: 200, orderType: "leaflet" },
        ],
      },
      {
        id: "card",
        title: "엽서/카드",
        items: [
          { id: "postcard", name: "엽서", description: "감사엽서·안내엽서 인쇄", thumbnail: null, color: "from-pink-400 to-rose-500", startPrice: 40, orderType: "poster" },
          { id: "invitation", name: "초대장", description: "행사·예배 초대장 인쇄", thumbnail: null, color: "from-rose-400 to-pink-500", startPrice: 60, orderType: "poster" },
          { id: "program", name: "순서지", description: "예배·행사 순서지 인쇄", thumbnail: null, color: "from-amber-400 to-yellow-500", startPrice: 30, orderType: "poster" },
          { id: "bulletin", name: "주보", description: "주보 디자인 + 인쇄", thumbnail: null, color: "from-blue-400 to-indigo-500", badge: "BEST", startPrice: 30, orderType: "poster" },
          { id: "handbook", name: "요람", description: "교회 요람·안내 책자", thumbnail: null, color: "from-sky-400 to-blue-500", startPrice: 150, orderType: "leaflet" },
        ],
      },
    ],
  },
  {
    id: "sticker",
    label: "스티커",
    icon: "🏷️",
    description: "다양한 재질과 모양의 스티커를 제작합니다.",
    bannerColor: "from-pink-600 to-rose-800",
    subs: [
      {
        id: "sticker-type",
        title: "스티커",
        items: [
          { id: "sticker-single", name: "싱글 규격 스티커", description: "원형·사각 규격 스티커", thumbnail: null, color: "from-pink-400 to-rose-500", badge: "BEST", startPrice: 30, orderType: "sticker" },
          { id: "sticker-custom", name: "싱글 비규격 스티커", description: "자유 형태 칼선 스티커", thumbnail: null, color: "from-rose-400 to-pink-500", startPrice: 50, orderType: "sticker" },
          { id: "sticker-sheet", name: "판스티커", description: "한 판에 여러 스티커, 이벤트 굿즈용", thumbnail: null, color: "from-fuchsia-400 to-pink-500", startPrice: 100, orderType: "sticker" },
          { id: "sticker-roll", name: "롤스티커", description: "롤 형태 스티커, 대량 부착용", thumbnail: null, color: "from-violet-400 to-fuchsia-500", startPrice: 20, orderType: "sticker" },
          { id: "sticker-clear", name: "투명 스티커", description: "투명 PET 재질 스티커", thumbnail: null, color: "from-sky-400 to-cyan-500", startPrice: 40, orderType: "sticker" },
          { id: "sticker-floor", name: "바닥 스티커", description: "바닥 부착용 미끄럼방지 스티커", thumbnail: null, color: "from-amber-400 to-orange-500", startPrice: 500, orderType: "sticker" },
          { id: "sticker-lettering", name: "레터링 스티커", description: "글씨 모양 칼선 스티커", thumbnail: null, color: "from-purple-400 to-violet-500", startPrice: 100, orderType: "sticker" },
        ],
      },
      {
        id: "signage",
        title: "실사·광고물",
        items: [
          { id: "tinting", name: "썬팅·광고", description: "유리창 광고용 시트지", thumbnail: null, color: "from-gray-400 to-slate-500", startPrice: 5000, orderType: "inquiry" },
          { id: "sheet-vinyl", name: "시트지", description: "인테리어·사인용 시트지", thumbnail: null, color: "from-slate-400 to-gray-500", startPrice: 3000, orderType: "inquiry" },
          { id: "magnet-sticker", name: "자석 스티커", description: "차량용 자석 스티커", thumbnail: null, color: "from-zinc-400 to-gray-500", startPrice: 5000, orderType: "inquiry" },
        ],
      },
    ],
  },
  {
    id: "namecard",
    label: "명함/쿠폰",
    icon: "💳",
    description: "명함, 전도명함, 쿠폰을 깔끔하게 제작합니다.",
    bannerColor: "from-amber-600 to-orange-800",
    subs: [
      {
        id: "namecard-type",
        title: "명함",
        items: [
          { id: "namecard-basic", name: "기본 명함", description: "스노우지·아트지 기본 명함", thumbnail: null, color: "from-amber-400 to-orange-500", badge: "BEST", startPrice: 1500, orderType: "namecard" },
          { id: "namecard-evangel", name: "전도 명함", description: "교회 전도용 명함 디자인", thumbnail: null, color: "from-orange-400 to-red-500", startPrice: 1500, orderType: "namecard" },
          { id: "namecard-premium", name: "고급 명함", description: "펄지·크라프트지·박 인쇄", thumbnail: null, color: "from-yellow-500 to-amber-600", badge: "NEW", startPrice: 3000, orderType: "namecard" },
        ],
      },
      {
        id: "coupon-type",
        title: "쿠폰/도장",
        items: [
          { id: "coupon", name: "쿠폰", description: "할인쿠폰·이벤트 쿠폰 인쇄", thumbnail: null, color: "from-red-400 to-rose-500", startPrice: 2000, orderType: "namecard" },
          { id: "stamp-card", name: "도장쿠폰", description: "도장 적립 카드 인쇄", thumbnail: null, color: "from-rose-400 to-pink-500", startPrice: 2000, orderType: "namecard" },
        ],
      },
      {
        id: "envelope-type",
        title: "봉투",
        items: [
          { id: "env-church", name: "교회 봉투", description: "헌금봉투·감사봉투 인쇄", thumbnail: null, color: "from-blue-400 to-indigo-500", badge: "BEST", startPrice: 50, orderType: "envelope" },
          { id: "env-thanks", name: "감사 봉투", description: "감사·축하 봉투 인쇄", thumbnail: null, color: "from-emerald-400 to-teal-500", startPrice: 60, orderType: "envelope" },
          { id: "env-tithe", name: "십일조 봉투", description: "십일조 전용 봉투 인쇄", thumbnail: null, color: "from-violet-400 to-purple-500", startPrice: 50, orderType: "envelope" },
          { id: "env-standard", name: "각대 봉투", description: "일반 각대 봉투 인쇄", thumbnail: null, color: "from-gray-400 to-slate-500", startPrice: 80, orderType: "envelope" },
        ],
      },
    ],
  },
  {
    id: "church",
    label: "교회용품",
    icon: "⛪",
    description: "교패, 명찰, 표찰, 거치대 등 교회에서 필요한 모든 용품을 제작합니다.",
    bannerColor: "from-violet-600 to-purple-800",
    subs: [
      {
        id: "church-item",
        title: "교회용품",
        items: [
          { id: "church-plaque", name: "교패", description: "교회 로고·명칭 교패 제작", thumbnail: null, color: "from-violet-400 to-purple-500", startPrice: 30000, orderType: "inquiry" },
          { id: "church-nametag", name: "명찰", description: "직분자·성가대 명찰", thumbnail: null, color: "from-purple-400 to-indigo-500", startPrice: 2000, orderType: "inquiry" },
          { id: "church-sign", name: "교회표찰", description: "교회 외부 안내 표찰", thumbnail: null, color: "from-indigo-400 to-blue-500", startPrice: 20000, orderType: "inquiry" },
          { id: "church-etc", name: "기타 교회용품", description: "기타 맞춤 교회용품", thumbnail: null, color: "from-blue-400 to-violet-500", orderType: "inquiry" },
        ],
      },
      {
        id: "sash-flag",
        title: "어깨띠·깃발",
        items: [
          { id: "sash", name: "부직포 어깨띠", description: "행사·환영 어깨띠", thumbnail: null, color: "from-red-400 to-rose-500", startPrice: 3000, orderType: "inquiry" },
          { id: "flag", name: "근조 깃발", description: "근조기·조기 제작", thumbnail: null, color: "from-gray-500 to-slate-600", startPrice: 15000, orderType: "inquiry" },
        ],
      },
      {
        id: "stand",
        title: "배너 거치대",
        items: [
          { id: "stand-indoor", name: "실내형 거치대", description: "실내 배너 거치대", thumbnail: null, color: "from-teal-400 to-cyan-500", startPrice: 15000, orderType: "inquiry" },
          { id: "stand-outdoor", name: "실외형 거치대", description: "야외용 배너 거치대", thumbnail: null, color: "from-cyan-400 to-blue-500", startPrice: 25000, orderType: "inquiry" },
          { id: "stand-large", name: "대형 거치대", description: "대형 배너/현수막 거치대", thumbnail: null, color: "from-blue-400 to-indigo-500", startPrice: 40000, orderType: "inquiry" },
        ],
      },
      {
        id: "bg",
        title: "배경",
        items: [
          { id: "bg-banner", name: "현수막 배경", description: "교회 예배실 현수막 배경", thumbnail: null, color: "from-amber-400 to-yellow-500", orderType: "banner" },
          { id: "bg-simple", name: "간단배경 모음", description: "간결한 배경 디자인 모음", thumbnail: null, color: "from-sky-400 to-blue-500", orderType: "banner" },
          { id: "bg-motto", name: "표어", description: "교회 연간 표어 현수막", thumbnail: null, color: "from-emerald-400 to-green-500", orderType: "banner" },
          { id: "bg-art", name: "성화·환영", description: "성화 일러스트·환영 문구", thumbnail: null, color: "from-rose-400 to-pink-500", orderType: "banner" },
          { id: "bg-timetable", name: "시간표", description: "예배 시간표 안내 현수막", thumbnail: null, color: "from-orange-400 to-amber-500", orderType: "banner" },
        ],
      },
    ],
  },
  {
    id: "promo",
    label: "판촉물",
    icon: "🎁",
    description: "전도용 티슈, 판촉물, 단체 티셔츠 등 다양한 홍보 아이템을 제작합니다.",
    bannerColor: "from-red-600 to-rose-800",
    subs: [
      {
        id: "evangel",
        title: "전도용품",
        items: [
          { id: "tissue-paper", name: "종이티슈", description: "교회명 인쇄 포켓 티슈", thumbnail: null, color: "from-sky-400 to-blue-500", badge: "BEST", startPrice: 200, orderType: "inquiry" },
          { id: "tissue-wet", name: "물티슈", description: "교회명 인쇄 물티슈", thumbnail: null, color: "from-cyan-400 to-teal-500", startPrice: 300, orderType: "inquiry" },
          { id: "tissue-box", name: "각티슈", description: "박스형 교회 각티슈", thumbnail: null, color: "from-blue-400 to-indigo-500", startPrice: 800, orderType: "inquiry" },
          { id: "cleaner", name: "청소박사", description: "전도용 다용도 클리너", thumbnail: null, color: "from-emerald-400 to-green-500", startPrice: 500, orderType: "inquiry" },
          { id: "promo-etc", name: "기타 전도용품", description: "기타 전도용 맞춤 제작", thumbnail: null, color: "from-violet-400 to-purple-500", orderType: "inquiry" },
        ],
      },
      {
        id: "promo-item",
        title: "판촉물",
        items: [
          { id: "tshirt", name: "단체 티셔츠", description: "교회·단체 로고 티셔츠", thumbnail: null, color: "from-red-400 to-rose-500", badge: "HOT", startPrice: 8000, orderType: "inquiry" },
          { id: "summer-promo", name: "여름 홍보/판촉", description: "부채·아이스팩 등 여름 시즌", thumbnail: null, color: "from-orange-400 to-amber-500", startPrice: 500, orderType: "inquiry" },
          { id: "home-item", name: "가정/생활용품", description: "텀블러·에코백·수건 등", thumbnail: null, color: "from-amber-400 to-yellow-500", startPrice: 2000, orderType: "inquiry" },
          { id: "kitchen-item", name: "보틀/주방용품/식품", description: "보틀·머그컵·식품류", thumbnail: null, color: "from-green-400 to-teal-500", startPrice: 3000, orderType: "inquiry" },
          { id: "stationery", name: "필기구/사무문구", description: "볼펜·노트·메모지", thumbnail: null, color: "from-gray-400 to-slate-500", startPrice: 500, orderType: "inquiry" },
        ],
      },
    ],
  },
];

// ── 유틸: 카테고리 ID로 찾기 ──
export function getCategoryById(id: string): Category | undefined {
  return PRODUCT_CATEGORIES.find((c) => c.id === id);
}

// ── 유틸: 제품 ID로 찾기 ──
export function getProductById(productId: string): { category: Category; sub: SubCategory; product: ProductItem } | undefined {
  for (const cat of PRODUCT_CATEGORIES) {
    for (const sub of cat.subs) {
      const product = sub.items.find((p) => p.id === productId);
      if (product) return { category: cat, sub, product };
    }
  }
  return undefined;
}
