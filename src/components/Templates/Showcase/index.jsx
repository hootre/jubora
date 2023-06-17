'use client';
import { filterList } from 'assets/data';
import React from 'react';
import { Category } from '../Search/Category';
import { ShowcaseBox } from './styles';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';
import { useDetailFilterState } from 'store';

export const Showcase = ({ showCaseList }) => {
  let sort = usePathname().substring(1);
  console.log(sort);
  sort = sort === undefined ? 0 : sort;
  const { detailFilterState } = useDetailFilterState();
  let filterList = showCaseList.filter((v) => v.class === sort);

  return (
    <ShowcaseBox>
      <div className="topNav">
        <h2 className="title">{filterList.length}개의 디자인이 있습니다.</h2>
        <Category list={filterList} category={sort} queryName={'sort'} />
      </div>
      <div className="showcase">
        <ul>
          {showCaseList &&
            showCaseList
              .filter((v) => v.class === sort)
              .sort((a, b) => {
                if (detailFilterState === 0) {
                  return new Date(b.date) - new Date(a.date);
                } else if (detailFilterState === 1) {
                  return new Date(b.views) - new Date(a.views);
                } else {
                  return new Date(b.sales) - new Date(a.sales);
                }
              })
              .map((item, idx) => {
                return (
                  <li key={item.id} className={item.class}>
                    <div>
                      <img src={item.img} alt="현수막이미지" />
                      <AwesomeButton type="primary" className="choice">
                        <Link href={`detail/${item.id}`}>선택</Link>
                      </AwesomeButton>
                    </div>
                  </li>
                );
              })}
        </ul>
      </div>
    </ShowcaseBox>
  );
};
