import React from 'react';
import simpleDate from 'utils/simpleDate';
import BoardDetailContainer from './style';

export default function BoardDetail({
  data: { title, name, image, contents, row, col, count, address1, address2, address3, createdAt },
}) {
  return (
    <BoardDetailContainer>
      <div>
        <div className="title_box">
          <span className="title">{title}</span>
          <span className="name">{name}</span>
          <span className="createdAt">{simpleDate(createdAt, 'm')}</span>
        </div>
        <div className="img">
          <img src={image} alt="contentImg" />
        </div>
        <div>{`가로 : ${row} 세로 : ${col} ${count}개`}</div>
        <div>{`${address1 || ''} ${address2 || ''} ${address3 || ''}`}</div>
        <div>{contents || ''}</div>
      </div>
    </BoardDetailContainer>
  );
}
