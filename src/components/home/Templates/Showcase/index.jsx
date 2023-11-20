'use client';

import React, { useState } from 'react';
import 'react-awesome-button/dist/styles.css';
import { useTemplateSortType, useTemplateTagList } from 'store';

import { Pagination, Stack } from '@mui/material';
import useTemplates from 'hooks/supabase/templates/useTemplates';
import MainLoading from 'components/Loading/MainLoading';
import ImageItem from 'components/common/ImageItem';
import ShowcaseContainer from './style';
import Search from '../Search';
import ItemTypeGroup from './ItemTypeGroup';

export default function Showcase({ bannerState }) {
  // 페이지 기본값
  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };
  // template 목록
  const { useGetTemplatesPage, useGetCategoryCount } = useTemplates();
  const { data: templatesList, isLoading: templagesLoading } = useGetTemplatesPage(
    bannerState,
    page
  );
  const { data: templatesCount, isLoading: countLoading } = useGetCategoryCount(bannerState);
  // 가로,세로,포스터
  const [bannerType, setBannerType] = useState('banner_row');
  const handleBannerType = (e) => {
    setBannerType(e.target.value);
  };

  // zustand
  const SortType = useTemplateSortType();
  // 현재 적용된 태그
  const tagList = useTemplateTagList();
  if (templagesLoading || countLoading) {
    return <MainLoading />;
  }
  let filterDataList = [];
  if (tagList.length > 0) {
    filterDataList = templatesList
      .filter((item) => {
        if (tagList.filter((tag) => item.category.list.includes(tag)).length === tagList.length) {
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
    <ShowcaseContainer>
      <div className="filter_nav">
        <Search />
        <ItemTypeGroup bannerType={bannerType} handleBannerType={handleBannerType} />
      </div>
      <div className="top_nav">
        <h2 className="title">{filterDataList?.length}개의 디자인이 있습니다.</h2>
        {/* <SortFilter categoryList={categoryList} /> */}
      </div>
      <div className="showcase">
        <ul className={bannerType}>
          {filterDataList &&
            filterDataList.map((item) => (
              <li key={item.id}>
                <div className={bannerType === 'banner_row' ? 'active' : 'none'}>
                  <ImageItem
                    imgSrc={item.imgRow}
                    href={`/home/templates/${item.bannerState}/detail/${item.id}?bannerType=${bannerType}&categoryName=${item.categoryName}`}
                    text="구매하기"
                    bannerType="banner_row"
                    loadingType="lazy"
                  />
                </div>
                <div className={bannerType === 'banner_col' ? 'active' : 'none'}>
                  <ImageItem
                    imgSrc={item.imgCol}
                    href={`/home/templates/${item.bannerState}/detail/${item.id}?bannerType=${bannerType}&categoryName=${item.categoryName}`}
                    text="구매하기"
                    bannerType="banner_col"
                    loadingType="lazy"
                  />
                </div>
                <div className={bannerType === 'banner_square' ? 'active' : 'none'}>
                  <ImageItem
                    imgSrc={item.imgSquare}
                    href={`/home/templates/${item.bannerState}/detail/${item.id}?bannerType=${bannerType}&categoryName=${item.categoryName}`}
                    text="구매하기"
                    bannerType="banner_square"
                    loadingType="lazy"
                  />
                </div>
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
    </ShowcaseContainer>
  );
}
