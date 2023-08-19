'use client';
import React from 'react';
import { MypageLayout_container } from './style';
import { MypageSideBar } from '../MypageSideBar';

export const MypageLayout = ({ children }) => {
  return (
    <MypageLayout_container className="container">
      <MypageSideBar />
      <main>{children}</main>
    </MypageLayout_container>
  );
};
