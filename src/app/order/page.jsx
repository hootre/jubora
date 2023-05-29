'use client';
import React from 'react';
import { OrderBox } from './styles';
import { Board } from 'components/Board';

import { orderDataList } from 'assets/data';
const headerList = ['번호', '제목', '글쓴이', '날짜'];
const order = () => {
  return (
    <OrderBox>
      <Board boardDataList={orderDataList} headerList={headerList} />
    </OrderBox>
  );
};
export default order;
