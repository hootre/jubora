import React from 'react';
import { Link } from '@mui/material';
import MyPageModalContainer from './style';

export default function MypageModal({ user, signOut, toggleIsMypage }) {
  return (
    <MyPageModalContainer>
      <div
        role="presentation"
        className="back"
        onClick={toggleIsMypage}
        onKeyDown={toggleIsMypage}
      />
      <div className="content_box">
        <div className="head">
          <h1 className="name">{user?.name}</h1>
          <h2 className="email">{user?.email}</h2>
        </div>
        <div className="content">
          <ul>
            <li>
              <Link href="/home/mypage/my_info">내 정보</Link>
            </li>
            <li role="presentation" onClick={signOut}>
              로그아웃
            </li>
          </ul>
        </div>
      </div>
    </MyPageModalContainer>
  );
}
