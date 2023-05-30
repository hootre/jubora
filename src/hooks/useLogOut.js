import { useMutation, useQueryClient } from '@tanstack/react-query';
import supabase from 'lib/supabase-browser';
import { toast } from 'react-hot-toast';

const logout = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw error;
  } else {
    toast.success('로그아웃');
  }
};

export default function useLogOut() {
  const queryClient = useQueryClient();
  return useMutation(() => logout(), {
    onSuccess: () => {
      queryClient.removeQueries();
    },
  });
}
