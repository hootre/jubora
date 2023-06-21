'use client';
import React from 'react';
import { ShowcaseBox } from './styles';
import Link from 'next/link';
import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';
import { useDetailFilterState } from 'store';
import { Button } from '@material-tailwind/react';

export const Showcase = ({ templatesList }) => {
  const { detailFilterState } = useDetailFilterState();
  return (
    <ShowcaseBox>
      <div className="topNav">
        <h2 className="title">{templatesList?.length}개의 디자인이 있습니다.</h2>
        {/* <SortFilter categoryList={categoryList} /> */}
        <Button>Button</Button>
      </div>
      <div className="showcase">
        <ul>
          {templatesList &&
            templatesList
              .sort((a, b) => {
                if (detailFilterState === 0) {
                  return new Date(b.created_at) - new Date(a.created_at);
                } else if (detailFilterState === 1) {
                  return new Date(b.views) - new Date(a.views);
                } else {
                  return new Date(b.sales) - new Date(a.sales);
                }
              })
              .map((item) => {
                return (
                  <li key={item.id} className={item.type}>
                    <div>
                      <img src={item.file} alt="현수막이미지" />
                      <AwesomeButton type="primary" className="choice">
                        <Link href={`detail/${item.id}`}>선택</Link>
                      </AwesomeButton>
                    </div>
                  </li>
                );
              })}
        </ul>
      </div>
    </ShowcaseBox>
  );
};
