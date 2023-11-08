'use client';

import React, { useState } from 'react';
import 'react-awesome-button/dist/styles.css';

import { Pagination, Stack } from '@mui/material';
import useTemplates from 'hooks/supabase/templates/useTemplates';
import MainLoading from 'components/Loading/MainLoading';
import GetValueImageItem from 'components/common/GetValueImageItem';
import SelectShowcaseContainer from './style';
import ItemTypeGroup from './ItemTypeGroup';

export default function SelectShowcase({ category = 'banner', toaggleModal }) {
  // 페이지 기본값
  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };
  // template 목록
  const { useGetTemplatesPage, useGetCategoryCount } = useTemplates();
  const { data: templatesList, isLoading } = useGetTemplatesPage(category, page);
  const { data: templatesCount } = useGetCategoryCount(category);
  // 가로,세로,포스터
  const [bannerType, setBannerType] = useState('banner_row');
  const handleBannerType = (e) => {
    setBannerType(e.target.value);
  };

  // zustand
  // const SortType = useTemplateSortType();
  // const tagList = useTemplateTagList();
  if (isLoading) {
    return <MainLoading />;
  }
  // let filterDataList = [];
  // if (tagList.length > 0) {
  //   filterDataList = templatesList
  //     .filter((item) => {
  //       if (tagList.filter((tag) => item.title.includes(tag.text)).length === tagList.length) {
  //         return item;
  //       }
  //       return false;
  //     })
  //     .sort((a, b) => {
  //       if (SortType === '최신순') {
  //         return new Date(b.createdAt) - new Date(a.createdAt);
  //       }
  //       if (SortType === '조회순') {
  //         return new Date(b.views) - new Date(a.views);
  //       }
  //       return new Date(b.sales) - new Date(a.sales);
  //     });
  // } else {
  //   filterDataList = templatesList.sort((a, b) => {
  //     if (SortType === '최신순') {
  //       return new Date(b.createdAt) - new Date(a.createdAt);
  //     }
  //     if (SortType === '조회순') {
  //       return new Date(b.views) - new Date(a.views);
  //     }
  //     return new Date(b.sales) - new Date(a.sales);
  //   });
  // }
  return (
    <SelectShowcaseContainer>
      <div className="filter_nav">
        <ItemTypeGroup bannerType={bannerType} handleBannerType={handleBannerType} />
      </div>
      <div className="top_nav">
        <h2 className="title">{templatesCount?.length}개의 디자인이 있습니다.</h2>
        {/* <SortFilter categoryList={categoryList} /> */}
      </div>
      <div className="showcase">
        <ul className={bannerType}>
          {templatesList &&
            templatesList.map((item) => (
              <li key={item.id}>
                {bannerType === 'banner_row' ? (
                  <GetValueImageItem
                    imgSrc={item.imgRow}
                    text="구매하기"
                    bannerType="banner_row"
                    toaggleModal={toaggleModal}
                  />
                ) : bannerType === 'banner_col' ? (
                  <GetValueImageItem
                    imgSrc={item.imgCol}
                    text="구매하기"
                    bannerType="banner_col"
                    toaggleModal={toaggleModal}
                  />
                ) : (
                  <GetValueImageItem
                    imgSrc={item.imgSquare}
                    text="구매하기"
                    bannerType="banner_square"
                    toaggleModal={toaggleModal}
                  />
                )}
              </li>
            ))}
        </ul>
      </div>
      <div className="pagenation">
        <Stack spacing={2}>
          <Pagination
            count={Math.ceil(templatesCount.length / 50)}
            variant="outlined"
            shape="rounded"
            page={page}
            onChange={handleChange}
          />
        </Stack>
      </div>
    </SelectShowcaseContainer>
  );
}
