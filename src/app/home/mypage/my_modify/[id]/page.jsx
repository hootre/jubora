'use client';
import { MainLoading } from 'components/Loading/MainLoading';
import { SianBoardDetail } from 'components/common/SianBoard/SianBoardDetail';
import { useOrder } from 'hooks/supabase/order/useOrder';
import React from 'react';

const detail = ({ params: { id } }) => {
  const { useGetOnlyOrder } = useOrder();
  const { data, isLoading } = useGetOnlyOrder(id);
  if (isLoading) {
    return <MainLoading />;
  }
  return <SianBoardDetail data={data} />;
};
export default detail;
