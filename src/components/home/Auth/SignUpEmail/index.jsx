'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { ImCheckmark2 } from 'react-icons/im';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import User from 'hooks/supabase/auth/useUser';

function SignUpEmail() {
  const router = useRouter();
  const { useCreateUser } = User();
  const { mutate: createUser, isLoading, isSuccess } = useCreateUser();
  if (isSuccess) {
    router.refresh();
  }
  const {
    handleSubmit,
    formState: { isValid, errors },
    trigger,
    register,
    watch,
  } = useForm();
  return (
    <div>
      <div>
        <form onSubmit={handleSubmit(createUser)}>
          <p className={`point_text ${errors.name && 'active'}`}>이름/회사명을 입력해주세요.</p>
          <input
            name="name"
            type="name"
            placeholder="이름/회사명"
            className={`input form-control ${errors.name && 'invalid'}`}
            required
            defaultValue=""
            {...register('name', { required: '이름/회사명을 입력해주세요.' })}
            onKeyUp={() => {
              trigger('name');
            }}
          />
          <p className={`point_text ${errors.email && 'active'}`}>{errors.email?.message}</p>
          <input
            id="email"
            placeholder="이메일"
            className={`input ${errors.email && 'invalid'}`}
            name="email"
            type="email"
            required
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
          />
          <p className={`point_text ${errors.password && 'active'}`}>{errors.password?.message} </p>
          <input
            name="password"
            placeholder="비밀번호"
            id="password"
            type="password"
            autoComplete="off"
            className={`input form-control ${errors.password && 'invalid'}`}
            required
            {...register('password', {
              required: '비밀번호는 필수입니다.',
              pattern: {
                value: /^(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
                message: '6~20 자의 영문대소문자, 숫자 및 특수문자 입력해 주세요',
              },
              minLength: {
                value: 6,
                message: '비밀번호는 최소 8글자 이상입니다.',
              },
              maxLength: {
                value: 20,
                message: '비밀번호는 최소 20글자 이하입니다.',
              },
            })}
            onKeyUp={() => {
              trigger('password');
            }}
          />
          <p className={`point_text ${errors.confirmPassword && 'active'}`}>
            {errors.confirmPassword?.message}
          </p>
          <input
            id="confirmPassword"
            placeholder="비밀번호 확인"
            name="confirmPassword"
            type="password"
            {...register('confirmPassword', {
              validate: (value) =>
                value === watch('password', '') || '비밀번호가 일치하지 않습니다.',
            })}
            autoComplete="off"
            onPaste={(e) => {
              e.preventDefault();
              return false;
            }}
            className={`input form-control ${errors.confirmPassword && 'invalid'}`}
            required
            onKeyUp={() => {
              trigger('confirmPassowrd');
            }}
          />
          <div className="checkBox">
            <p className={`point_text ${errors.check && 'checkActive'}`}>{errors.check?.message}</p>
            <div className="all">
              <label className="label check">
                <input
                  className={`label__checkbox ${errors.check && 'invalid'}`}
                  {...register('privacy_check', {
                    required: '약관에 동의 해주세요',
                  })}
                  required
                  type="checkbox"
                  onKeyUp={() => {
                    trigger('privacy_check');
                  }}
                />
                <span className="label__icon">
                  <span className="label__check">
                    <ImCheckmark2 className="icon" />
                  </span>
                </span>
                <span className="text">
                  <Link href="privacy/terms">이용약관</Link> 및{' '}
                  <Link href="privacy/terms">개인정보 취급방침</Link>에 동의합니다. (필수)
                </span>
              </label>
            </div>
          </div>
          <button
            type={isValid ? 'submit' : 'button'}
            className={`submit ${isValid && 'possible'}`}
            disabled={isLoading}
          >
            <span>회원가입</span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUpEmail;
