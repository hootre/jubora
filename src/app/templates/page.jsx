'use client';
import { Search } from 'components/Templates/Search';
import { Showcase } from 'components/Templates/Showcase';
import React from 'react';
import { useTemplates } from 'hooks/templates/useTemplates';
import { useTemplateSortType } from 'store';
import './templates.scss';
import { useTemplateTagList } from 'store';
import { TagList } from 'components/Templates/TagList';
import { SideCategory } from 'components/Templates/SideCategory';

const templates = () => {
  const { useGetALLTemplates, useGetCategory } = useTemplates();

  const { data: templatesList, isInitialLoading } = useGetALLTemplates();
  const { data: categoryList, isInitialLoading: isCategory } = useGetCategory();

  const SortType = useTemplateSortType();
  const tagList = useTemplateTagList();
  if (!templatesList || !categoryList) {
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
  // sort

  return (
    <>
      <section className="main_img_container">
        <div className="img_box"></div>
      </section>
      <section className="templats_container">
        <SideCategory />
        <main>
          <Search categoryList={categoryList} />
          <TagList />
          <Showcase templatesList={filterDataList} />
        </main>
      </section>
    </>
  );
};
export default templates;
