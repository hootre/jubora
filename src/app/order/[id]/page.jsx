'use client';
import { BoardCommentInput } from 'components/common/Board/BoardCommentInput';
import { BoardCommentList } from 'components/common/Board/BoardCommentList';
import { BoardDetail } from 'components/common/Board/BoardDetail';
import { useOrder } from 'hooks/order/useOrder';
import React from 'react';

const order_detail = ({ params: { id } }) => {
  const { useGetOnlyOrder } = useOrder();
  const { data, isLoading } = useGetOnlyOrder(id);
  if (isLoading) {
    return <h1>Loading</h1>;
  }
  console.log(data);
  return (
    <>
      <BoardDetail data={data} />
      <BoardCommentList from_table={'order'} from_table_id={id} />
      <BoardCommentInput from_table={'order'} from_table_id={id} writer={data.name} />
    </>
  );
};
export default order_detail;
