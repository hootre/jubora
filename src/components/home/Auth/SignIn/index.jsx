'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import User from 'hooks/supabase/auth/useUser';

function SignIn({ authType, setAuthType }) {
  // form
  const {
    register,
    handleSubmit,
    trigger,
    formState: { isValid, errors },
  } = useForm();
  // auth
  const { useSignIn } = User();
  const { mutate: basicLogin, isLoading } = useSignIn();
  const router = useRouter();
  return (
    <div>
      <div className="title">
        <h2>편리한 이용을 위해</h2>
        <h1>로그인이 필요합니다</h1>
      </div>
      <ul className="login_util">
        <li
          role="presentation"
          className={authType === 'signIn' ? 'active' : ''}
          onClick={() => setAuthType('signIn')}
        >
          로그인
        </li>
        <li
          role="presentation"
          className={authType === 'signUp' ? 'active' : ''}
          onClick={() => setAuthType('signUp')}
        >
          회원가입
        </li>
      </ul>
      <main>
        <form
          className="form_box"
          onSubmit={handleSubmit((data) =>
            basicLogin(data, {
              onSuccess: ({ user }) => {
                if (user) {
                  router.push('/');
                }
              },
            })
          )}
        >
          <p className={`point_text ${errors.email && 'active'}`}>{errors.email?.message} </p>
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
          <span
            role="presentation"
            className="passwordForget"
            onClick={() => setAuthType('forgetPassword')}
          >
            아이디/비밀번호 찾기
          </span>

          <button
            type={isValid ? 'submit' : 'button'}
            className={`submit ${isValid && 'possible'}`}
            disabled={isLoading}
          >
            <span>로그인</span>
          </button>

          {/* <div className="social_login_box">
            <button type="button" className="googleBtn" onClick={googleLogin}>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                <g id="logo_google" transform="translate(5 3.973)">
                  <path
                    id="사각형_5282"
                    fill="none"
                    d="M0 0H32V32H0z"
                    data-name="사각형 5282"
                    transform="translate(-5 -3.973)"
                  />
                  <path
                    id="패스_6627"
                    fill="#4285f4"
                    d="M283.466 225.5a13.918 13.918 0 0 0-.2-2.4H272.1v4.557h6.392a5.478 5.478 0 0 1-2.365 3.6v2.957h3.813a11.557 11.557 0 0 0 3.526-8.714z"
                    data-name="패스 6627"
                    transform="translate(-261.267 -213.371)"
                  />
                  <path
                    id="패스_6628"
                    fill="#34a853"
                    d="M39.475 333.866a11.328 11.328 0 0 0 7.844-2.857l-3.813-2.957a7.177 7.177 0 0 1-10.67-3.752H28.9v3.048a11.835 11.835 0 0 0 10.575 6.518z"
                    data-name="패스 6628"
                    transform="translate(-28.641 -310.171)"
                  />
                  <path
                    id="패스_6629"
                    fill="#fbbc04"
                    d="M5.139 157.579a7.088 7.088 0 0 1 0-4.531V150h-3.93a11.844 11.844 0 0 0 0 10.627z"
                    data-name="패스 6629"
                    transform="translate(-.95 -143.45)"
                  />
                  <path
                    id="패스_6630"
                    fill="#ea4335"
                    d="M39.475 4.665a6.43 6.43 0 0 1 4.539 1.774l3.378-3.379a11.373 11.373 0 0 0-7.917-3.078A11.831 11.831 0 0 0 28.9 6.5l3.931 3.048a7.078 7.078 0 0 1 6.644-4.883z"
                    data-name="패스 6630"
                    transform="translate(-28.641 .046)"
                  />
                </g>
              </svg>
            </button>
            <button type="button" className="kakaoBtn" onClick={googleLogin}>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                <g id="logo_kakao" transform="translate(3 4)">
                  <path
                    id="사각형_5283"
                    fill="none"
                    d="M0 0H32V32H0z"
                    data-name="사각형 5283"
                    transform="translate(-3 -4)"
                  />
                  <path
                    id="합치기_5"
                    fill="#3e2723"
                    d="M4.325 22.294l1.6-3.7C2.363 16.8 0 13.657 0 10.071 0 4.509 5.685 0 12.7 0s12.7 4.509 12.7 10.071-5.689 10.071-12.7 10.071a15.976 15.976 0 0 1-2.585-.209L5.289 23.1a1.218 1.218 0 0 1-.622.233c-.467.002-.534-.592-.342-1.039z"
                    data-name="합치기 5"
                  />
                  <path
                    id="합치기_6"
                    fill="#ffeb3b"
                    d="M8.788 6.853L8.405 5.8H5.7l-.329.906a.657.657 0 1 1-1.233-.446L6.161.7a.655.655 0 0 1 .124-.206.932.932 0 0 1 1.244-.245.657.657 0 0 1 .4.394l2.1 5.76a.658.658 0 0 1-.393.842.671.671 0 0 1-.224.039.658.658 0 0 1-.624-.431zM6.18 4.488h1.746l-.873-2.4zM1.97 6.459V1.423H.657a.657.657 0 1 1 0-1.313H4.6a.657.657 0 0 1 0 1.313H3.284v5.036a.657.657 0 0 1-1.314 0zm9.09.651H10.976a.686.686 0 0 1-.686-.686V.8a.686.686 0 0 1 1.372 0v5h1.972a.656.656 0 1 1 0 1.312zm6.691-.338l-1.794-2.38-.3.3V6.35a.657.657 0 0 1-1.314 0V.657a.657.657 0 0 1 1.314 0v2.181L17.788.706a.657.657 0 1 1 .929.929l-1.822 1.82 1.9 2.526a.657.657 0 0 1-1.049.791z"
                    data-name="합치기 6"
                    transform="translate(2.846 7.115)"
                  />
                </g>
              </svg>
            </button>
          </div> */}
        </form>
      </main>
    </div>
  );
}

export default SignIn;
