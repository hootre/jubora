import React from 'react';
import BoardCardHeaderContainer from './style';

export default function BoardCardHeader() {
  return (
    <BoardCardHeaderContainer>
      <div>
        <span className="id">번호</span>
        <span className="state">상태</span>
        <span className="title">제목</span>
        <span className="name">작성자</span>
        <span className="date">날짜</span>
      </div>
    </BoardCardHeaderContainer>
  );
}
