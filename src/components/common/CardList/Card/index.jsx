'use client';
import React from 'react';
import { Card_container } from './style';

export const Card = () => {
  return (
    <Card_container>
      <img src="https://nuriad.co.kr/data/bbsData/16376642171.jpg" alt="" />
      <div className="title_box">
        <h1>일반 현수막</h1>
        <span>1장부터 9,900원! 수량별 추가할인~</span>
      </div>
      <div className="subTitle">실내,실외 어디서든 선명하게 홍보해 보세요</div>
    </Card_container>
  );
};
