'use client';

import MainLoading from 'components/Loading/MainLoading';
import SianBoardDetail from 'components/common/SianBoard/SianBoardDetail';
import User from 'hooks/supabase/auth/useUser';
import useOrder from 'hooks/supabase/order/useOrder';
import React from 'react';

const detail = ({ params: { id } }) => {
  // 주문 데이터
  const { useGetOnlyOrder } = useOrder();
  const { data, isLoading } = useGetOnlyOrder(id);
  // 현재 user 등급
  const { useGetUserInfo } = User();
  const { data: userData, isLoading: userLoading } = useGetUserInfo();
  if (isLoading || userLoading) {
    return <MainLoading />;
  }
  return <SianBoardDetail data={data} userData={userData} />;
};
export default detail;
