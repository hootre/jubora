'use client';
import { PC, Mobile } from 'hooks/custom/useMediaQuery';
import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { QuickBar } from 'components/home/Main/QuickBar';

const HomeLayout = ({ children, logoImage, topImage }) => {
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
};
export default HomeLayout;
