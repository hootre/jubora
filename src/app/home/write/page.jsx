'use client';
import { useUser } from 'hooks/supabase/auth/useUser';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { Write } from 'components/home/Write';
const page = () => {
  // 어드민 유저정보 확인
  const { useGetUserInfo } = useUser();
  const { data, isLoading } = useGetUserInfo();
  const router = useRouter();

  if (isLoading) {
    return <h1>검사중</h1>;
  } else if (data.role !== 'admin') {
    toast.error('인가된 사용자만 접근 가능합니다');
    router.push('/');
  } else {
    return <Write name={data.name} />;
  }
};
export default page;
