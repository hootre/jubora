'use client';

import React, { useState } from 'react';
import 'react-awesome-button/dist/styles.css';
import { useTemplateSortType, useTemplateTagList } from 'store';

import { ImageItem } from 'components/common/ImageItem/index.jsx';

import { useTemplates } from 'hooks/supabase/templates/useTemplates.js';
import { User } from 'hooks/supabase/auth/User.js';
import { Pagination, Stack } from '@mui/material';
import { GetValueImageItem } from 'components/common/GetValueImageItem/index.jsx';
import { Select_showcaseContainer } from './style.jsx';
import { ItemTypeGroup } from './ItemTypeGroup/index.jsx';

export function Select_showcase({ category = 'banner', toaggleModal }) {
  // 페이지 기본값
  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };
  // user상태관리
  const { useGetUserInfo } = User();
  const { data: user, isLoading: userLoading } = useGetUserInfo();
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
  const SortType = useTemplateSortType();
  const tagList = useTemplateTagList();
  if (isLoading || userLoading) {
    return <h1>Loading</h1>;
  }
  let filterDataList = [];
  if (tagList.length > 0) {
    filterDataList = templatesList
      .filter((item) => {
        if (tagList.filter((tag) => item.title.includes(tag.text)).length === tagList.length) {
          return item;
        }
        return false;
      })
      .sort((a, b) => {
        if (SortType === '최신순') {
          return new Date(b.createdAt) - new Date(a.createdAt);
        }
        if (SortType === '조회순') {
          return new Date(b.views) - new Date(a.views);
        }
        return new Date(b.sales) - new Date(a.sales);
      });
  } else {
    filterDataList = templatesList.sort((a, b) => {
      if (SortType === '최신순') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      if (SortType === '조회순') {
        return new Date(b.views) - new Date(a.views);
      }
      return new Date(b.sales) - new Date(a.sales);
    });
  }
  return (
    <Select_showcaseContainer>
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
            count={Math.ceil(templatesCount?.length / 50)}
            variant="outlined"
            shape="rounded"
            page={page}
            onChange={handleChange}
          />
        </Stack>
      </div>
    </Select_showcaseContainer>
  );
}
