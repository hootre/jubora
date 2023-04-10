import { filterList } from 'assets/data';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { detailFilterState } from 'states';
import { Category } from '../Search/Category';
import { ShowcaseBox } from './styles';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';

export const Showcase = ({ showCaseList }) => {
  const router = useRouter();
  let { category } = router.query;
  category = category === undefined ? 0 : category;
  const [detailFilter, setDetailFilter] = useRecoilState(detailFilterState);
  let listLength = showCaseList.filter((v) => v.class == category);

  return (
    <ShowcaseBox>
      <div className="topNav">
        <h2 className="title">{listLength.length}개의 디자인이 있습니다.</h2>
        <Category
          categoryList={filterList}
          router={router}
          category={category}
          queryName={'sort'}
        />
      </div>
      <div className="showcase">
        <ul>
          {showCaseList &&
            showCaseList
              .filter((v) => v.class == category)
              .sort((a, b) => {
                if (detailFilter == 0) {
                  return new Date(b.date) - new Date(a.date);
                } else if (detailFilter == 1) {
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
