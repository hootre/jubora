import { PasswordCheckModal } from 'components/common/Modal/PasswordCheckModal';
import supabase_server from 'lib/supabase-server';
import React from 'react';
import { MyPayment } from 'components/home/Mypage/MyPayment';

const MyPay = async () => {
  const {
    data: { session },
  } = await supabase_server.auth.getSession();

  if (session?.user) {
    return <MyPayment email={session.user.email} />;
  }
  return <PasswordCheckModal table="order" />;
};
export default MyPay;
