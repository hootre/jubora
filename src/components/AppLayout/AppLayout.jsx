'use client';
import { PC, Mobile } from 'hooks/custom/useMediaQuery';
import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

const AppLayout = ({ children }) => {
  return (
    <>
      <PC>
        <Header />
        {children}
        <Footer />
      </PC>
      <Mobile>
        <h1>MOBILE</h1>
        {children}
      </Mobile>
    </>
  );
};
export default AppLayout;
