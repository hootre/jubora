'use client';
import React, { useCallback, useState } from 'react';
import { CategoryBox } from './styles';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Category = ({ categoryList }) => {
  let pathName = usePathname().split('/')[2];
  if (!pathName) {
    pathName = 'banner_row';
  }
  const [isCategotyState, setIsCategotyState] = useState(false);
  const toggleCategotyState = () => {
    setIsCategotyState((prev) => !prev);
  };
  const title = categoryList.filter((item) => pathName === item.category_table)[0].category_name;
  return (
    <CategoryBox className="selectTextBox" onClick={toggleCategotyState}>
      <div>
        <span>{title}</span>
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
              <li key={item.id} className={pathName === item.category_table ? 'curCategory' : ''}>
                <Link href={item.url}>{item.category_name}</Link>
              </li>
            ))}
        </ul>
      </div>
    </CategoryBox>
  );
};
