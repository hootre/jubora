'use client';
import React from 'react';
import { Board } from 'components/Board';

import { orderDataList } from 'assets/data';
import { useOrder } from 'hooks/order/useOrder';
const headerList = ['번호', '제목', '글쓴이', '날짜'];
const order = () => {
  const { useGetOrder } = useOrder();
  const { data, isLoading } = useGetOrder();
  if (isLoading) {
    return <h1>Loading</h1>;
  }
  console.log(data);
  return (
    <section className="page_container">
      <Board boardDataList={orderDataList} headerList={headerList} />
    </section>
  );
};
export default order;
