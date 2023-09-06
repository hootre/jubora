import { MyModify } from 'components/home/Mypage/MyModify';
import { PasswordCheckModal } from 'components/common/Modal/PasswordCheckModal';
import supabase_server from 'lib/supabase-server';
import React from 'react';

const MyPay = async () => {
  const {
    data: { session },
  } = await supabase_server.auth.getSession();

  if (session?.user) {
    return <MyModify />;
  }
  return <PasswordCheckModal table="order" />;
};
export default MyPay;
