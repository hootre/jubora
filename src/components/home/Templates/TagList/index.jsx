'use client';

import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useTemplateTagList, useTemplatesActions } from 'store';

import TagListContainer from './style';

export default function TagList() {
  // zustand
  const TagData = useTemplateTagList();
  const { setToggleTemplateTagList } = useTemplatesActions();
  const handleDeleteTag = (item) => {
    setToggleTemplateTagList(item);
  };

  return (
    <TagListContainer className="tagListContainer">
      <ul>
        {TagData &&
          TagData.map((item) => (
            <li key={item} className="tag_btn">
              {item}
              <AiOutlineClose className="icon" onClick={() => handleDeleteTag(item)} />
            </li>
          ))}
      </ul>
    </TagListContainer>
  );
}
