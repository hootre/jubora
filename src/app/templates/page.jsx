'use client';
import { filterItemList, showCaseList } from 'assets/data';
import { Search } from 'components/Templates/Search';
import { FilterAside } from 'components/Templates/Search/FilterAside';
import { Showcase } from 'components/Templates/Showcase';
import React from 'react';
import { TemplatesBox } from './styles';

const templates = () => {
  return (
    <TemplatesBox>
      <FilterAside filterItemList={filterItemList} />
      <main>
        <Search />
        <Showcase showCaseList={showCaseList} />
      </main>
    </TemplatesBox>
  );
};
export default templates;
