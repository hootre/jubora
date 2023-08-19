'use client';
import * as React from 'react';
import { Order_container } from './styles';
import { BoardCard } from 'components/common/Board/BoardCard';
import { BoardCardHeader } from 'components/common/Board/BoardCardHeader';
import { useOrder } from 'hooks/supabase/order/useOrder';
const boardHeaderText = ['번호', '상태', '제목', '작성자', '날짜'];

const order = () => {
  const { useGetOrder, useDeleteOrder } = useOrder();
  const { data, isLoading } = useGetOrder();
  const { mutate: deleteOrder } = useDeleteOrder();

  if (isLoading) {
    return <h1>Loading</h1>;
  }
  return (
    <Order_container>
      <h1 className="order_title">
        ORDER <span>주문접수 내역입니다.</span>
      </h1>
      <ul>
        <BoardCardHeader boardHeaderText={boardHeaderText} />
        {data
          .sort((a, b) => b.id - a.id)
          ?.map((item) => (
            <BoardCard key={item.id} item={item} table={'order'} deleteOrder={deleteOrder} modal />
          ))}
      </ul>
    </Order_container>
  );
};
export default order;
