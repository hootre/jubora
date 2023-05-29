'use client';
import logo from 'assets/MainPage/logo.png';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { VIEWS, useAuth } from '../AuthProvider';
import { AuthBox } from '../styles';

const ResetPassword = () => {
  const { setView, onResetPassword } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm();

  return (
    <AuthBox>
      <div>
        <div>
          <div className="titleLogo">
            <a href="#">
              <Image src={logo} alt="" />
            </a>
          </div>
          <form onSubmit={handleSubmit(onResetPassword)}>
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
            <button className="button-inverse w-full submit" type="submit">
              비밀번호 초기화
            </button>
            <ul className="login_util">
              <div className="util_btn">아이디 찾기</div>
              <div className="util_btn" onClick={() => setView(VIEWS.SIGN_IN)}>
                로그인
              </div>
              <div className="util_btn" onClick={() => setView(VIEWS.SIGN_UP)}>
                회원가입
              </div>
            </ul>
          </form>
        </div>
      </div>
    </AuthBox>
  );
};

export default ResetPassword;
