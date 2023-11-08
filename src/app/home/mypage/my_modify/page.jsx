import MyModify from 'components/home/Mypage/MyModify';
import PasswordCheckModal from 'components/common/Modal/PasswordCheckModal';
import supabaseServer from 'lib/supabaseServer';
import React from 'react';

const page = async () => {
  const {
    data: { session },
  } = await supabaseServer.auth.getSession();

  if (session?.user) {
    return <MyModify email={session.user.email} />;
  }
  return <PasswordCheckModal table="order" />;
};
export default page;
