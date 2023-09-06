'use client';
import { BoardSmall } from 'components/common/BoardSmall';
import React, { useState } from 'react';
import { Read_MainslidesList_container } from './style';
import { useMainSlides } from 'hooks/supabase/main/slides/useMainSlides';
import { BoardSmallCard } from 'components/common/BoardSmall/BoardSmallCard';

export const Read_MainslidesList = () => {
  // 메인 슬라이드
  const { useGetMainSlides } = useMainSlides();
  const { data, isLoading } = useGetMainSlides();
  if (isLoading) {
    return <h1>Loading</h1>;
  }

  return (
    <Read_MainslidesList_container>
      <BoardSmall>
        {data?.map((item) => (
          <BoardSmallCard
            key={item.id}
            title={`${item.title_1}_${item.title_2}`}
            subTitle={`${item.content_1}_${item.content_2}`}
            created_at={item.created_at}
          />
        ))}
      </BoardSmall>
    </Read_MainslidesList_container>
  );
};
