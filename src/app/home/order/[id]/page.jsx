'use client';

import MainLoading from 'components/Loading/MainLoading';
import BoardCommentInput from 'components/common/Board/BoardCommentInput';
import BoardCommentList from 'components/common/Board/BoardCommentList';
import BoardDetail from 'components/common/Board/BoardDetail';
import useOrder from 'hooks/supabase/order/useOrder';
import React from 'react';

const page = ({ params: { id } }) => {
  const { useGetOnlyOrder } = useOrder();
  const { data, isLoading } = useGetOnlyOrder(id);
  if (isLoading) {
    return <MainLoading />;
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
