import { toast } from 'react-hot-toast';
import supabase_client from 'lib/supabase-browser';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userKeys } from 'utils/queryKeys';

const login = async (formData) => {
  const { data, error } = await supabase_client.auth.signInWithPassword({
    email: formData.email,
    password: formData.password,
  });
  if (error) {
    switch (error.message) {
      case 'Invalid login credentials':
        throw toast.error('로그인정보가 올바르지 않습니다.');
        break;
      default:
        throw toast.error(`로그인 오류 : ${error.message}`);
        break;
    }
  } else {
    toast.success('로그인 성공하였습니다!');
  }

  return data;
};

export const useLogin = () => {
  const client = useQueryClient();
  return useMutation(login, {
    onSuccess: () => {
      client.invalidateQueries(userKeys.current_user);
    },
  });
};
