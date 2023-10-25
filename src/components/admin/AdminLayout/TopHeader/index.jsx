import React from 'react';
import { TopHeader_container } from './style';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import logo from 'assets/MainPage/logo.png';
import Image from 'next/image';

export const TopHeader = () => {
  // path 관련
  const pathName = usePathname().substring(1).split('/')[1];
  return (
    <TopHeader_container>
      <div className="logo">
        <Link href="/">
          <Image src={logo} alt="admin_logo" width={100} />
        </Link>
      </div>
    </TopHeader_container>
  );
};
