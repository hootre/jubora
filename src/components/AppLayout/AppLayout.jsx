'use client';
import { PC, Mobile } from 'utils/MediaQuery';
import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { useUser } from 'hooks/useUser';

const AppLayout = ({ children }) => {
  useUser();
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
