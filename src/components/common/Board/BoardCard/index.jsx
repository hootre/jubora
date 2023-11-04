import React, { useState } from 'react';
import { BoardCard_container } from './style';

export const BoardCard = ({
  item: { id, images, state, title, name, created_at },
  table,
  deleteItem,
}) => {
  return (
    <BoardCard_container>
      <div>
        <span className="id">{id}</span>
        <span className="state">[{state}]</span>
        <span className="title">{title}</span>
        <span className="name">{name}</span>
        <span className="date">{String(created_at).substring(5, 10)}</span>
      </div>
      {/* <button onClick={() => deleteItem({ id, images })} className="C_basic_button">
        삭제
      </button> */}
    </BoardCard_container>
  );
};
