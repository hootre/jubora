import React from 'react';
import { MypageModalBox } from './styles';
import { logout } from 'api/firebase';
import { authState } from 'states';
import { useSetRecoilState } from 'recoil';

export const MypageModal = ({ user }) => {
  const setAuth = useSetRecoilState(authState);
  return (
    <MypageModalBox>
      <div className="head">
        <h1 className="name">{user.displayName}</h1>
        <h2 className="email">{user.email}</h2>
      </div>
      <div className="content">
        <ul>
          <li>내가 본 상품</li>
          <li>주문/배송 내역</li>
          <li
            onClick={() => {
              setAuth(null);
              logout();
            }}
          >
            로그아웃
          </li>
        </ul>
      </div>
    </MypageModalBox>
  );
};
