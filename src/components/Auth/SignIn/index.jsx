'use client';

import logo from 'assets/MainPage/logo.png';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useUser } from 'hooks/auth/useUser';
import { useEffect } from 'react';
import '.././Auth.scss';
const SignIn = () => {
  // form
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { isValid, errors },
  } = useForm();
  //auth
  const { useSignIn, useSignInGoogle } = useUser();
  const { mutate: basicLogin, isLoading, isSuccess } = useSignIn();
  const { mutate: googleLogin, isSuccess: googleSuccess } = useSignInGoogle();
  const router = useRouter();
  useEffect(() => {
    if (isSuccess) {
      router.push('/');
    }
  }, [isSuccess]);

  if (googleSuccess) {
    console.log('구글 로그인 완료');
  }
  return (
    <section className="auth_container">
      <div>
        <div>
          <div className="titleLogo">
            <a href="#">
              <Image src={logo} alt="" />
            </a>
          </div>
          <form onSubmit={handleSubmit(basicLogin)}>
            <div className="titleLabel">
              <label htmlFor="titleLabel">로그인</label>
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
            <p className={`pointText ${errors.password && 'active'}`}>
              {errors.password?.message}{' '}
            </p>
            <input
              name="password"
              placeholder="비밀번호"
              id="password"
              type="password"
              autoComplete="off"
              className={`input form-control ${errors.password && 'invalid'}`}
              required={true}
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
            ></input>
            <button
              type={isValid ? 'submit' : 'button'}
              className={`submit ${isValid && 'possible'}`}
              disabled={isLoading}
            >
              <span>로그인</span>
            </button>
            <ul className="login_util">
              <Link className="util_btn" href="/auth/signup">
                아이디 찾기
              </Link>
              <Link className="util_btn" href="/auth/reset">
                비밀번호 찾기
              </Link>
              <Link className="util_btn" href="/auth/signup">
                회원가입
              </Link>
            </ul>
            <div className="webLogin">
              <button type="button" className="googleBtn" onClick={googleLogin}>
                <span>
                  <svg viewBox="0 0 57 56" className="css-1h47l4s">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M41.6657 28.3122C41.6657 27.34 41.5789 26.4044 41.4158 25.5068H28.5V30.8112H35.8813C35.5629 32.5255 34.5968 33.9792 33.1446 34.9514V38.3922H37.5758C40.1693 36.0044 41.6657 32.4889 41.6657 28.3122Z"
                      fill="#3D82F0"
                    ></path>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M28.5003 41.7146C32.2032 41.7146 35.3072 40.4864 37.5761 38.3927L33.1449 34.9504C31.9167 35.7733 30.3457 36.2594 28.5003 36.2594C24.9285 36.2594 21.9053 33.8472 20.8264 30.606H16.2443V34.1595C18.5011 38.6411 23.1396 41.7146 28.5003 41.7146Z"
                      fill="#31A752"
                    ></path>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M20.8261 30.606C20.5518 29.7831 20.3964 28.9039 20.3964 28.0002C20.3964 27.0966 20.5518 26.2174 20.8261 25.3945V21.841H16.244C15.316 23.6924 14.7857 25.7877 14.7857 28.0002C14.7857 30.2128 15.316 32.3081 16.244 34.1595L20.8261 30.606Z"
                      fill="#F9BA00"
                    ></path>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M28.5003 19.7407C30.5133 19.7407 32.322 20.4325 33.7422 21.7917L37.6767 17.8588C35.3011 15.6447 32.1971 14.2855 28.5003 14.2855C23.1396 14.2855 18.5011 17.359 16.2443 21.842L20.8264 25.394C21.9053 22.1529 24.9285 19.7407 28.5003 19.7407Z"
                      fill="#E64234"
                    ></path>
                  </svg>
                </span>
                <p>Google</p>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
