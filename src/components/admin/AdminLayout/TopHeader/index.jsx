import React from 'react';
import Link from 'next/link';
import logo from 'assets/MainPage/logo.png';
import Image from 'next/image';
import TopHeaderContainer from './style';

export default function TopHeader() {
  return (
    <TopHeaderContainer>
      <div className="logo">
        <Link href="/">
          <Image src={logo} alt="admin_logo" width={100} />
        </Link>
      </div>
    </TopHeaderContainer>
  );
}
