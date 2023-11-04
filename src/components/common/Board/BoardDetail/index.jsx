import React from 'react';
import { BoardDetail_container } from './style';

export const BoardDetail = ({
  data: {
    title,
    name,
    image,
    contents,
    row,
    col,
    count,
    adderss_1,
    adderss_2,
    adderss_3,
    created_at,
  },
}) => {
  return (
    <BoardDetail_container>
      <div>
        <div className="title_box">
          <span className="title">{title}</span>
          <span className="name">{name}</span>
          <span className="created_at">{SimpleDate(data.created_at, 'm')}</span>
        </div>
        <div className="img">
          <img src={image} alt="contentImg" />
        </div>
        <div>{`가로 : ${row} 세로 : ${col} ${count}개`}</div>
        <div>{`${adderss_1 ? adderss_1 : ''} ${adderss_2 ? adderss_2 : ''} ${
          adderss_3 ? adderss_3 : ''
        }`}</div>
        <div>{contents ? contents : ''}</div>
      </div>
    </BoardDetail_container>
  );
};
