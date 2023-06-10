import { useMutation, useQueryClient } from '@tanstack/react-query';
import supabase_client from 'lib/supabase-browser';
import { toast } from 'react-hot-toast';

const logout = async () => {
  const { error } = await supabase_client.auth.signOut();

  if (error) {
    throw console.log(`유저 로그아웃 오류 : ${error.message}`);
  } else {
    toast.success('로그아웃');
  }
};

export default function useLogOut() {
  const client = useQueryClient();
  return useMutation(() => logout(), {
    onSuccess: () => {
      client.removeQueries();
    },
  });
}
