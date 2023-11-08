'use client';

import MypageLayoutContainer from './style';
import MypageSideBar from '../MypageSideBar';

export default function MypageLayout({ children }) {
  return (
    <MypageLayoutContainer className="CContainer">
      <MypageSideBar />
      <main>{children}</main>
    </MypageLayoutContainer>
  );
}
