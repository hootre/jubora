import React from 'react';
import { BoardCardHeader_container } from './style';

export const BoardCardHeader = () => {
  return (
    <BoardCardHeader_container>
      <div>
        <span className="id">번호</span>
        <span className="state">상태</span>
        <span className="title">제목</span>
        <span className="name">작성자</span>
        <span className="date">날짜</span>
      </div>
    </BoardCardHeader_container>
  );
};
