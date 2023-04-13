import React, { useCallback, useState } from 'react';
import { TemplatesContentsBox } from './styles';
import 'react-tabs/style/react-tabs.css';
import { categoryList, mainShowTemplatesList } from 'assets/data';
import { TemplatesSixContent } from './TemplatesSixContent';

export const TemplatesContents = () => {
  const [currentTabNum, setCurrentTabNum] = useState(0);
  const [currentItemNum, setCurrentItemNum] = useState([0, 0, 0, 0, 0, 0]);
  const hendleCurrentTab = useCallback((index) => {
    setCurrentTabNum(index);
  }, []);
  const hendleCurrentItem = useCallback(
    (num) => {
      currentItemNum[currentTabNum] = num;
      setCurrentItemNum([...currentItemNum]);
    },
    [currentItemNum, currentTabNum]
  );
  return (
    <TemplatesContentsBox>
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
      {
        <TemplatesSixContent
          templatesList={mainShowTemplatesList[currentTabNum]}
          category={categoryList[currentTabNum]}
          currentItemNum={currentItemNum[currentTabNum]}
          hendleCurrentItem={hendleCurrentItem}
        />
      }
    </TemplatesContentsBox>
  );
};
