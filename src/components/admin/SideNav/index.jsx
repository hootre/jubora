import React from 'react';
import { SideNav_container } from './style';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import logo from 'assets/MainPage/logo.png';
import Image from 'next/image';

export const SideNav = () => {
  // path 관련
  const pathName = usePathname().substring(1).split('/')[1];
  return (
    <SideNav_container>
      <div className="logo">
        <Link href="/">
          <Image src={logo} alt="admin_logo" width={100} />
        </Link>
      </div>
      <div className="nav_list">
        <div className={pathName === 'dashboard' ? 'active' : ''}>
          <Link href="/admin/dashboard">종합 화면</Link>
        </div>
        <div className={pathName === 'user' ? 'active' : ''}>
          <Link href="/admin/user">사용자</Link>
        </div>
        <div className={pathName === 'board' ? 'active' : ''}>
          <Link href="/admin/board">게시판</Link>
        </div>
      </div>
    </SideNav_container>
  );
};
