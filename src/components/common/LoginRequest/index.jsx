'use client';
import React from 'react';
import { LoginRequest_container } from './style';

export const LoginRequest = () => {
  return (
    <LoginRequest_container>
      <div className="text_box">
        <h1>로그인 후 이용가능합니다</h1>
      </div>
      <div className="btn_box">
        <button className="cancel">회원가입</button>
        <button className="delete">로그인</button>
      </div>
    </LoginRequest_container>
  );
};
