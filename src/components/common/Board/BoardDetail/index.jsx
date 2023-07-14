import React from 'react';
import { BoardDetail_container } from './style';

export const BoardDetail = ({
  data: { title, name, image, contents, row, col, count, adderss_1, adderss_2, adderss_3 },
}) => {
  return (
    <BoardDetail_container>
      <div>
        <div>{title}</div>
        <div className="img">
          <img src={image} alt="contentImg" />
        </div>
        <div>{name}</div>
        <div>{`가로 : ${row} 세로 : ${col} ${count}개`}</div>
        <div>{`${adderss_1 ? adderss_1 : ''} ${adderss_2 ? adderss_2 : ''} ${
          adderss_3 ? adderss_3 : ''
        }`}</div>
        <div>{contents ? contents : ''}</div>
      </div>
    </BoardDetail_container>
  );
};
