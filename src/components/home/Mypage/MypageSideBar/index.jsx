'use client';

import Link from 'next/link';
import User from 'hooks/supabase/auth/useUser';
import MainLoading from 'components/Loading/MainLoading';
import { usePathname } from 'next/navigation';
import MypageSideBarContainer from './style';

export default function MypageSideBar() {
  // 유저 정보
  const { useGetUserInfo } = User();
  const { data: userData, isLoading } = useGetUserInfo();

  // path 관련
  const pathName = usePathname().substring(1).split('/')[2];
  if (isLoading) {
    return <MainLoading />;
  }
  return (
    <MypageSideBarContainer>
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
          <div className={pathName === 'my_payment' ? 'active' : ''}>
            <Link href="/home/mypage/my_payment">
              <h1>결제내역</h1>
            </Link>
          </div>
        </div>
      </div>
    </MypageSideBarContainer>
  );
}
