'use client';
import React from 'react';
import { MyModify_container } from './style';
import { SianBoardCardHeader } from 'components/common/SianBoard/SianBoardCardHeader';
import { useOrder } from 'hooks/supabase/order/useOrder';
import { SianBoardCard } from 'components/common/SianBoard/SianBoardCard';
import { useUser } from 'hooks/supabase/auth/useUser';
import { MainLoading } from 'components/Loading/MainLoading';

export const MyModify = ({ email }) => {
  const { useGetUserOrder } = useOrder();
  const { data, isLoading } = useGetUserOrder(email);

  if (isLoading) {
    return <MainLoading />;
  }
  return (
    <MyModify_container>
      <SianBoardCardHeader />
      {data.length > 0 ? (
        data.sort((a, b) => b.id - a.id)?.map((item) => <SianBoardCard key={item.id} item={item} />)
      ) : (
        <h1 className="noData">시안이 없습니다</h1>
      )}
    </MyModify_container>
  );
};
