'use client';

import usePayment from 'hooks/supabase/payment/usePayment';
import MainLoading from 'components/Loading/MainLoading';
import MyModifyContainer from './style';
import PaymentListHeader from './PaymentListHeader';
import PaymentListItem from './PaymentListItem';

export default function MyPayment({ email }) {
  const { useGetEmailPayment } = usePayment();
  const { data, isLoading } = useGetEmailPayment(email);

  if (isLoading) {
    return <MainLoading />;
  }
  return (
    <MyModifyContainer>
      <PaymentListHeader />
      {data.length > 0 ? (
        data.sort((a, b) => b.id - a.id)?.map((item) => <PaymentListItem item={item} />)
      ) : (
        <h1 className="noData">주문내역이 없습니다</h1>
      )}
    </MyModifyContainer>
  );
}
