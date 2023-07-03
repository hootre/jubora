'use client';
import React from 'react';
import { Board } from 'components/Board';

import { orderDataList } from 'assets/data';
const headerList = ['번호', '제목', '글쓴이', '날짜'];
const order = () => {
  return (
    <section className="page_container">
      <Board boardDataList={orderDataList} headerList={headerList} />
    </section>
  );
};
export default order;
