'use client';

import React from 'react';
import useOrder from 'hooks/supabase/order/useOrder';
import OrderDetail from 'components/home/Order/OrderDetail';
import ReadOrderList from 'components/admin/Read/ReadOrderList';
import MainLoading from 'components/Loading/MainLoading';
import User from 'hooks/supabase/auth/useUser';
import SianWriteContainer from './styles';

function SianWrite({ id }) {
  // 주문 데이터
  const { useGetOnlyOrder } = useOrder();
  const { data: orderData, isLoading: orderLoading } = useGetOnlyOrder(id);

  // user상태관리
  const { useGetUserInfo } = User();
  const { data: userData, isLoading: userLoading } = useGetUserInfo();
  if (orderLoading || userLoading) {
    return <MainLoading />;
  }
  return (
    <SianWriteContainer className="CContainer">
      <OrderDetail data={orderData} userData={userData} />
      <ReadOrderList />
    </SianWriteContainer>
  );
}
export default SianWrite;
