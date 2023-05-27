import { Auth } from 'components/Auth';
import { VIEWS, useAuth } from 'components/Auth/AuthProvider';
import Link from 'next/link';
import { useRouter } from 'next/router';
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
