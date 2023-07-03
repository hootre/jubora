'use client';
import React, { useEffect, useId, useLayoutEffect, useState, useTransition } from 'react';
import { Board } from 'components/Board';
import { sianDataList } from 'assets/data';

const sian = () => {
  const headerList = ['번호', '제목', '진행상태', '고객사', '날짜'];
  return (
    <section className="page_container">
      <Board boardDataList={sianDataList} headerList={headerList} />
    </section>
  );
};
export default sian;
