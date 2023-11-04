'use client';
import React from 'react';
import { PasswordCheck_container } from './style';
import { useForm } from 'react-hook-form';
import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { useBoardPasswordCheck } from 'hooks/custom/usePasswordCheck';
import { useEffect } from 'react';

export const PasswordCheckModal = ({ table }) => {
  // form 데이터 관리
  const {
    handleSubmit,
    formState: {},
    register,
    setFocus,
  } = useForm();
  const router = useRouter();
  const pathName = usePathname();
  const onSubmit = async ({ name, password }) => {
    const data = await useBoardPasswordCheck(table, name, password);
    if (data?.id) {
      router.push(`${pathName}/${data.id}`);
    } else {
      toast.error('비밀번호가 올바르지 않습니다');
    }
  };
  useEffect(() => {
    setFocus('name');
  }, [setFocus]);
  return (
    <PasswordCheck_container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>이름 / 비밀번호 입력</h1>
        <div className="input_box">
          <input type="name" placeholder="이름/회사명" {...register('name')} />
          <input
            type="password"
            placeholder="비밀번호(4자리)"
            maxLength={4}
            {...register('password')}
          />
          <button className="C_basic_button">확인</button>
        </div>
      </form>
    </PasswordCheck_container>
  );
};
