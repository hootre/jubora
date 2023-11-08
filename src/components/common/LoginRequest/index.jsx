'use client';

import React from 'react';
import { useTemplatesActions } from 'store';
import LoginRequestContainer from './style';

export default function LoginRequest() {
  // Auth Modal 관련
  // zustand
  const { setAuthState } = useTemplatesActions();
  return (
    <LoginRequestContainer>
      <div className="text_box">
        <h1>로그인 후 이용가능합니다</h1>
      </div>
      <div className="btn_box">
        <button type="button" className="signUp" onClick={setAuthState}>
          회원가입
        </button>
        <button type="button" className="signIn" onClick={setAuthState}>
          로그인
        </button>
      </div>
    </LoginRequestContainer>
  );
}
