'use client';
import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useTemplateTagList } from 'store';
import { useTemplatesActions } from 'store';
import { TagList_container } from './style';

export const TagList = () => {
  // zustand
  const TagList = useTemplateTagList();
  const { setDeleteTemplateTagList } = useTemplatesActions();
  const handleDeleteTag = (id) => {
    setDeleteTemplateTagList(id);
  };
  return (
    <TagList_container className="tagList_container">
      <ul>
        {TagList &&
          TagList.map((item) => {
            return (
              <li key={item.id} className="tag_btn">
                {item.text}
                <AiOutlineClose className="icon" onClick={() => handleDeleteTag(item.id)} />
              </li>
            );
          })}
      </ul>
    </TagList_container>
  );
};
