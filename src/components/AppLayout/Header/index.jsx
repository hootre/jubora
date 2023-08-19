'use client';
import React, { useState } from 'react';
import logo from 'assets/MainPage/logo.png';
import Image from 'next/image';
import Link from 'next/link';
import { PaymentModal } from 'components/common/Modal/PaymentModal';
import { MypageModal } from 'components/common/Modal/MypageModal';
import { usePathname } from 'next/navigation';
import { HeaderSearchInput } from './HeaderSearchInput';
import { Header_container } from './style.jsx';
import LibraryAddCheckOutlinedIcon from '@mui/icons-material/LibraryAddCheckOutlined';
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';

import { useScroll } from 'hooks/custom/useScroll';
import { useEffect } from 'react';
import { useUser } from 'hooks/supabase/auth/useUser';
import { useProductsTag } from 'hooks/supabase/public/useProductsCategory';
export const Header = () => {
  // user상태관리
  const { useGetUserInfo, useLogOut } = useUser();
  const { data: user, isLoading: userLoading } = useGetUserInfo();
  const { mutate } = useLogOut();
  // productCategory 관리
  const { useGetProductsTag } = useProductsTag();
  const { data: tag, isLoading: tagLoading } = useGetProductsTag();
  // path 관련
  const pathName = usePathname().substring(1).split('/')[1];
  let navCutLine =
    pathName === 'banner' ? 0 : pathName === 'print' ? 1 : pathName === 'real' ? 2 : -3;
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

  // scroll event
  const { scrollY } = useScroll();
  const [ScrollActive, setScrollActive] = useState(false);
  useEffect(() => {
    if (scrollY > 120) {
      setScrollActive(true);
    } else {
      setScrollActive(false);
    }
  }, [scrollY]);
  if (tagLoading || userLoading) {
    return <h1>Loading</h1>;
  }
  return (
    <Header_container ScrollActive={ScrollActive}>
      <div className="prev_site">
        <img src="https://siloamdesign.com/data/banner/22050210574177.jpg" alt="" />
      </div>
      <div className="header container">
        <div className="nav_container">
          <div className="header_top">
            <Link href="/">
              <Image src={logo} alt="img" />
            </Link>
            <HeaderSearchInput />
            <div className="sub_container">
              <div className="login">
                <ul>
                  {user?.role === 'admin' && (
                    <>
                      <li className="item">
                        <Link href="/admin/main">관리자페이지</Link>
                      </li>
                      <li className="item">
                        <span></span>
                      </li>
                    </>
                  )}
                  {user?.id && (
                    <>
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
                          <MypageModal
                            user={user}
                            signOut={mutate}
                            toggleIsMypage={toggleIsMypage}
                          />
                        )}
                      </li>
                    </>
                  )}
                  {!user?.id && (
                    <>
                      <li className="item">
                        <Link href="/auth/signin">로그인</Link>
                      </li>
                      <li className="item">
                        <span></span>
                      </li>
                      <li className="item">
                        <Link href="/auth/signup">회원가입</Link>
                      </li>
                    </>
                  )}
                  <li className="item">
                    <span></span>
                  </li>
                  <li className="item">
                    <Link href="/auth/signup">주문내역</Link>
                  </li>
                  <li className="item">
                    <span></span>
                  </li>
                  <li className="item">
                    <Link href="/auth/signup">고객센터</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="full_line"></div>
          </div>
          {ScrollActive && <div className="temp_nav"></div>}
          <div className="nav_box">
            <div>
              <ul className="nav">
                <li className="benner">
                  <Link href="/templates/banner" className={pathName === 'banner' ? 'active' : ''}>
                    현수막
                  </Link>
                </li>
                {/* <li className="banner_col">
                  <Link
                    href="/templates/banner_row"
                    className={pathName === 'templates' ? 'active' : ''}
                  >
                    배너
                  </Link>
                </li> */}
                <li className="print">
                  <Link href="/templates/print" className={pathName === 'print' ? 'active' : ''}>
                    인쇄물
                  </Link>
                </li>
                <li className="real">
                  <Link href="/templates/real" className={pathName === 'real' ? 'active' : ''}>
                    실사
                  </Link>
                </li>
                <div
                  className={navCutLine >= 0 ? 'lineBox ' : 'lineBox non'}
                  style={{ left: `${navCutLine * 160}px` }}
                ></div>

                <div className="drop_down_container">
                  {/* <div className="menu_all">
                  <h1>첫번째 메뉴</h1>
                </div> */}

                  <div className="nav_item menu_benner">
                    {tag
                      .filter((item) => item.from_nav === 'banner')
                      .map((item) => (
                        <div key={item.id} className="nav_menu_item">
                          <h1>{item.title}</h1>
                          <ul>
                            {item.category_list.list.map((text) => (
                              <li>{text}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                  </div>

                  <div className="nav_item menu_print">
                    {tag
                      .filter((item) => item.from_nav === 'print')
                      .map((item) => (
                        <div key={item.id} className="nav_menu_item">
                          <h1>{item.title}</h1>
                          <ul>
                            {item.category_list.list.map((text) => (
                              <li>{text}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                  </div>

                  <div className="nav_item menu_real">
                    {tag
                      .filter((item) => item.from_nav === 'real')
                      .map((item) => (
                        <div key={item.id} className="nav_menu_item">
                          <h1>{item.title}</h1>
                          <ul>
                            {item.category_list.list.map((text) => (
                              <li>{text}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                  </div>
                </div>
              </ul>
              <ul className="sian_box">
                <li>
                  <Link href="/mypage/my_modify" className="basic_flex">
                    <LibraryAddCheckOutlinedIcon />
                    시안확인
                  </Link>
                </li>
                <li>
                  <Link href="/mypage/my_modify" className="basic_flex">
                    <PaymentOutlinedIcon />
                    개인결제
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Header_container>
  );
};
