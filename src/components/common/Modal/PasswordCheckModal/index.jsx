'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import BoardPasswordCheck from 'hooks/custom/usePasswordCheck';
import PasswordCheckContainer from './style';

export default function PasswordCheckModal({ table }) {
  // form 데이터 관리
  const { handleSubmit, register, setFocus } = useForm();
  const router = useRouter();
  const pathName = usePathname();
  const onSubmit = async ({ name, password }) => {
    const data = await BoardPasswordCheck(table, name, password);
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
    <PasswordCheckContainer>
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
          <button type="button" className="C_basic_button">
            확인
          </button>
        </div>
      </form>
    </PasswordCheckContainer>
  );
}
