import { MyInfo } from 'components/home/Mypage/MyInfo';
import { LoginRequest } from 'components/common/LoginRequest';
import supabase_server from 'lib/supabase-server';
import React from 'react';

const page = async ({ searchParams: { code } }) => {
  const {
    data: { session },
  } = await supabase_server.auth.getSession();
  if (session?.user || code) {
    return <MyInfo />;
  } else {
    return <LoginRequest />;
  }
};
export default page;
