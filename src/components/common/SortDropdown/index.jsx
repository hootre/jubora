import React, { useState } from 'react';
import { useTemplateSortType, useTemplatesActions } from 'store';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import SortDropdownContainer from './style';

export default function SortDropdown() {
  const sortList = ['최신순', '조회순', '판매순'];
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
    <SortDropdownContainer>
      <button type="button" className="sort_title" onClick={toggleSortState}>
        <span>{templateSortType}</span>
        {sortState ? <AiFillCaretUp className="icon" /> : <AiFillCaretDown className="icon" />}
      </button>
      <div className={sortState ? 'drop_down active' : 'drop_down'}>
        <ul>
          {sortList.map((item) => (
            <li
              role="presentation"
              key={item}
              onClick={() => handleSetSortType(item)}
              className={templateSortType === item ? 'cur_category' : ''}
            >
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </SortDropdownContainer>
  );
}
