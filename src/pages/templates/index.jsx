import { showCaseList } from 'assets/data';
import { Search } from 'components/Detail/Search';
import { Showcase } from 'components/Detail/Showcase';
import React from 'react';
import { TemplatesBox } from './styles';

const templates = () => {
  return (
    <TemplatesBox>
      <Search />
      <Showcase showCaseList={showCaseList} />
    </TemplatesBox>
  );
};
export default templates;
