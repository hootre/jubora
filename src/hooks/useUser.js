import { useQuery } from '@tanstack/react-query';
import supabase_client from 'lib/supabase-browser';
import { userKeys } from 'utils/queryKeys';

export const getUser = async () => {
  console.log('getUser');
  const {
    data: { session },
  } = await supabase_client.auth.getSession();
  if (session) {
    let { data: profiles, error } = await supabase_client
      .from('profiles')
      .select('*')
      .eq('id', session?.user.id)
      .single();

    if (error) {
      throw console.log(`getUser Error : ${error.message}`);
    }
    return profiles;
  } else {
    return [];
  }
};

export const useUser = () => {
  return useQuery(userKeys.current_user, () => getUser());
};
