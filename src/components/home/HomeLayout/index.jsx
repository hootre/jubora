'use client';

import React from 'react';
import QuickBar from 'components/home/Main/QuickBar';
import Header from './Header';
import Footer from './Footer';

function HomeLayout({ children, logoImage, topImage }) {
  return (
    <>
      {/* <PC> */}
      <Header logoImage={logoImage} topImage={topImage} />
      <QuickBar />
      {children}
      <Footer logoImage={logoImage} />
      {/* </PC>
      <Mobile>
        <h1>MOBILE</h1>
        {children}
      </Mobile> */}
    </>
  );
}
export default HomeLayout;
