'use client';

import React from 'react';
import SignUpSocial from '../SignUpSocial/index.jsx';
import { useState } from 'react';
import SignUpEmail from '../SignUpEmail/index.jsx';

const SignUp = ({ authType, setAuthType }) => {
  const [signUpType, setSignUpType] = useState('SignUpSocial');
  return (
    <div>
      <div className="title">
        <h2>이 페이지는</h2>
        <h1>회원가입입니다</h1>
      </div>
      <div className="form_box">
        <ul className="login_util">
          <li
            className={authType === 'signIn' ? 'active' : ''}
            onClick={() => setAuthType('signIn')}
          >
            로그인
          </li>
          <li
            className={authType === 'signUp' ? 'active' : ''}
            onClick={() => setAuthType('signUp')}
          >
            회원가입
          </li>
        </ul>
        {/* {signUpType === 'SignUpSocial' ? (
          <main>
            <SignUpSocial setSignUpType={setSignUpType} />
          </main>
        ) : signUpType === 'signUpEmail' ? (
          <main>
            <SignUpEmail />
          </main>
        ) : (
          ''
        )} */}
        <main>
          <SignUpEmail />
        </main>
      </div>
    </div>
  );
};

export default SignUp;
