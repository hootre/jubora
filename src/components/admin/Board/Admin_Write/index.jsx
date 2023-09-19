'use client';
import { Write_contaier } from './styles';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Admin_Write = ({ children }) => {
  // path 관련
  const pathName = usePathname().substring(1).split('/')[3];
  console.log(pathName);
  return (
    <Write_contaier className="C_container">
      <div className="table_select_box">
        <h1>게시판 선택</h1>
        <div className="board_link_box">
          <div className={pathName === 'notice' ? 'board_link active' : 'board_link'}>
            <Link href="/admin/board/write/notice">공지사항</Link>
          </div>
          <div className={pathName === 'question' ? 'board_link active' : 'board_link'}>
            <Link href="/admin/board/write/question">자주묻는 질문</Link>
          </div>
          <div className={pathName === 'sian' ? 'board_link active' : 'board_link'}>
            <Link href="/admin/board/write/sian">시안확인</Link>
          </div>
        </div>
      </div>
      {children}
    </Write_contaier>
  );
};
