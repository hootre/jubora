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
import LibraryAddCheckOutlinedIcon from '@mui/icons-material/LibraryAddCheckOutlined';
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
import { useProductsCategory } from 'hooks/templates/useProductsCategory';
import { useIsHeaderScrollActive } from 'store';
import { useScroll } from 'hooks/custom/useScroll';
import { useEffect } from 'react';
export const Header = () => {
  // user상태관리
  const { useGetUserInfo, useLogOut } = useUser();
  const { data: user, isLoading: userLoading } = useGetUserInfo();
  const { mutate } = useLogOut();
  // productCategory 관리
  const { useGetProductsCategory } = useProductsCategory();
  const { data: category, isLoading: categoryLoading } = useGetProductsCategory();
  // path 관련
  const pathName = usePathname().substring(1).split('/')[0];
  let navCutLine =
    pathName === 'templates'
      ? 1
      : pathName === 'order'
      ? 2
      : pathName === 'sian'
      ? 3
      : pathName === 'price'
      ? 4
      : pathName === 'notify'
      ? 5
      : 0;
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
  if (categoryLoading || userLoading) {
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
                    <li className="item">
                      <Link href="/admin">관리자페이지</Link>
                    </li>
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
                  <Link
                    href="/templates/banner_row"
                    className={pathName === 'templates' ? 'active' : ''}
                  >
                    현수막
                  </Link>
                </li>
                <li className="banner_col">
                  <Link
                    href="/templates/banner_row"
                    className={pathName === 'templates' ? 'active' : ''}
                  >
                    배너
                  </Link>
                </li>
                <li className="print">
                  <Link
                    href="/templates/banner_row"
                    className={pathName === 'sian' ? 'active' : ''}
                  >
                    인쇄물
                  </Link>
                </li>
                <li className="real">
                  <Link
                    href="/templates/banner_row"
                    className={pathName === 'price' ? 'active' : ''}
                  >
                    실사
                  </Link>
                </li>
                <div
                  className={pathName === '' ? 'non lineBox ' : 'lineBox'}
                  style={{ left: `${navCutLine * 160}px` }}
                ></div>

                <div className="drop_down_container">
                  {/* <div className="menu_all">
                  <h1>첫번째 메뉴</h1>
                </div> */}

                  <div className="nav_item menu_benner">
                    {category
                      .filter((item) => item.from_nav === 'banner')
                      .map((item) => (
                        <div className="nav_menu_item">
                          <h1>{item.title}</h1>
                          <ul>
                            {item.category_list.split(',').map((text) => (
                              <li>{text}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                  </div>

                  <div className="nav_item menu_print">
                    {category
                      .filter((item) => item.from_nav === 'print')
                      .map((item) => (
                        <div className="nav_menu_item">
                          <h1>{item.title}</h1>
                          <ul>
                            {item.category_list.split(',').map((text) => (
                              <li>{text}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                  </div>

                  <div className="nav_item menu_real">
                    {category
                      .filter((item) => item.from_nav === 'real')
                      .map((item) => (
                        <div className="nav_menu_item">
                          <h1>{item.title}</h1>
                          <ul>
                            {item.category_list.split(',').map((text) => (
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
                  <LibraryAddCheckOutlinedIcon />
                  시안확인
                </li>
                <li>
                  <PaymentOutlinedIcon />
                  개인결제
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Header_container>
  );
};
