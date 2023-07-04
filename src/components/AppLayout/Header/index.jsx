'use client';
import React, { useState } from 'react';
import logo from 'assets/MainPage/logo.png';
import Image from 'next/image';
import Link from 'next/link';
import { PaymentModal } from 'components/common/Modal/PaymentModal';
import { MypageModal } from 'components/common/Modal/MypageModal';
import { usePathname } from 'next/navigation';
import { useUser } from 'hooks/auth/useUser';
import { HeaderSearchInput } from './HeaderSearchInput';
import { Header_container } from './style.jsx';
export const Header = () => {
  // user상태관리
  const { useGetUserInfo, useLogOut } = useUser();
  const { data: user } = useGetUserInfo();
  const { mutate } = useLogOut();
  // path 관련
  const pathName = usePathname().substring(1).split('/')[0];
  let navCutLine =
    pathName === 'templates'
      ? 0
      : pathName === 'order'
      ? 1
      : pathName === 'sian'
      ? 2
      : pathName === 'price'
      ? 3
      : pathName === 'notify'
      ? 4
      : -5;
  // 로그인on상태에서 toggle Nav
  const [isPayment, setIsPayment] = useState(false);
  const [isMypage, setIsMypage] = useState(false);
  const toggleIsPayment = () => {
    setIsMypage(false);
    setIsPayment((prev) => !prev);
  };
  const toggleIsMypage = () => {
    setIsPayment(false);
    setIsMypage((prev) => !prev);
  };
  // if (user === undefined) {
  //   return (
  //     <header className="header_container">
  //       <div id="header"></div>
  //     </header>
  //   );
  // }
  return (
    <Header_container>
      <div id="header">
        <div id="navBox">
          <Link href="/">
            <Image src={logo} alt="img" />
          </Link>
          <ul className="nav">
            <li>
              <Link
                href="/templates/banner_row"
                className={pathName === 'templates' ? 'active' : ''}
              >
                현수막/배너
              </Link>
            </li>
            <li>
              <Link href="/order" className={pathName === 'order' ? 'active' : ''}>
                접수확인
              </Link>
            </li>
            <li>
              <Link href="/sian" className={pathName === 'sian' ? 'active' : ''}>
                시안보기
              </Link>
            </li>
            <li>
              <Link href="/price" className={pathName === 'price' ? 'active' : ''}>
                가격안내
              </Link>
            </li>
            <li>
              <Link href="/notify" className={pathName === 'notify' ? 'active' : ''}>
                공지사항
              </Link>
            </li>
            <div
              className="lineBox"
              style={{ left: `${navCutLine === -5 ? -1200 : navCutLine * 110}px` }}
            ></div>
          </ul>
        </div>
        <div id="subBox">
          <HeaderSearchInput />
          <div className="login">
            {user?.role === 'admin' && (
              <ul>
                <li className="item">
                  <Link href="/admin">관리자페이지</Link>
                </li>
              </ul>
            )}
            {user && (
              <ul>
                <li className="item">
                  <a onClick={toggleIsPayment}>결제정보</a>
                  {isPayment && <PaymentModal toggleIsPayment={toggleIsPayment} />}
                </li>
                <li className="item">
                  <span></span>
                </li>
                <li className="item">
                  <a onClick={toggleIsMypage}>마이페이지</a>
                  {isMypage && (
                    <MypageModal user={user} signOut={mutate} toggleIsMypage={toggleIsMypage} />
                  )}
                </li>
              </ul>
            )}
            {!user && (
              <ul>
                <li className="item">
                  <Link href="/auth/signin">로그인</Link>
                </li>
                <li className="item">
                  <span></span>
                </li>
                <li className="item">
                  <Link href="/auth/signup">회원가입</Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </Header_container>
  );
};
