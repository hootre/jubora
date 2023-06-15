'use client';
import { PC, Mobile } from 'hooks/custom/useMediaQuery';
import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { MainContainer } from './MainContainer';

const AppLayout = ({ children, session }) => {
  return (
    <>
      <PC>
        <Header session={session} />
        <MainContainer>{children}</MainContainer>
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
