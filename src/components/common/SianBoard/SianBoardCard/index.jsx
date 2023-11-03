import React, { useState } from 'react';
import { SianBoardCard_container } from './style';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const SianBoardCard = ({ item: { id, title, state, price, created_at } }) => {
  const pathName = usePathname();

  return (
    <SianBoardCard_container>
      <div>
        <span className="date">{String(created_at).substring(0, 10)}</span>
        <span className="title">
          <Link href={`${pathName}/${id}`}>{title}</Link>
        </span>
        <span className="orderId">{id}</span>
        <span className="state">[{state}]</span>
        <span className="delivery">택배</span>
        <span className="price_box">
          <span>
            <span className="price">{price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>{' '}
            원
          </span>
        </span>
      </div>
    </SianBoardCard_container>
  );
};
