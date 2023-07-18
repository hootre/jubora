'use client';
import * as React from 'react';
import { Order_container } from './styles';
import { useOrder } from 'hooks/order/useOrder';
import { BoardCard } from 'components/common/Board/BoardCard';
import { BoardCardHeader } from 'components/common/Board/BoardCardHeader';

const order = () => {
  const { useGetOrder } = useOrder();
  const { data, isLoading } = useGetOrder();
  if (isLoading) {
    return <h1>Loading</h1>;
  }
  return (
    <Order_container>
      <h1 className="order_title">
        ORDER <span>주문접수 내역입니다.</span>
      </h1>
      <ul>
        <BoardCardHeader />
        {data
          .sort((a, b) => b.id - a.id)
          ?.map((item) => (
            <BoardCard key={item.id} item={item} table={'order'} modal />
          ))}
      </ul>
    </Order_container>
  );
};
export default order;
