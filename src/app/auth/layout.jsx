'use client';
import { useUser } from 'hooks/useUser';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';

export default function AuthLayout({ children }) {
  const { data } = useUser();
  const router = useRouter();
  useEffect(() => {
    if (data) {
      toast('이미 로그인 되어있습니다.', {
        icon: '👏',
      });
      router.push('/');
    }
  }, [data]);
  return <section>{children}</section>;
}
