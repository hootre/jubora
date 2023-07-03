'use client';
import React, { useCallback, useState } from 'react';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './Category.scss';
export const Category = ({ categoryList }) => {
  let pathName = usePathname().split('/')[2];
  if (!pathName) {
    pathName = 'all';
  }
  const [isCategotyState, setIsCategotyState] = useState(false);
  const toggleCategotyState = () => {
    setIsCategotyState((prev) => !prev);
  };
  const title = categoryList.filter((item) => pathName === item.category_table)[0]?.category_name;
  return (
    <ul className="selectTextBox_container" onClick={toggleCategotyState}>
      <div>
        <span>{pathName === 'all' ? '전체' : title}</span>
        {isCategotyState ? (
          <AiFillCaretUp className="icon" />
        ) : (
          <AiFillCaretDown className="icon" />
        )}
      </div>
      <div className={isCategotyState ? 'drop_down active' : 'drop_down'}>
        <ul>
          <li key="0" className={pathName === 'all' && 'cur_category'}>
            <Link href={`/templates`}>전체</Link>
          </li>
          {categoryList &&
            categoryList.map((item, idx) => (
              <li key={item.id} className={pathName === item.category_table ? 'cur_category' : ''}>
                <Link href={`/templates/${item.category_table}`}>{item.category_name}</Link>
              </li>
            ))}
        </ul>
      </div>
    </ul>
  );
};
