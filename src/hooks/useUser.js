import { useQuery } from '@tanstack/react-query';
import supabase from 'lib/supabase-browser';
import { toast } from 'react-hot-toast';

const getUser = async () => {
  console.log('getUser');
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();
  if (error) {
    toast.error('session search error');
  }
  return session?.user;
};

export const useUser = () => {
  return useQuery(['user'], () => getUser());
};
