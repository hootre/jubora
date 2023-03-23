import React from 'react';
import { HeaderBox } from './styles';
import logo from 'assets/MainPage/logo.png';
import Image from 'next/image';
import Link from 'next/link';

export const Header = () => {
  return (
    <HeaderBox className="">
      <div id="header" className="container">
        <div id="navBox">
          <Link href="/">
            <Image src={logo} alt="img" />
          </Link>
          <ul className="nav">
            <li>
              <Link href="/templates">현수막/배너</Link>
            </li>
            <li>
              <a href="#">접수확인</a>
            </li>
            <li>
              <a href="#">시안보기</a>
            </li>
            <li>
              <a href="#">가격안내</a>
            </li>
          </ul>
        </div>
        <div id="subBox">
          <div className="search">
            <input type="text" placeholder="검색" />
          </div>
          <div className="login">
            <ul>
              <li className="loginItem">
                <Link href="/login">로그인</Link>
              </li>
              <li>
                <span></span>
              </li>
              <li className="loginItem">
                <Link href="/login">회원가입</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </HeaderBox>
  );
};
