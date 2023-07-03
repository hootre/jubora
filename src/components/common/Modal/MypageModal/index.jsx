import React from 'react';
import './MyPageModal.scss';
export const MypageModal = ({ user, signOut, toggleIsMypage }) => {
  return (
    <article className="myPageModal_container">
      <div className="back" onClick={toggleIsMypage}></div>
      <div className="content_box">
        <div className="head">
          <h1 className="name">{user?.name}</h1>
          <h2 className="email">{user?.email}</h2>
        </div>
        <div className="content">
          <ul>
            <li>내가 본 상품</li>
            <li>주문/배송 내역</li>
            <li onClick={signOut}>로그아웃</li>
          </ul>
        </div>
      </div>
    </article>
  );
};
