import React, { useState } from 'react';
import { AsideListItemBox } from './styles';
import { HiChevronLeft } from 'react-icons/hi';
export const AsideListItem = ({ item }) => {
  const [toggleItemState, setToggleItemState] = useState(false);
  const hendleItemState = () => {
    setToggleItemState((prev) => !prev);
  };

  return (
    <AsideListItemBox className={toggleItemState ? 'open' : ''}>
      <div className="title" onClick={hendleItemState}>
        <h2>{item.title}</h2>
        <HiChevronLeft className="icon" />
      </div>
      <div className="dropFilter">
        {item.items.map((item, idx) => {
          return (
            <div className="filterItem" key={idx}>
              {item}
            </div>
          );
        })}
      </div>
    </AsideListItemBox>
  );
};
