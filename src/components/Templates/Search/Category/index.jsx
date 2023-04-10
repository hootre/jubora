import React, { useEffect, useState } from 'react';
import { CategoryBox } from './styles';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import Link from 'next/link';
import { useRouter } from 'next/router';

export const Category = ({ categoryList, router, category, queryName }) => {
  const [isCategotyState, setIsCategotyState] = useState(false);
  const toggleCategotyState = () => {
    setIsCategotyState((prev) => !prev);
  };
  return (
    <CategoryBox className="selectTextBox" onClick={toggleCategotyState}>
      <div>
        <span>{categoryList[category == undefined ? 0 : category][1]}</span>
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
              <li key={idx} className={category === idx ? 'curCategory' : ''}>
                <Link href={`${router.pathname}?${queryName}=${item[0]}`}>{item[1]}</Link>
              </li>
            ))}
        </ul>
      </div>
    </CategoryBox>
  );
};
