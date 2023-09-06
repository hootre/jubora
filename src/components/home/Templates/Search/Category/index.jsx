'use client';
import React, { useState } from 'react';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { categoryList } from 'assets/data';
import { SelectTextBox_container } from './style.jsx';
export const Category = () => {
  let pathName = usePathname().split('/')[2];
  if (!pathName) {
    pathName = 'banner_row';
  }
  const [isCategotyState, setIsCategotyState] = useState(false);
  const toggleCategotyState = () => {
    setIsCategotyState((prev) => !prev);
  };
  const title = categoryList.filter((item) => pathName === item.table_name)[0]?.title;
  return (
    <SelectTextBox_container onClick={toggleCategotyState}>
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
            categoryList.map((item) => (
              <li key={item.id} className={pathName === item.table_name ? 'cur_category' : ''}>
                <Link href={`/home/templates/${item.table_name}`}>{item.title}</Link>
              </li>
            ))}
        </ul>
      </div>
    </SelectTextBox_container>
  );
};
