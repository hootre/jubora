import React, { useState } from 'react';
import './SortDropdown.scss';
import { useTemplateSortType, useTemplatesActions } from 'store';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
export const SortDropdown = () => {
  const sort_list = ['최신순', '조회순', '판매순'];
  const [sortState, setSortState] = useState(false);
  const templateSortType = useTemplateSortType();
  const { setTemplateSortType } = useTemplatesActions();

  const toggleSortState = () => {
    setSortState((prev) => !prev);
  };
  const handleSetSortType = (item) => {
    setTemplateSortType(item);
    setSortState((prev) => !prev);
  };
  return (
    <div className="SortDropdown_container">
      <div className="sort_title" onClick={toggleSortState}>
        <button>{templateSortType}</button>
        {sortState ? <AiFillCaretUp className="icon" /> : <AiFillCaretDown className="icon" />}
      </div>
      <ul className={`${sortState && 'active'} `}>
        {sort_list.map((item, idx) => {
          return (
            <li key={idx} onClick={() => handleSetSortType(item)}>
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
