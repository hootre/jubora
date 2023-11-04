import React from 'react';
import { SideNav_container } from './style';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import ViewWeekIcon from '@mui/icons-material/ViewWeek';
import { crudlist } from 'assets/data';
export const SideNav = () => {
  // path 관련
  const pathname = usePathname().substring(1).split('/')[3];
  return (
    <SideNav_container>
      <div className="nav_list">
        <div className="community">
          <h1>종합 관리</h1>
          <div className="community_item ">
            <InsertChartIcon className="icon dashboard" />
            <Link href="/admin/dashboard">대시보드</Link>
          </div>
          <div className="community_item ">
            <PeopleAltIcon className="icon member" />
            <Link href="/admin/user">회원 관리</Link>
          </div>
        </div>
        <div className="community">
          <h1>게시글 관리</h1>
          {crudlist.map((item, idx) => (
            <div key={idx} className={pathname === item.pathname ? 'item active' : 'item'}>
              {item.icon}
              <Link href={`/admin/board/write/${item.pathname}`}>{item.text}</Link>
            </div>
          ))}
        </div>
      </div>
    </SideNav_container>
  );
};
