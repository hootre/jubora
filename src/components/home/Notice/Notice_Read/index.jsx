'use client';
import * as React from 'react';
import { Notice_Read_container } from './styles';
import { BoardCard } from 'components/common/Board/BoardCard';
import { BoardCardHeader } from 'components/common/Board/BoardCardHeader';
import { useOrder } from 'hooks/supabase/order/useOrder';
import Link from 'next/link';
const boardHeaderText = ['번호', '상태', '제목', '작성자', '날짜'];

const Notice_Read = () => {
  const { useGetOrder, useDeleteOrder } = useOrder();
  const { data, isLoading } = useGetOrder();
  const { mutate: deleteOrder } = useDeleteOrder();

  if (isLoading) {
    return <h1>Loading</h1>;
  }
  return (
    <Notice_Read_container>
      <div className="top_box">
        <h1 className="order_title">
          NOTICE <span>공지사항입니다.</span>
        </h1>
        <button className="C_basic_button">
          <Link href="/home/write">글쓰기</Link>
        </button>
      </div>
      <ul>
        <BoardCardHeader boardHeaderText={boardHeaderText} />
        {data
          .sort((a, b) => b.id - a.id)
          ?.map((item) => (
            <BoardCard key={item.id} item={item} table={'order'} deleteOrder={deleteOrder} />
          ))}
      </ul>
    </Notice_Read_container>
  );
};
export default Notice_Read;
