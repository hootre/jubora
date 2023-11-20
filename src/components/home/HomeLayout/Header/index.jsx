'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import MypageModal from 'components/common/Modal/MypageModal';
import { usePathname } from 'next/navigation';
import LibraryAddCheckOutlinedIcon from '@mui/icons-material/LibraryAddCheckOutlined';
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';

import useScroll from 'hooks/custom/useScroll';
import User from 'hooks/supabase/auth/useUser';
import { useTemplatesActions } from 'store';
import TextDropdown from 'components/common/TextDropdown';
import useTemplatesTag from 'hooks/supabase/templatesTag/useTemplatesTag';

import MainLoading from 'components/Loading/MainLoading';
import { v4 } from 'uuid';
import { headerMainNavList, headerNoticeTextList } from '../../../../../public/data';
import HeaderSearchInput from './HeaderSearchInput';
import HeaderContainer from './style';

export default function Header({ logoImage, topImage }) {
  // user상태관리
  const { useGetUserInfo, useLogOut } = User();
  const { data: user, isLoading: userLoading } = useGetUserInfo();
  const { mutate } = useLogOut();
  // useTemplatesTag 관리
  const { useGetTemplatesTag } = useTemplatesTag();
  const { data: tag, isLoading: tagLoading } = useGetTemplatesTag();
  // path 관련
  const pathname = usePathname().substring(1).split('/')[2];
  const navCutLine =
    pathname === 'banner' ? 0 : pathname === 'print' ? 1 : pathname === 'real' ? 2 : -3;
  // 로그인on상태에서 toggle Nav
  const [isMypage, setIsMypage] = useState(false);
  const toggleIsMypage = () => {
    setIsMypage((prev) => !prev);
  };

  // Auth Modal 관련
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
  if (tagLoading || userLoading) {
    return <MainLoading />;
  }

  return (
    <HeaderContainer ScrollActive={ScrollActive}>
      <div className="prev_site">
        <img src={topImage} alt="topImage" />
      </div>
      <div className="header CContainer">
        <div className="navContainer">
          <div className="header_top">
            <Link href="/">
              <img src={logoImage} alt="logo" />
            </Link>
            <HeaderSearchInput />
            <div className="subContainer">
              <div className="login">
                <ul>
                  {user?.role === 'admin' && (
                    <>
                      <li className="item">
                        <Link href="/admin/dashboard">관리자페이지</Link>
                      </li>
                      <li className="item">
                        <span />
                      </li>
                    </>
                  )}
                  {user?.id && (
                    <li className="item">
                      <button type="button" onClick={toggleIsMypage}>
                        마이페이지
                      </button>
                      {isMypage && (
                        <MypageModal user={user} signOut={mutate} toggleIsMypage={toggleIsMypage} />
                      )}
                    </li>
                  )}
                  {!user?.id && (
                    <li className="item">
                      <button type="button" onClick={setAuthState}>
                        로그인/회원가입
                      </button>
                    </li>
                  )}
                  <li className="item">
                    <span />
                  </li>
                  <li className="item">
                    <TextDropdown title="고객센터" dropdownText={headerNoticeTextList} />
                  </li>
                </ul>
              </div>
            </div>
            <div className="full_line" />
          </div>
          {ScrollActive && <div className="temp_nav" />}
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
                />

                {/* 메뉴 출력  */}
                <div className="drop_downContainer">
                  <div className="nav_item menu_benner">
                    {tag
                      .filter((item) => item.fromNav === 'banner')
                      .map((item) => (
                        <div key={item.id} className="nav_menu_item">
                          <h1>{item.title}</h1>
                          <ul>
                            {item.tagList.list.map((text) => (
                              <li
                                role="presentation"
                                key={`${text}_${() => v4()}`}
                                onClick={() => {
                                  setTemplateTagList(text);
                                }}
                              >
                                <Link href="/home/templates/banner">{text}</Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                  </div>

                  <div className="nav_item menu_print">
                    {tag
                      .filter((item) => item.fromNav === 'print')
                      .map((item) => (
                        <div key={item.id} className="nav_menu_item">
                          <h1>{item.title}</h1>
                          <ul>
                            {item.tagList.list.map((text) => (
                              <li
                                role="presentation"
                                key={`${text}_${() => v4()}`}
                                onClick={() => {
                                  setTemplateTagList(text);
                                }}
                              >
                                <Link href="/home/templates/print">{text}</Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                  </div>

                  <div className="nav_item menu_real">
                    {tag
                      .filter((item) => item.fromNav === 'real')
                      .map((item) => (
                        <div key={item.id} className="nav_menu_item">
                          <h1>{item.title}</h1>
                          <ul>
                            {item.tagList.list.map((text) => (
                              <li
                                role="presentation"
                                key={`${text}_${() => v4()}`}
                                onClick={() => {
                                  setTemplateTagList(text);
                                }}
                              >
                                <Link href="/home/templates/real">{text}</Link>
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
                  <Link href="/home/mypage/my_payment" className="C_basic_flex">
                    <PaymentOutlinedIcon />
                    개인결제
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </HeaderContainer>
  );
}
