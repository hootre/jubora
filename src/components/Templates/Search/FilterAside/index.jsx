import React, { useState } from 'react';
import { FilterAsideBox } from './styles';
import { HiOutlineChevronDoubleLeft } from 'react-icons/hi';
import { AsideListItem } from './AsideListItem';
import { useRecoilState } from 'recoil';
import { isCurFilterState } from 'states';

export const FilterAside = ({ filterItemList }) => {
  const [isCurFilter, setIsCurFilter] = useRecoilState(isCurFilterState);

  const hendleFilterState = () => {
    setIsCurFilter((prev) => !prev);
  };
  return (
    <FilterAsideBox className={isCurFilter ? 'filterOpen' : ''}>
      <div className="filterBox">
        <div className="fiterTitle">
          <div className="title">
            <img src="https://weenidy.com/assets/icons/icn-fillter-navy-d.png" alt="" />
            <h2>필터</h2>
          </div>
          <HiOutlineChevronDoubleLeft className="icon" onClick={hendleFilterState} />
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
