'use client';
import { SianBoardDetail } from 'components/common/SianBoard/SianBoardDetail';
import { useOrder } from 'hooks/supabase/order/useOrder';
import React from 'react';

const detail = ({ params: { id } }) => {
  const { useGetOnlyOrder } = useOrder();
  const { data, isLoading } = useGetOnlyOrder(id);
  if (isLoading) {
    return <h1>Loading</h1>;
  }
  return <SianBoardDetail data={data} />;
};
export default detail;
