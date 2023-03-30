import React, { useState } from 'react';
import { CategoryBox } from './styles';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';

export const Category = ({ categoryList, state, hendle }) => {
  const [isCategotyState, setIsCategotyState] = useState(false);
  const toggleCategotyState = () => {
    setIsCategotyState((prev) => !prev);
  };

  return (
    <CategoryBox className="selectTextBox" onClick={toggleCategotyState}>
      <div>
        <span>{categoryList[state][1]}</span>
        {isCategotyState ? (
          <AiFillCaretUp className="icon" />
        ) : (
          <AiFillCaretDown className="icon" />
        )}
      </div>
      <div className={isCategotyState ? 'dropDown active' : 'dropDown'}>
        <ul>
          {categoryList &&
            categoryList.map((item, idx) => (
              <li onClick={() => hendle(item[0])} className={state === idx ? 'curCategory' : ''}>
                <span>{item[1]}</span>
              </li>
            ))}
        </ul>
      </div>
    </CategoryBox>
  );
};
