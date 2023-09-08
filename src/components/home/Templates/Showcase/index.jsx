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

export const Showcase = ({ category }) => {
  // user상태관리
  const { useGetUserInfo } = useUser();
  const { data: user, isLoading: userLoading } = useGetUserInfo();
  // template 목록
  const { useGetCategoryTemplate } = useTemplates();
  const { data: templatesList, isLoading } = useGetCategoryTemplate(category);

  // 가로,세로,포스터
  const [bannerType, setBannerType] = useState('banner_row');
  const handleBannerType = (e) => {
    setBannerType(e.target.value);
  };

  // zustand
  const SortType = useTemplateSortType();
  const tagList = useTemplateTagList();
  // if (isInitialLoading) {
  //   return <h1>Loading...</h1>;
  // }
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
        <h2 className="title">{templatesList?.length}개의 디자인이 있습니다.</h2>
        {/* <SortFilter categoryList={categoryList} /> */}
      </div>
      <div className="showcase">
        <ul className={bannerType}>
          {templatesList &&
            templatesList.map((item) => {
              return (
                <li key={item.id}>
                  {user.role === 'admin' && <button className="delete_btn">삭제</button>}

                  <ImageItem
                    img_src={
                      bannerType === 'banner_row'
                        ? item.img_row
                        : bannerType === 'banner_col'
                        ? item.img_col
                        : item.img_square
                    }
                    href={`/home/templates/${item.category}/detail/${item.id}?bannerType=${bannerType}`}
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
