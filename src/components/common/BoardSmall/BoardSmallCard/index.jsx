import React, { useState } from 'react';
import { BoardSmallCard_container } from './style';
import { SimpleDate } from 'utils/SimpleDate';

export const BoardSmallCard = ({ title, subTitle, created_at }) => {
  return (
    <BoardSmallCard_container>
      <div className="main_text">
        <h1 className="C_ellipsis">{title}</h1>
        <h2 className="C_ellipsis">{subTitle}</h2>
      </div>
      <span className="date">{SimpleDate(created_at, 'y')}</span>
    </BoardSmallCard_container>
  );
};
