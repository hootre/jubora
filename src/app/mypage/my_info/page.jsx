import { MyInfo } from 'components/Mypage/MyInfo';
import { LoginRequest } from 'components/common/LoginRequest';
import supabase_server from 'lib/supabase-server';
import React from 'react';

const page = async () => {
  const {
    data: { session },
  } = await supabase_server.auth.getSession();
  if (session?.user) {
    return <MyInfo />;
  }
  return <LoginRequest />;
};
export default page;
