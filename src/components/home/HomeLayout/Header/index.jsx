'use client';
import React, { useState } from 'react';
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
import { useTemplatesActions } from 'store';
import { TextDropdown } from 'components/common/TextDropdown';
import { useMainSettingImage } from 'hooks/supabase/main/settingImage/useSettingImage';
import { Skeleton } from '@mui/material';
import { headerMainNavList, headerNoticeTextList } from 'assets/data';
import { useTemplatesTag } from 'hooks/supabase/templatesTag/useTemplatesTag';

export const Header = () => {
  // user상태관리
  const { useGetUserInfo, useLogOut } = useUser();
  const { data: user, isLoading: userLoading } = useGetUserInfo();
  const { mutate } = useLogOut();
  // useTemplatesTag 관리
  const { useGetTemplatesTag } = useTemplatesTag();
  const { data: tag, isLoading: tagLoading } = useGetTemplatesTag();
  // path 관련
  const pathname = usePathname().substring(1).split('/')[1];
  let navCutLine =
    pathname === 'banner' ? 0 : pathname === 'print' ? 1 : pathname === 'real' ? 2 : -3;
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

  //Auth Modal 관련
  // zustand
  const { setAuthState, setTemplateTagList } = useTemplatesActions();
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
  // 해더 이미지 가져오기
  const { useGetMainSettingImage } = useMainSettingImage();
  const { data: MainSettingImageData, isLoading: imageLoading } = useGetMainSettingImage();
  let logoImage, topImage;

  if (tagLoading || userLoading || imageLoading) {
    return (
      <Skeleton variant="rectangular" width="100%">
        <div style={{ height: '200px' }} />
      </Skeleton>
    );
  }
  MainSettingImageData.map((item) => {
    if (item.position === 'logo') {
      logoImage = item.image;
    } else if (item.position === 'top') {
      topImage = item.image;
    }
  });
  return (
    <Header_container ScrollActive={ScrollActive}>
      <div className="prev_site">
        <img src={topImage} alt="topImage" />
      </div>
      <div className="header C_container">
        <div className="nav_container">
          <div className="header_top">
            <Link href="/">
              <img src={logoImage} alt="logo" />
            </Link>
            <HeaderSearchInput />
            <div className="sub_container">
              <div className="login">
                <ul>
                  {user?.role === 'admin' && (
                    <>
                      <li className="item">
                        <Link href="/admin/dashboard">관리자페이지</Link>
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
                        <a onClick={setAuthState}>로그인/회원가입</a>
                      </li>
                    </>
                  )}
                  <li className="item">
                    <span></span>
                  </li>
                  <li className="item">
                    <TextDropdown title="고객센터" dropdownText={headerNoticeTextList} />
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
                {headerMainNavList.map((item) => (
                  <li className={item.pathname} key={item.id}>
                    <Link
                      href={`/home/templates/${item.pathname}`}
                      className={pathname === item.pathname ? 'active' : ''}
                    >
                      {item.text}
                    </Link>
                  </li>
                ))}
                <div
                  className={navCutLine >= 0 ? 'lineBox ' : 'lineBox non'}
                  style={{ left: `${navCutLine * 160}px` }}
                ></div>

                {/*메뉴 출력  */}
                <div className="drop_down_container">
                  <div className="nav_item menu_benner">
                    {tag
                      .filter((item) => item.from_nav === 'banner')
                      .map((item) => (
                        <div key={item.id} className="nav_menu_item">
                          <h1>{item.title}</h1>
                          <ul>
                            {item.tagList.list.map((text) => (
                              <li
                                key={text}
                                onClick={() => {
                                  setTemplateTagList(text);
                                }}
                              >
                                <Link href={'/home/templates/banner'}>{text}</Link>
                              </li>
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
                            {item.tagList.list.map((text) => (
                              <li
                                key={text}
                                onClick={() => {
                                  setTemplateTagList(text);
                                }}
                              >
                                <Link href={'/home/templates/print'}>{text}</Link>
                              </li>
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
                            {item.tagList.list.map((text) => (
                              <li
                                key={text}
                                onClick={() => {
                                  setTemplateTagList(text);
                                }}
                              >
                                <Link href={'/home/templates/real'}>{text}</Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                  </div>
                </div>
              </ul>
              <ul className="sian_box">
                <li>
                  <Link href="/home/mypage/my_modify" className="C_basic_flex">
                    <LibraryAddCheckOutlinedIcon />
                    시안확인
                  </Link>
                </li>
                <li>
                  <Link href="/home/mypage/my_modify" className="C_basic_flex">
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
