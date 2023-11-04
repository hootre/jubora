'use client';
import React from 'react';
import { Sian_Write_container } from './styles';
import { useOrder } from 'hooks/supabase/order/useOrder';
import { Order_Detail } from 'components/home/Order/Order_Detail';
import Read_OrderList from 'components/admin/Read/Read_OrderList';
import { MainLoading } from 'components/Loading/MainLoading';
import { useUser } from 'hooks/supabase/auth/useUser';
const override = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'red',
};
const Sian_Write = ({ id }) => {
  // 주문 데이터
  const { useGetOnlyOrder } = useOrder();
  const { data: orderData, isLoading: orderLoading } = useGetOnlyOrder(id);

  // user상태관리
  const { useGetUserInfo } = useUser();
  const { data: userData, isLoading: userLoading } = useGetUserInfo();
  if (orderLoading || userLoading) {
    return <MainLoading />;
  }
  return (
    <Sian_Write_container className="C_container">
      <Order_Detail data={orderData} userData={userData} />
      <Read_OrderList />
    </Sian_Write_container>
  );
};
export default Sian_Write;
