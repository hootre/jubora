'use client';
import React, { useState } from 'react';
import { Templates_Write_container } from './styles';
import { Templates_Real } from './Templates_Real';
import { Templates_Banner } from './Templates_Banner';
import { Templates_Print } from './Templates_Print';
import { Public_order_container } from 'components/home/Order/Order_writer_Item/style';
import { Read_Template } from 'components/admin/Read/Read_Template';

export const Templates_Write = () => {
  const [bannerState, setbannerState] = useState('banner');
  return (
    <Templates_Write_container>
      <h2 className="title">현수막 제품 등록</h2>
      <Public_order_container className="contents">
        <h2>카테고리</h2>
        <div className="C_basic_flex">
          <select
            className="C_basic_input"
            name="category"
            required
            value={bannerState}
            onChange={(e) => setbannerState(e.target.value)}
          >
            <option value="banner">현수막</option>
            <option value="print">인쇄물</option>
            <option value="real">실사</option>
          </select>
        </div>
      </Public_order_container>
      {bannerState === 'banner' ? (
        <Templates_Banner bannerState={bannerState} />
      ) : bannerState === 'print' ? (
        <Templates_Print bannerState={bannerState} />
      ) : (
        <Templates_Real bannerState={bannerState} />
      )}
      <Read_Template />
    </Templates_Write_container>
  );
};
