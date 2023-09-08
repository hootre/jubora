'use client';
import React from 'react';
import { LoginRequest_container } from './style';
import { useTemplatesActions } from 'store';

export const LoginRequest = () => {
  //Auth Modal 관련
  // zustand
  const { setAuthState } = useTemplatesActions();
  return (
    <LoginRequest_container>
      <div className="text_box">
        <h1>로그인 후 이용가능합니다</h1>
      </div>
      <div className="btn_box">
        <button className="signUp" onClick={setAuthState}>
          회원가입
        </button>
        <button className="signIn" onClick={setAuthState}>
          로그인
        </button>
      </div>
    </LoginRequest_container>
  );
};
