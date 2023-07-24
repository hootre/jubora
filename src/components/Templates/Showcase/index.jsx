'use client';
import React from 'react';
import Link from 'next/link';
import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';
import { SortDropdown } from 'components/common/SortDropdown';
import './style.jsx';
import { useTemplates } from 'hooks/templates/useTemplates';
import { useTemplateSortType } from 'store';
import { useTemplateTagList } from 'store';
import { Showcase_container } from './style.jsx';
import { ImageItem } from 'components/common/ImageItem/index.jsx';

export const Showcase = ({ category }) => {
  const { useGetTemplates } = useTemplates();

  const { data: templatesList, isInitialLoading } = useGetTemplates(category);

  const SortType = useTemplateSortType();
  const tagList = useTemplateTagList();
  // if (isInitialLoading) {
  //   return <h1>Loading...</h1>;
  // }
  if (!templatesList) {
    return null;
  }
  let filterDataList = [];
  if (tagList.length > 0) {
    filterDataList = templatesList
      .filter((item) => {
        if (tagList.filter((tag) => item.title.includes(tag.text)).length === tagList.length) {
          return item;
        } else {
          return false;
        }
      })
      .sort((a, b) => {
        if (SortType === '최신순') {
          return new Date(b.created_at) - new Date(a.created_at);
        } else if (SortType === '조회순') {
          return new Date(b.views) - new Date(a.views);
        } else {
          return new Date(b.sales) - new Date(a.sales);
        }
      });
  } else {
    filterDataList = templatesList.sort((a, b) => {
      if (SortType === '최신순') {
        return new Date(b.created_at) - new Date(a.created_at);
      } else if (SortType === '조회순') {
        return new Date(b.views) - new Date(a.views);
      } else {
        return new Date(b.sales) - new Date(a.sales);
      }
    });
  }
  return (
    <Showcase_container>
      <div className="top_nav">
        <h2 className="title">{templatesList?.length}개의 디자인이 있습니다.</h2>
        {/* <SortFilter categoryList={categoryList} /> */}
        <SortDropdown>Button</SortDropdown>
      </div>
      <div className="showcase">
        <ul>
          {templatesList &&
            templatesList.map((item) => {
              return (
                <li key={item.id} className={item.type}>
                  <ImageItem
                    img_src={item.file}
                    href={`/templates/${item.category}/detail/${item.id}`}
                    text={'구매하기'}
                  />
                </li>
              );
            })}
        </ul>
      </div>
    </Showcase_container>
  );
};
