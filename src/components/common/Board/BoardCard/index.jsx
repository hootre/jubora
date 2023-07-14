import React from 'react';
import { BoardCard_container } from './style';
import Link from 'next/link';

export const BoardCard = ({ item: { id, title, image, name, created_at } }) => {
  return (
    <BoardCard_container>
      <Link href={`/order/${id}`}>
        <span className="id">{id}</span>
        <span className="state">[ 확인전 ]</span>
        <span className="title">{title}</span>
        <span className="name">{name}</span>
        <span className="date">{String(created_at).substring(5, 10)}</span>
      </Link>
    </BoardCard_container>
  );
};
