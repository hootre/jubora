'use client';
import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useTemplateTagList } from 'store';
import { useTemplatesActions } from 'store';
import { TagList_container } from './style';

export const TagList = () => {
  // zustand
  const TagList = useTemplateTagList();
  const { setToggleTemplateTagList } = useTemplatesActions();
  const handleDeleteTag = (item) => {
    setToggleTemplateTagList(item);
  };
  return (
    <TagList_container className="tagList_container">
      <ul>
        {TagList &&
          TagList.map((item) => {
            return (
              <li key={item} className="tag_btn">
                {item}
                <AiOutlineClose className="icon" onClick={() => handleDeleteTag(item)} />
              </li>
            );
          })}
      </ul>
    </TagList_container>
  );
};
