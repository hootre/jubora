'use client';

import MainLoading from 'components/Loading/MainLoading';
import AdminLayout from 'components/admin/AdminLayout';
import User from 'hooks/supabase/auth/useUser';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

export default function layout({ children }) {
  // 어드민 유저정보 확인
  const { useGetUserInfo } = User();
  const { data, isLoading } = useGetUserInfo();
  const router = useRouter();
  if (isLoading) {
    return <MainLoading />;
  }
  if (data.role !== 'admin') {
    toast.error('인가된 사용자만 접근 가능합니다');
    router.push('/');
  } else {
    return <AdminLayout>{children}</AdminLayout>;
  }
  return false;
}
