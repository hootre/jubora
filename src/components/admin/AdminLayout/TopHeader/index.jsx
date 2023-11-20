import React from 'react';
import Link from 'next/link';
import TopHeaderContainer from './style';

export default function TopHeader() {
  return (
    <TopHeaderContainer>
      <div className="logo">
        <Link href="/">
          <img src="/image/logo.png" alt="admin_logo" />
        </Link>
      </div>
    </TopHeaderContainer>
  );
}
