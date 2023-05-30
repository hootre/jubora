import { toast } from 'react-hot-toast';
import supabase from 'lib/supabase-browser';
import { useMutation } from '@tanstack/react-query';

const googleLogin = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
  });

  if (error) {
    toast.error(`GoogleLogin : ${error.message}`);
  }
  return data;
};

export const useGoogleLogin = () => {
  return useMutation(googleLogin);
};
