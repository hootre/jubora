'use client';
import React from 'react';
import './TagList.scss';
import { AiOutlineClose } from 'react-icons/ai';
import { useTemplateTagList } from 'store';
import { useTemplatesActions } from 'store';

export const TagList = () => {
  const TagList = useTemplateTagList();
  const { setDeleteTemplateTagList } = useTemplatesActions();
  const handleDeleteTag = (id) => {
    setDeleteTemplateTagList(id);
  };
  return (
    <section className="tagList_container">
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
    </section>
  );
};
