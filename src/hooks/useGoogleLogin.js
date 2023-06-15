import { toast } from 'react-hot-toast';
import supabase from 'lib/supabase-browser';
import { useMutation } from '@tanstack/react-query';
const googleLogin = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
  });
  if (data) {
    console.log(data);
    const { data: insertData, error: insertError } = await supabase_client.from('profiles').insert({
      id: data.id,
      email: data.email,
      role: 'member',
      privacy_check: 'true',
    });
    if (insertError) {
      throw console.log(`유저 정보 기입 오류 : ${insertError.message}`);
    } else {
      client.setQueryData(userKeys.current_user, getUser(data?.user.id));
      return insertData;
    }
  }
  if (error) {
    throw toast.error(`GoogleLogin : ${error.message}`);
  }
  return data;
};

export const useGoogleLogin = () => {
  return useMutation(googleLogin);
};
