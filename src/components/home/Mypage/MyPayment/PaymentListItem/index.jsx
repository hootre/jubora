import React, { useState } from 'react';
import { PaymentListItem_container } from './style';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const PaymentListItem = ({ item: { id, name, pg, amount, created_at } }) => {
  const pathName = usePathname();

  return (
    <PaymentListItem_container>
      <div>
        <span className="date">{String(created_at).substring(0, 10)}</span>
        <span className="title">
          <Link href={`${pathName}/${id}`}>{name}</Link>
        </span>
        <span className="orderId">{pg}</span>
        <span className="price_box">
          <span>
            <span className="price">{amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>{' '}
            원
          </span>
          <button>영수증</button>
          <button>견적서</button>
        </span>
      </div>
    </PaymentListItem_container>
  );
};
