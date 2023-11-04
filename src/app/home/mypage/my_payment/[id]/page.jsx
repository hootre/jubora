import { PaymentDetail } from 'components/home/Mypage/MyPayment/PaymentDetail';
import React from 'react';

const detail = ({ params: { id } }) => {
  return <PaymentDetail id={id} />;
};
export default detail;
