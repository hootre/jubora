import React, { useEffect, useState } from 'react';
import { HeaderBox } from './styles';
import logo from 'assets/MainPage/logo.png';
import Image from 'next/image';
import Link from 'next/link';
import { GoSearch } from 'react-icons/go';
import { useRouter } from 'next/router';
import { onUserStateChange } from 'api/firebase';

export const Header = () => {
  // path 관련
  const { pathname, isReady } = useRouter();
  const [pathName, setPathName] = useState('');
  let navCutLine =
    pathName == 'templates'
      ? 0
      : pathName == 'order'
      ? 1
      : pathName == 'sian'
      ? 2
      : pathName == 'price'
      ? 3
      : -4;
  useEffect(() => {
    if (isReady) {
      setPathName(pathname.split('/')[1]);
    }
  }, [isReady, pathname]);
  // user상태관리
  const [isUser, setIsUser] = useState();
  useEffect(() => {
    onUserStateChange((user) => {
      setIsUser(user);
    });
  }, []);
  return (
    <HeaderBox className="">
      <div id="header">
        <div id="navBox">
          <Link href="/">
            <Image src={logo} alt="img" />
          </Link>
          <ul className="nav">
            <li>
              <Link href="/templates" className={pathName == 'templates' ? 'active' : ''}>
                현수막/배너
              </Link>
            </li>
            <li>
              <Link href="/order" className={pathName == 'order' ? 'active' : ''}>
                접수확인
              </Link>
            </li>
            <li>
              <Link href="/sian" className={pathName == 'sian' ? 'active' : ''}>
                시안보기
              </Link>
            </li>
            <li>
              <Link href="/price" className={pathName == 'price' ? 'active' : ''}>
                가격안내
              </Link>
            </li>
            <div className="lineBox" style={{ left: `${navCutLine * 110}px` }}></div>
          </ul>
        </div>
        <div id="subBox">
          <div className="search">
            <GoSearch />
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
