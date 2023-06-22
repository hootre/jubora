'use client';
import React, { useCallback, useState } from 'react';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './Category.scss';
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
    <ul className="selectTextBox_container" onClick={toggleCategotyState}>
      <div>
        <span>{title}</span>
        {isCategotyState ? (
          <AiFillCaretUp className="icon" />
        ) : (
          <AiFillCaretDown className="icon" />
        )}
      </div>
      <div className={isCategotyState ? 'drop_down active' : 'drop_down'}>
        <ul>
          {categoryList &&
            categoryList.map((item, idx) => (
              <li key={item.id} className={pathName === item.category_table ? 'cur_category' : ''}>
                <Link href={item.url}>{item.category_name}</Link>
              </li>
            ))}
        </ul>
      </div>
    </ul>
  );
};
