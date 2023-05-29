import supabase from 'lib/supabase-browser';
import { useQuery } from 'react-query';

const getUser = async (userId) => {
  const { data, error } = await supabase.from('profiles').select().eq('id', userId).single();
  console.log(data);
  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error('User not found');
  }

  return data;
};

export default function useUser() {
  const user = supabase.auth.getSession();
  return useQuery('user', user);
}
