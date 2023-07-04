'use client';
import React, { useState } from 'react';
import 'react-tabs/style/react-tabs.css';
import { categoryList } from 'assets/data';
import { TemplatesSixContent } from './TemplatesSixContent';
import { useTemplates } from 'hooks/templates/useTemplates';
import { TemplatesContents_container } from './style.jsx';

export const TemplatesContents = () => {
  const [currentTabNum, setCurrentTabNum] = useState(0);
  const [currentItemNum, setCurrentItemNum] = useState([0, 0, 0, 0, 0, 0]);
  const { useGetSixTemplates } = useTemplates();
  const { data, isLoading } = useGetSixTemplates(categoryList[currentTabNum].table_name);

  const hendleCurrentTab = (index) => {
    setCurrentTabNum(index);
  };
  const hendleCurrentItem = (num) => {
    currentItemNum[currentTabNum] = num;
    setCurrentItemNum([...currentItemNum]);
  };
  if (isLoading) {
    return null;
  }
  return (
    <TemplatesContents_container>
      <ul className="nav">
        {categoryList.map((item, idx) => {
          return (
            <li
              key={item.id}
              className={currentTabNum === idx ? 'active' : ''}
              onClick={() => hendleCurrentTab(item.id)}
            >
              {item.title}
            </li>
          );
        })}
      </ul>
      {data.length === 0 ? (
        <h1>6개 미만입니다</h1>
      ) : (
        <TemplatesSixContent
          templatesList={data}
          category={categoryList[currentTabNum]}
          currentItemNum={currentItemNum[currentTabNum]}
          hendleCurrentItem={hendleCurrentItem}
        />
      )}
    </TemplatesContents_container>
  );
};
