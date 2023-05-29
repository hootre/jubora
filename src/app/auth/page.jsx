'use client';
import { Auth } from 'components/Auth';
import { VIEWS, useAuth } from 'components/Auth/AuthProvider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const login = () => {
  const { initial, user, view, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, []);

  return <Auth view={view} />;
};

export default login;
