import Image from 'next/image';
import logo from 'assets/MainPage/logo.png';
import React, { useState } from 'react';
import { RegisterBox } from './styles';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { createUser } from 'api/firebase';
const Register = () => {
  const router = useRouter();
  const {
    handleSubmit,
    formState: { errors },
    trigger,
    register,
    watch,
  } = useForm();

  async function onhandleSubmit(data) {
    //console.log(data)
    try {
      await createUser(data.email, data.password, data.name);
      router.push('/');
      alert('회원가입이 완료되었습니다');
    } catch (error) {
      console.log(error);
      alert('생성실패');
      alert(error);
    }
  }
  return (
    <RegisterBox>
      <div>
        <div>
          <div className="title">
            <a href="#">
              <Image src={logo} alt="img" />
            </a>
          </div>
          <form onSubmit={handleSubmit(onhandleSubmit)}>
            <div className="emailLabel">
              <label htmlFor="email">회원가입</label>
            </div>
            {errors.name && <small className="text-danger">이름/회사명은 필수입니다.</small>}
            <input
              name="name"
              type="name"
              placeholder="이름/회사명"
              className={`input form-control ${errors.name && 'invalid'}`}
              required={true}
              defaultValue=""
              {...register('name', { required: 'Fullname is Required!!!' })}
              onKeyUp={() => {
                trigger('name');
              }}
            />{' '}
            {errors.email && <small className="text-danger">{errors.email.message} </small>}
            <input
              id="email"
              placeholder="이메일"
              className="input"
              name="email"
              type="email"
              required={true}
              {...register('email', {
                required: '이메일은 필수입니다',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'ex) abc@def.gh',
                },
              })}
              onKeyUp={() => {
                trigger('email');
              }}
            ></input>
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
                  value:
                    '^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[d]){1,})(?=(.*[W]){    1,})(?!.*s).{8,}$',
                  message: '1개이상의 숫자와 1개이상의 특수문자를 포함해야합니다.',
                },
                minLength: {
                  value: 8,
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
            {errors.confirmPassword && (
              <small className="text-danger">{errors.confirmPassword.message} </small>
            )}
            <input
              id="confirmPassword"
              placeholder="비밀번호 확인"
              name="confirmPassword"
              type="password"
              {...register('confirmPassword', {
                validate: (value) =>
                  value === watch('password', '') || 'The passwords do not match',
              })}
              autoComplete="off"
              onPaste={(e) => {
                e.preventDefault();
                return false;
              }}
              className={`input form-control ${errors.confirmPassword && 'invalid'}`}
              required={true}
              onKeyUp={() => {
                trigger('confirmPassowrd');
              }}
            />
            <button type="submit" className="submit">
              <span>회원가입</span>
            </button>
          </form>
        </div>
      </div>
    </RegisterBox>
  );
};

export default Register;
