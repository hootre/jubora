'use client';
import React from 'react';
import { FilterAsideBox } from './styles';
import { HiOutlineChevronDoubleLeft } from 'react-icons/hi';
import { AsideListItem } from './AsideListItem';
import { useTemplatesActions } from 'store';
import { useIsCurrentFilter } from 'store';

export const FilterAside = ({ filterItemList }) => {
  const isCurrentFilter = useIsCurrentFilter();
  const { setIsCurrentFilter } = useTemplatesActions();
  return (
    <FilterAsideBox className={isCurrentFilter ? 'filterOpen' : ''}>
      <div className="filterBox">
        <div className="fiterTitle">
          <div className="title">
            <img src="https://weenidy.com/assets/icons/icn-fillter-navy-d.png" alt="" />
            <h2>필터</h2>
          </div>
          <HiOutlineChevronDoubleLeft className="icon" onClick={setIsCurrentFilter} />
        </div>
        <ul>
          {filterItemList &&
            filterItemList.map((item, idx) => {
              return <AsideListItem item={item} key={idx} />;
            })}
        </ul>
      </div>
    </FilterAsideBox>
  );
};
