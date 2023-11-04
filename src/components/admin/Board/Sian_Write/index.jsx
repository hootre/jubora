'use client';
import React from 'react';
import { Sian_Write_container } from './styles';
import { useOrder } from 'hooks/supabase/order/useOrder';
import { Order_Detail } from 'components/home/Order/Order_Detail';
import Read_OrderList from 'components/admin/Read/Read_OrderList';
import { MainLoading } from 'components/Loading/MainLoading';
const override = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'red',
};
const Sian_Write = ({ id }) => {
  const { useGetOnlyOrder } = useOrder();
  const { data, isLoading } = useGetOnlyOrder(id);
  if (isLoading) {
    return <MainLoading />;
  }
  return (
    <Sian_Write_container className="C_container">
      <Order_Detail data={data} />
      <Read_OrderList />
    </Sian_Write_container>
  );
};
export default Sian_Write;
