import { useMutation } from 'react-query';
import { toast } from 'react-hot-toast';
import supabase from 'lib/supabase-browser';

const login = async (formData) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password,
  });

  if (error) {
    switch (error.message) {
      case 'Invalid login credentials':
        toast.error('로그인정보가 올바르지 않습니다.');
        break;
      default:
        break;
    }
  } else {
    toast.success('로그인 성공하였습니다!');
  }
  return data;
};

export default function useLogin(formData) {
  return useMutation('login', () => login(formData));
}
