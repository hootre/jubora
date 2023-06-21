'use client';
import { filterItemList } from 'assets/data';
import { Search } from 'components/Templates/Search';
import { FilterAside } from 'components/Templates/Search/FilterAside';
import { Showcase } from 'components/Templates/Showcase';
import React from 'react';
import styles from './templates.module.scss';
import { useTemplates } from 'hooks/templates/useTemplates';
const templates = () => {
  const { useGetTemplates, useGetCategory } = useTemplates();

  const { data: templatesList, isInitialLoading } = useGetTemplates('banner_row');
  const { data: categoryList, isInitialLoading: isCategory } = useGetCategory();
  // if (isInitialLoading) {
  //   return <h1>Loading...</h1>;
  // }
  if (!templatesList || !categoryList) {
    return null;
  }
  return (
    <section className={styles.templats_container}>
      <FilterAside filterItemList={filterItemList} />
      <main>
        <Search categoryList={categoryList} />
        <Showcase templatesList={templatesList} categoryList={categoryList} />
      </main>
    </section>
  );
};
export default templates;
