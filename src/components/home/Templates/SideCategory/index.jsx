'use client';
import React from 'react';
import { useTemplatesActions } from 'store';
import { v4 } from 'uuid';
import { useTemplateTagList } from 'store';
import { SideCategory_container } from './style';
const categoryList = [
  {
    id: 1,
    title: '절기',
    category:
      '고난(사순절),부활절,맥추감사절,추수감사절,성탄절,송구연신,신년감사,어린이주일,스승의주일,어버이주일',
  },
];
export const SideCategory = () => {
  // zustand
  const { setAddTemplateTagList } = useTemplatesActions();
  const TagList = useTemplateTagList();
  const handleCategory = (category) => {
    setAddTemplateTagList({
      id: v4(),
      text: category,
    });
  };
  return (
    <SideCategory_container>
      {categoryList &&
        categoryList.map((category) => {
          return (
            <div key={category.id} className="category_box">
              <h2 className="category_title">{category.title}</h2>
              <ul>
                {category.category.split(',').map((item, idx) => {
                  return (
                    <li
                      key={idx}
                      className={`${TagList.includes(item) ? 'active' : ''}category_btn`}
                      onClick={() => handleCategory(item)}
                    >
                      {item}
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
    </SideCategory_container>
  );
};
