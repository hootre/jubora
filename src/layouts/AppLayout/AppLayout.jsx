import { PC, Mobile } from 'utils/MediaQuery';
import React, { useEffect } from 'react';
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
