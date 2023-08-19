import React from 'react';
import { SideNav_container } from './style';
import Link from 'next/link';

export const SideNav = () => {
  return (
    <SideNav_container>
      <ul>
        <li>
          <Link href="/admin/main">메인화면</Link>
        </li>
        <li>
          <Link href="/admin/templates">제품관련</Link>
        </li>
        <li>
          <Link href="/admin/user">사용자 관련</Link>
        </li>
        <li>
          <Link href="/admin/userPage">마이페이지 관련</Link>
        </li>
      </ul>
    </SideNav_container>
  );
};
