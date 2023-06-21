'use client';
import { filterItemList } from 'assets/data';
import { Search } from 'components/Templates/Search';
import { FilterAside } from 'components/Templates/Search/FilterAside';
import { Showcase } from 'components/Templates/Showcase';
import React from 'react';
import styles from './templates.module.scss';
import { useTemplates } from 'hooks/templates/useTemplates';
const templates_category = ({ params: { category } }) => {
  const { useGetTemplates, useGetCategory } = useTemplates();

  const { data: templatesList, isInitialLoading } = useGetTemplates(category);
  const { data: categoryList } = useGetCategory();
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
        <h1>이건 </h1>
        <Showcase templatesList={templatesList} categoryList={categoryList} />
      </main>
    </section>
  );
};
export default templates_category;
