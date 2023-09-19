'use client';
import React from 'react';
import { MyModify_container } from './style';
import { SianBoardCardHeader } from 'components/common/SianBoard/SianBoardCardHeader';
import { useOrder } from 'hooks/supabase/order/useOrder';
import { SianBoardCard } from 'components/common/SianBoard/SianBoardCard';
import { useUser } from 'hooks/supabase/auth/useUser';

export const MyModify = ({ email }) => {
  const { useGetUserOrder } = useOrder();
  const { data, isLoading } = useGetUserOrder(email);

  if (isLoading) {
    return <h1>Loading</h1>;
  }
  return (
    <MyModify_container>
      <SianBoardCardHeader />
      {data
        .sort((a, b) => b.id - a.id)
        ?.map((item) => (
          <SianBoardCard key={item.id} item={item} />
        ))}
    </MyModify_container>
  );
};
