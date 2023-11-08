'use client';

import MainLoading from 'components/Loading/MainLoading';
import Write from 'components/home/Write';
import User from 'hooks/supabase/auth/useUser';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

const page = () => {
  // 어드민 유저정보 확인
  const { useGetUserInfo } = User();
  const { data, isLoading } = useGetUserInfo();
  const router = useRouter();

  if (isLoading) {
    return <MainLoading />;
  }
  if (data.id) {
    return <Write name={data.name} />;
  }
  toast.error('사용자만 접근 가능합니다');
  router.back();
  return false;
};
export default page;
