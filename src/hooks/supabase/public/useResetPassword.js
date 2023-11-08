import { useMutation } from '@tanstack/react-query';
import supabase from 'lib/supabaseClient';
import { toast } from 'react-hot-toast';

const ResetPassword = async (formData) => {
  const { error } = await supabase.auth.resetPasswordForEmail(formData?.email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SUPABASE_URL}`,
  });

  if (error) {
    toast.error(error.message);
  } else {
    toast.success('비밀번호 초기화 성공! 이메일을 확인해주세요');
  }
};
export default function useResetPassword() {
  return useMutation((formData) => ResetPassword(formData));
}
