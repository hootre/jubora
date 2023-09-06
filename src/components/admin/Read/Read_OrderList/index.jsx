'use client';

import React, { useState } from 'react';
import { Showcase } from 'components/home/Templates/Showcase';
import { Read_OrderList_container } from './style';
import { useOrder } from 'hooks/supabase/order/useOrder';
import { BoardCardHeader } from 'components/common/Board/BoardCardHeader';
import { BoardCard } from 'components/common/Board/BoardCard';

const boardHeaderText = ['번호', '상태', '제목', '작성자', '날짜'];
export const Read_OrderList = () => {
  const { useGetOrder, useDeleteOrder } = useOrder();
  const { data, isLoading } = useGetOrder();
  const { mutate: deleteOrder } = useDeleteOrder();

  if (isLoading) {
    return <h1>Loading</h1>;
  }
  return (
    <Read_OrderList_container>
      <ul>
        <BoardCardHeader boardHeaderText={boardHeaderText} />
        {data
          .sort((a, b) => b.id - a.id)
          ?.map((item) => (
            <BoardCard key={item.id} item={item} table={'order'} deleteOrder={deleteOrder} modal />
          ))}
      </ul>
    </Read_OrderList_container>
  );
};
