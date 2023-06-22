'use client';
import React from 'react';
import Link from 'next/link';
import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';
import { SortDropdown } from 'components/common/SortDropdown';
import { useTemplateSortType } from 'store';
import './Showcase.scss';

export const Showcase = ({ templatesList }) => {
  const templateSortType = useTemplateSortType();
  return (
    <section className="showcase_container">
      <div className="top_nav">
        <h2 className="title">{templatesList?.length}개의 디자인이 있습니다.</h2>
        {/* <SortFilter categoryList={categoryList} /> */}
        <SortDropdown>Button</SortDropdown>
      </div>
      <div className="showcase">
        <ul>
          {templatesList &&
            templatesList
              .sort((a, b) => {
                if (templateSortType === '최신순') {
                  return new Date(b.created_at) - new Date(a.created_at);
                } else if (templateSortType === '조회순') {
                  return new Date(b.views) - new Date(a.views);
                } else {
                  return new Date(b.sales) - new Date(a.sales);
                }
              })
              .map((item) => {
                return (
                  <li key={item.id} className={item.type}>
                    <div>
                      <img src={item.file} alt="현수막이미지" />
                      <AwesomeButton type="primary" className="choice">
                        <Link href={`detail/${item.id}`}>선택</Link>
                      </AwesomeButton>
                    </div>
                  </li>
                );
              })}
        </ul>
      </div>
    </section>
  );
};
