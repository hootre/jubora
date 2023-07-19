import React from 'react';
import Link from 'next/link';
import { TemplatesSixContent_container } from './style.jsx';
export const TemplatesSixContent = ({
  templatesList,
  category,
  currentItemNum,
  hendleCurrentItem,
}) => {
  return (
    <TemplatesSixContent_container>
      <div className="content">
        <section>
          <ul className={templatesList[currentItemNum].type}>
            {templatesList.map((item, idx) => {
              return (
                <li
                  key={item.id}
                  onClick={() => hendleCurrentItem(idx)}
                  className={currentItemNum === idx ? 'current_content' : ''}
                >
                  <img src={item.file} width={1200} height={1200} alt="img" />
                  <div className="purchase_box">
                    <div className="purchase">구매하기</div>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </TemplatesSixContent_container>
  );
};
