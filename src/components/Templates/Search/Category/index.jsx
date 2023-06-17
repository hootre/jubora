'use client';
import React, { useCallback, useState } from 'react';
import { CategoryBox } from './styles';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import Link from 'next/link';

export const Category = ({ list, category, queryName }) => {
  const [isCategotyState, setIsCategotyState] = useState(false);
  const toggleCategotyState = useCallback(() => {
    setIsCategotyState((prev) => !prev);
  }, [isCategotyState]);

  return (
    <CategoryBox className="selectTextBox" onClick={toggleCategotyState}>
      <div>
        <span>{list[category > 0 ? category : 0]?.title}</span>
        {isCategotyState ? (
          <AiFillCaretUp className="icon" />
        ) : (
          <AiFillCaretDown className="icon" />
        )}
      </div>
      <div className={isCategotyState ? 'dropDown active' : 'dropDown'}>
        <ul>
          {list &&
            list.map((item, idx) => (
              <li key={idx} className={category === idx ? 'curCategory' : ''}>
                <Link href={`${category}?${queryName}=${item.id}`}>{item.title}</Link>
              </li>
            ))}
        </ul>
      </div>
    </CategoryBox>
  );
};
