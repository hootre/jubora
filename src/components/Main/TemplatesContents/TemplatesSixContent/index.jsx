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
        <div className="side">
          <div className="nav">
            <div className="check">
              <Link
                href={`/templates/${category.table_name}/detail/${templatesList[currentItemNum].id}`}
                className="basic_button"
              >
                이 디자인 구매하기
              </Link>
            </div>
          </div>
          <section>
            <div className="header">
              <h1>다양한 디자인을 구경해보세요</h1>
              <Link href={`/templates/banner_row`}>전체보기</Link>
            </div>
            <ul className={templatesList[currentItemNum].type}>
              {templatesList.map((item, idx) => {
                return (
                  <li
                    key={item.id}
                    onClick={() => hendleCurrentItem(idx)}
                    className={currentItemNum === idx ? 'current_content' : ''}
                  >
                    <img src={item.file} width={1200} height={1200} alt="img" />
                  </li>
                );
              })}
            </ul>
          </section>
        </div>
      </div>
    </TemplatesSixContent_container>
  );
};
