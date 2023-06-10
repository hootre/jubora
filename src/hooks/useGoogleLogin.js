import { toast } from 'react-hot-toast';
import supabase from 'lib/supabase-browser';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userKeys } from 'utils/queryKeys';

const googleLogin = async () => {
  const { data, error } = await supabase.auth
    .signInWithOAuth({
      provider: 'google',
    })
    .single();

  if (error) {
    throw toast.error(`GoogleLogin : ${error.message}`);
  }
  return data;
};

export const useGoogleLogin = () => {
  const client = useQueryClient();
  return useMutation(googleLogin, {
    onSuccess: () => {
      client.invalidateQueries(userKeys.current_user);
    },
  });
};
