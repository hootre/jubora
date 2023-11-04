'use client';
import React from 'react';
import { MyModify_container } from './style';

import { SianBoardCard } from 'components/common/SianBoard/SianBoardCard';
import { MainLoading } from 'components/Loading/MainLoading';
import { usePayment } from 'hooks/supabase/payment/usePayment';
import { PaymentListHeader } from './PaymentListHeader';
import { PaymentListItem } from './PaymentListItem';

export const MyPayment = ({ email }) => {
  const { useGetEmailPayment } = usePayment();
  const { data, isLoading } = useGetEmailPayment(email);

  if (isLoading) {
    return <MainLoading />;
  }
  console.log(data);
  return (
    <MyModify_container>
      <PaymentListHeader />
      {data.length > 0 ? (
        data.sort((a, b) => b.id - a.id)?.map((item) => <PaymentListItem item={item} />)
      ) : (
        <h1 className="noData">주문내역이 없습니다</h1>
      )}
    </MyModify_container>
  );
};
