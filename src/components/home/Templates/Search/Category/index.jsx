'use client';

import React, { useState } from 'react';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import useTemplatesTag from 'hooks/supabase/templatesTag/useTemplatesTag';
import MainLoading from 'components/Loading/MainLoading';
import SelectTextBoxContainer from './style';

export default function Category() {
  const { useGetTemplatesTag } = useTemplatesTag();
  const { data: tagList, error: tagListError } = useGetTemplatesTag();

  let pathName = usePathname().split('/')[2];
  if (!pathName) {
    pathName = 'banner_row';
  }
  const [isCategotyState, setIsCategotyState] = useState(false);
  const toggleCategotyState = () => {
    setIsCategotyState((prev) => !prev);
  };
  const title = tagList.filter((item) => pathName === item.from_nav)[0]?.title;
  if (tagListError) {
    return <MainLoading />;
  }
  return (
    <SelectTextBoxContainer onClick={toggleCategotyState}>
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
          {tagList &&
            tagList.map((item) => (
              <li key={item.id} className={pathName === item.from_nav ? 'cur_category' : ''}>
                <Link href={`/home/templates/${item.from_nav}`}>{item.title}</Link>
              </li>
            ))}
        </ul>
      </div>
    </SelectTextBoxContainer>
  );
}
