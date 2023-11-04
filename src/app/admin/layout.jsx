'use client';
import { Skeleton } from '@mui/material';
import { AdminLayout } from 'components/admin/AdminLayout';
import { useUser } from 'hooks/supabase/auth/useUser';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
export default function layout({ children }) {
  // 어드민 유저정보 확인
  const { useGetUserInfo } = useUser();
  const { data, isLoading } = useGetUserInfo();

  const router = useRouter();
  if (isLoading) {
    return (
      <Skeleton variant="rectangular" width="100%">
        <div style={{ height: '2000px' }} />
      </Skeleton>
    );
  } else if (data.role !== 'admin') {
    toast.error('인가된 사용자만 접근 가능합니다');
    router.push('/');
  } else {
    return <AdminLayout>{children}</AdminLayout>;
  }
}
