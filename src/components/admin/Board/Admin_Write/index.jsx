'use client';
import { crudlist } from 'assets/data';
import { Write_contaier } from './styles';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Admin_Write = ({ children }) => {
  // path 관련
  const pathname = usePathname().substring(1).split('/')[3];
  return (
    <Write_contaier>
      <div className="table_select_box">
        <h1>게시판 선택</h1>
        <div className="board_link_box">
          {crudlist.map((item, idx) => (
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
