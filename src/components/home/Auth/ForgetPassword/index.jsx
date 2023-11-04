'use client';

import logo from 'assets/MainPage/logo.png';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Auth_container } from '../style.jsx';
import { useUser } from 'hooks/supabase/auth/useUser.js';
import { toast } from 'react-hot-toast';
import { useState } from 'react';
const ForgetPassword = ({ setAuthType }) => {
  // form
  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    formState: { isValid, errors },
  } = useForm();
  //auth
  const { checkEmail, sendResetEmail } = useUser();
  const [buttonState, setButtonState] = useState(false);
  const onSubmit = async (data) => {
    setButtonState(true);
    const checked = await checkEmail(data);
    if (checked) {
      const state = await sendResetEmail(data);
      if (state) {
        toast.success('재설정 메일을 전송하였습니다.');
      } else {
      }
    } else {
      toast.error('존재하지 않는 이메일입니다.');
    }
    setValue('email', '');
    setButtonState(false);
  };
  return (
    <div>
      <div className="forgetPassword_title">
        <h1>비밀번호 재설정</h1>
      </div>
      <main>
        <form className="form_box" onSubmit={handleSubmit(onSubmit)}>
          <p className={`point_text ${errors.email && 'active'}`}>{errors.email?.message} </p>
          <input
            id="email"
            placeholder="이메일"
            className={`input ${errors.email && 'invalid'}`}
            name="email"
            type="email"
            required={true}
            {...register('email', {
              required: '이메일은 필수입니다',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: '이메일 형식을 지켜주세요',
              },
            })}
            onKeyUp={() => {
              trigger('email');
            }}
          ></input>
          <ul className="alert_box">
            <li>메일이 확인되지 않을 경우 스팸 메일함을 확인 부탁드립니다.</li>
          </ul>
          <div className="go_login" onClick={() => setAuthType('signIn')}>
            로그인하러가기
          </div>
          <button
            type={isValid ? 'submit' : 'button'}
            className={`submit ${isValid && !buttonState ? 'possible' : ''}`}
            disabled={buttonState}
          >
            <span>{buttonState ? '보내는 중...' : `메일 보내기`}</span>
          </button>
        </form>
      </main>
    </div>
  );
};

export default ForgetPassword;
