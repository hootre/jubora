'use client';
import logo from 'assets/MainPage/logo.png';
import { LoginBox } from './styles';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { VIEWS, useAuth } from '../AuthProvider';
import supabase from 'lib/supabase-browser';
import { toast } from 'react-hot-toast';

const ResetPassword = () => {
  const { setView } = useAuth();
  async function onResetPassword(formData) {
    const { error } = await supabase.auth.resetPasswordForEmail(formData?.email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SUPABASE_URL}`,
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success('비밀번호 초기화 성공!');
    }
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  console.log(watch('email'));

  return (
    <LoginBox>
      <div>
        <div>
          <div className="title">
            <a href="#">
              <Image src={logo} alt="" />
            </a>
          </div>
          <form onSubmit={handleSubmit(onResetPassword)}>
            <div className="emailLabel">
              <label htmlFor="email">로그인</label>
            </div>
            <input
              type="email"
              {...register('email', {
                pattern: {
                  value:
                    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                  message: '이메일 형식에 맞지 않습니다.',
                },
              })}
              id="email"
              className="Input"
              placeholder="이메일"
            />
            <button className="button-inverse w-full submit" type="submit">
              비밀번호 초기화
            </button>
            <div className="footerBtn">
              <button className="link" type="button" onClick={() => setView(VIEWS.SIGN_IN)}>
                Remember your password? Sign In.
              </button>
            </div>
          </form>
        </div>
      </div>
    </LoginBox>
  );
};

export default ResetPassword;
