import MyInfo from 'components/home/Mypage/MyInfo';
import LoginRequest from 'components/common/LoginRequest';
import supabaseServer from 'lib/supabaseServer';
import React from 'react';

const page = async ({ searchParams: { code } }) => {
  const {
    data: { session },
  } = await supabaseServer.auth.getSession();
  if (session?.user || code) {
    return <MyInfo />;
  }
  return <LoginRequest />;
};
export default page;
