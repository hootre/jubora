'use client';
import { Write_contaier } from './styles';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Admin_Write = ({ children }) => {
  const nav_list = [
    { pathname: 'mainSlides', text: '메인 슬라이드' },
    { pathname: 'mainTemplatesCard', text: '메인 상품카드' },
    { pathname: 'mainSettingImage', text: '메인페이지 구성 이미지' },
    { pathname: 'templates', text: '제품등록' },
    { pathname: 'templatesFilters', text: '제품 필터목록' },
    { pathname: 'notice', text: '공지사항' },
    { pathname: 'question', text: '자주묻는 질문' },
    { pathname: 'sian', text: '시안확인' },
  ];
  // path 관련
  const pathname = usePathname().substring(1).split('/')[3];
  return (
    <Write_contaier className="C_container">
      <div className="table_select_box">
        <h1>게시판 선택</h1>
        <div className="board_link_box">
          {nav_list.map((item, idx) => (
            <div
              key={idx}
              className={pathname === item.pathname ? 'board_link active' : 'board_link'}
            >
              <Link href={`/admin/board/write/${item.pathname}`}>{item.text}</Link>
            </div>
          ))}
        </div>
      </div>
      {children}
    </Write_contaier>
  );
};
