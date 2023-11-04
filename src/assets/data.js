import ViewWeekIcon from '@mui/icons-material/ViewWeek';
import WebIcon from '@mui/icons-material/Web';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import DatasetIcon from '@mui/icons-material/Dataset';

// 주문페이지 기본 셋팅
export const order_setting_for = [
  'item_1',
  'item_2',
  'item_3',
  'item_4',
  'item_5',
  'item_6',
  'item_7',
];

// 어드민 사용
export const crudlist = [
  {
    icon: <DatasetIcon className="icon orderSetting" />,
    pathname: 'orderSetting',
    text: '주문 구성',
  },
  { icon: <ViewWeekIcon className="icon templates" />, pathname: 'templates', text: '제품등록' },
  {
    icon: <ViewWeekIcon className="icon templates" />,
    pathname: 'templatesTag',
    text: '제품 필터목록',
  },
  { icon: <WebIcon className="icon main" />, pathname: 'mainSlides', text: '메인 슬라이드' },
  { icon: <WebIcon className="icon main" />, pathname: 'mainTemplatesCard', text: '메인 상품카드' },
  {
    icon: <WebIcon className="icon main" />,
    pathname: 'mainSettingImage',
    text: '메인 구성이미지',
  },
  { icon: <ContentPasteIcon className="icon board" />, pathname: 'notice', text: '공지사항' },
  {
    icon: <ContentPasteIcon className="icon board" />,
    pathname: 'question',
    text: '자주묻는 질문',
  },
  { icon: <ContentPasteIcon className="icon board" />, pathname: 'sian', text: '시안확인' },
];
// 헤더 사용
export const headerNoticeTextList = [
  {
    text: '공지사항',
    href: '/home/center/notice',
  },

  {
    text: '자주 묻는 질문',
    href: '/home/center/question',
  },

  {
    text: 'Q&A',
    href: '/home/center/qna',
  },
];
export const headerMainNavList = [
  {
    text: '현수막',
    pathname: 'banner',
  },

  {
    text: '인쇄물',
    pathname: 'print',
  },

  {
    text: '실사',
    pathname: 'real',
  },
];
