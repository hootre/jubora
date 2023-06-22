'use client';
import React from 'react';
import { HiOutlineChevronDoubleLeft } from 'react-icons/hi';
import { AsideListItem } from './AsideListItem';
import { useTemplatesActions } from 'store';
import { useIsCurrentFilter } from 'store';
import './FilterAside.scss';

export const FilterAside = ({ filterItemList }) => {
  const isCurrentFilter = useIsCurrentFilter();
  const { setIsCurrentFilter } = useTemplatesActions();
  return (
    <aside
      className={isCurrentFilter ? 'filter_open filterAside_container' : 'filterAside_container'}
    >
      <div className="filter_box">
        <div className="fiter_title">
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
    </aside>
  );
};
