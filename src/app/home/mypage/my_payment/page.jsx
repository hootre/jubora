import PasswordCheckModal from 'components/common/Modal/PasswordCheckModal';
import supabaseServer from 'lib/supabaseServer';
import React from 'react';
import MyPayment from 'components/home/Mypage/MyPayment';

const MyPay = async () => {
  const {
    data: { session },
  } = await supabaseServer.auth.getSession();

  if (session?.user) {
    return <MyPayment email={session.user.email} />;
  }
  return <PasswordCheckModal table="order" />;
};
export default MyPay;
