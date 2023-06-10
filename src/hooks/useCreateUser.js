import { useMutation, useQueryClient } from '@tanstack/react-query';
import supabase_client from 'lib/supabase-browser';
import { toast } from 'react-hot-toast';
import { useUser } from './useUser';
import { userKeys } from 'utils/queryKeys';

const createUser = async (formData) => {
  const { data, error } = await supabase_client.auth.signUp({
    email: formData.email,
    password: formData.password,
  });
  if (error) {
    switch (error.message) {
      case 'Invalid login credentials':
        toast.error('이미 사용중인 이메일입니다.');
        throw console.log(`유저 회원가입 오류 : ${error.message}`);
        break;
      case 'User already registered':
        toast.error('이미 사용중인 이메일입니다.');
        throw console.log(`유저 회원가입 오류 : ${error.message}`);
        break;
      default:
        toast.error(error.message);
        throw console.log(`유저 회원가입 오류 : ${error.message}`);
        break;
    }
  } else {
    toast.success('회원가입에 성공하였습니다!');
  }

  return { data, formData };
};

export const useCreateUser = () => {
  const client = useQueryClient();
  return useMutation((user) => createUser(user), {
    onSuccess: async ({ data, formData }) => {
      console.log('createUser');
      const { data: insertData, error: insertError } = await supabase_client
        .from('profiles')
        .insert({
          id: data.user.id,
          email: formData.email,
          name: formData.name,
          role: 'member',
          privacy_check: formData.check,
        });
      if (insertError) {
        throw console.log(`유저 정보 기입 오류 : ${insertError.message}`);
      } else {
        client.setQueryData(userKeys.current_user, getUser(data?.user.id));
        return insertData;
      }
    },
  });
};
