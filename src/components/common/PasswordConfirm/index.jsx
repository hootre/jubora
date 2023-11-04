import React from 'react';
import { PasswordConfirm_container } from './style';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useBoardPasswordCheck } from 'hooks/custom/usePasswordCheck';

export const PasswordConfirm = ({ table, id }) => {
  // form 데이터 관리
  const {
    handleSubmit,
    formState: {},
    register,
    setFocus,
  } = useForm();
  const router = useRouter();
  const onSubmit = async ({ password }) => {
    const data = await useBoardPasswordCheck(table, id, password);
    if (data?.id) {
      router.push(`/${table}/${id}`);
    } else {
      toast.error('password 틀려요');
    }
  };
  useEffect(() => {
    setFocus('password');
  }, [setFocus]);
  return (
    <PasswordConfirm_container>
      <h1>비밀번호 입력</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="password" maxLength={4} {...register('password')} />
        <button className="C_basic_button">확인</button>
      </form>
    </PasswordConfirm_container>
  );
};
