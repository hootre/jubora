'use client';
import React from 'react';
import 'react-awesome-button/dist/styles.css';
import './style.jsx';
import { useTemplateSortType } from 'store';
import { useTemplateTagList } from 'store';
import { Showcase_container } from './style.jsx';
import { ImageItem } from 'components/common/ImageItem/index.jsx';
import { Search } from '../Search/index.jsx';
import { useState } from 'react';
import { ItemTypeGroup } from './ItemTypeGroup/index.jsx';
import { useTemplates } from 'hooks/supabase/templates/useTemplates.js';
import { useUser } from 'hooks/supabase/auth/useUser.js';
import { Pagination, Stack } from '@mui/material';

export const Showcase = ({ category = 'banner' }) => {
  // 페이지 기본값
  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };
  // user상태관리
  const { useGetUserInfo } = useUser();
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
      <div className="filter_nav">
        <Search />
        <ItemTypeGroup bannerType={bannerType} handleBannerType={handleBannerType} />
      </div>
      <div className="top_nav">
        <h2 className="title">{templatesCount?.length}개의 디자인이 있습니다.</h2>
        {/* <SortFilter categoryList={categoryList} /> */}
      </div>
      <div className="showcase">
        <ul className={bannerType}>
          {templatesList &&
            templatesList.map((item) => {
              return (
                <li key={item.id}>
                  {bannerType === 'banner_row' ? (
                    <ImageItem
                      img_src={item.img_row}
                      href={`/home/templates/${item.category}/detail/${item.id}?bannerType=${bannerType}`}
                      text={'구매하기'}
                      bannerType={'banner_row'}
                    />
                  ) : bannerType === 'banner_col' ? (
                    <ImageItem
                      img_src={item.img_col}
                      href={`/home/templates/${item.category}/detail/${item.id}?bannerType=${bannerType}`}
                      text={'구매하기'}
                      bannerType={'banner_col'}
                    />
                  ) : (
                    <ImageItem
                      img_src={item.img_square}
                      href={`/home/templates/${item.category}/detail/${item.id}?bannerType=${bannerType}`}
                      text={'구매하기'}
                      bannerType={'banner_square'}
                    />
                  )}
                </li>
              );
            })}
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
    </Showcase_container>
  );
};
