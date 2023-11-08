'use client';

import BoardCommentInput from 'components/common/Board/BoardCommentInput';
import BoardCommentList from 'components/common/Board/BoardCommentList';
import BoardDetail from 'components/common/Board/BoardDetail';
import useOrder from 'hooks/supabase/order/useOrder';
import React from 'react';

const page = ({ params: { id } }) => {
  const { useGetOnlyOrder } = useOrder();
  const { data, isLoading } = useGetOnlyOrder(id);
  if (isLoading) {
    return <h1>Loading</h1>;
  }
  return (
    <>
      <BoardDetail data={data} />
      <BoardCommentList fromTable="order" fromTableId={id} />
      <BoardCommentInput fromTable="order" fromTableId={id} writer={data.name} />
    </>
  );
};
export default page;
