import React, { useState } from 'react';
import { HiChevronLeft } from 'react-icons/hi';
import './AsideListItem.scss';
export const AsideListItem = ({ item }) => {
  const [toggleItemState, setToggleItemState] = useState(false);
  const hendleItemState = () => {
    setToggleItemState((prev) => !prev);
  };

  return (
    <li className={toggleItemState ? 'open asideListItem_container' : 'asideListItem_container'}>
      <div className="title" onClick={hendleItemState}>
        <h2>{item.title}</h2>
        <HiChevronLeft className="icon" />
      </div>
      <div className="drop_filter">
        {item.items.map((item, idx) => {
          return (
            <div className="filter_item" key={idx}>
              {item}
            </div>
          );
        })}
      </div>
    </li>
  );
};
