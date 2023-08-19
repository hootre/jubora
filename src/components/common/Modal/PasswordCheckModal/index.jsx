'use client';
import React from 'react';
import { PasswordCheck_container } from './style';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { useBoardPasswordCheck } from 'hooks/custom/usePasswordCheck';
import { useEffect } from 'react';

export const PasswordCheckModal = ({ table, id }) => {
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
    <PasswordCheck_container>
      <h1>게시글 비밀번호 입력</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="password" maxLength={4} {...register('password')} />
        <button className="basic_button">확인</button>
      </form>
    </PasswordCheck_container>
  );
};
