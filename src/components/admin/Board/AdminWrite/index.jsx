'use client';

import { crudlist } from 'assets/data';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import WriteContainer from './styles';

function AdminWrite({ children }) {
  // path 관련
  const pathname = usePathname().substring(1).split('/')[3];
  return (
    <WriteContainer>
      <div className="table_select_box">
        <h1>게시판 선택</h1>
        <div className="board_link_box">
          {crudlist.map((item) => (
            <div
              key={item.text}
              className={pathname === item.pathname ? 'board_link active' : 'board_link'}
            >
              <Link href={`/admin/board/write/${item.pathname}`}>{item.text}</Link>
            </div>
          ))}
        </div>
      </div>
      {children}
    </WriteContainer>
  );
}
export default AdminWrite;
