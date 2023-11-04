import React from 'react';
import { MyPageModal_container } from './style';
import { Link } from '@mui/material';

export const MypageModal = ({ user, signOut, toggleIsMypage }) => {
  return (
    <MyPageModal_container>
      <div className="back" onClick={toggleIsMypage}></div>
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
            <li onClick={signOut}>로그아웃</li>
          </ul>
        </div>
      </div>
    </MyPageModal_container>
  );
};
