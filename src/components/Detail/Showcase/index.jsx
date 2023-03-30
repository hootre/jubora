import { filterList } from 'assets/data';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { curCategoryState, detailFilterState } from 'states';
import { Category } from '../Search/Category';
import { ShowcaseBox } from './styles';

export const Showcase = ({ showCaseList }) => {
  const [category, setCategory] = useRecoilState(curCategoryState);
  const [detailFilter, setDetailFilter] = useRecoilState(detailFilterState);
  let listLength = showCaseList.filter((v) => v.class == category);
  const hendleCategoryNum = (num) => {
    setDetailFilter(num);
  };

  return (
    <ShowcaseBox>
      <div className="topNav">
        <h2 className="title">{listLength.length}개의 디자인이 있습니다.</h2>
        <Category categoryList={filterList} state={detailFilter} hendle={hendleCategoryNum} />
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
                      <h2>날짜 - {item.date}</h2>

                      <h2>조회수 - {item.views}</h2>

                      <h2>판매수 - {item.sales}</h2>
                      <img src={item.img} alt="현수막이미지" />
                    </div>
                  </li>
                );
              })}
        </ul>
      </div>
    </ShowcaseBox>
  );
};
