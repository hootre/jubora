'use client';
import React from 'react';
import { MypageSideBar_container } from './style';
import Link from 'next/link';
import { useUser } from 'hooks/supabase/auth/useUser';
import { usePathname } from 'next/navigation';

export const MypageSideBar = () => {
  // 유저 정보
  const { useGetUserInfo } = useUser();
  const { data: userData, isLoading } = useGetUserInfo();

  // path 관련
  const pathName = usePathname().substring(1).split('/')[1];
  if (isLoading) {
    return <h1>Loading</h1>;
  }
  return (
    <MypageSideBar_container>
      <div className="nav_box">
        {userData?.id ? (
          <div className="name_box">
            <h1 className="class">{userData.role}</h1>
            <div className="name">
              <span>{userData.name}</span>님
            </div>
          </div>
        ) : (
          <div className="name_box">
            <div className="name">
              <span className="noLogin_text">----</span>
            </div>
          </div>
        )}

        <div className="content_list">
          <div className={pathName === 'my_info' ? 'active' : ''}>
            <Link href="/home/mypage/my_info">
              <h1>내 정보</h1>
            </Link>
          </div>
          <div className={pathName === 'my_modify' ? 'active' : ''}>
            <Link href="/home/mypage/my_modify">
              <h1>시안확인</h1>
            </Link>
          </div>
          <div className={pathName === 'my_order' ? 'active' : ''}>
            <Link href="/home/mypage/my_order">
              <h1>주문내역</h1>
            </Link>
          </div>
          <div className={pathName === 'my_pay' ? 'active' : ''}>
            <Link href="/home/mypage/my_pay">
              <h1>결제내역</h1>
            </Link>
          </div>
        </div>
      </div>
    </MypageSideBar_container>
  );
};
