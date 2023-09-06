'use client';
import logo from 'assets/MainPage/logo.png';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import useResetPassword from 'hooks/supabase/public/useResetPassword';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Auth_container } from '../style';

const ResetPassword = () => {
  const router = useRouter();
  const { mutate: resetPassword, isLoading, isSuccess } = useResetPassword();
  if (isSuccess) {
    router.push('/');
  }
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm();

  return (
    <Auth_container>
      <div>
        <div>
          <div className="titleLogo">
            <a href="#">
              <Image src={logo} alt="" />
            </a>
          </div>
          <form onSubmit={handleSubmit(resetPassword)}>
            <div className="titleLabel">
              <label htmlFor="titleLabel">비밀번호 초기화</label>
            </div>
            <p className={`pointText ${errors.email && 'active'}`}>{errors.email?.message} </p>
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
            <button className="button-inverse w-full submit" type="submit" disabled={isLoading}>
              비밀번호 초기화
            </button>
            <ul className="login_util">
              <Link className="util_btn" href="/home/auth/join">
                아이디 찾기
              </Link>
              <Link className="util_btn" href="/home/auth/login">
                로그인
              </Link>
              <Link className="util_btn" href="/home/auth/join">
                회원가입
              </Link>
            </ul>
          </form>
        </div>
      </div>
    </Auth_container>
  );
};

export default ResetPassword;
