'use client';
import { BoardSmall } from 'components/common/BoardSmall';
import React, { useState } from 'react';
import { Read_userList_container } from './style';
import { useMainSlides } from 'hooks/supabase/main/slides/useMainSlides';
import { BoardSmallCard } from 'components/common/BoardSmall/BoardSmallCard';
import { useUser } from 'hooks/supabase/auth/useUser';
import { memo } from 'react';

export const Read_userList = () => {
  //유저 데이터
  const { useGetUserList } = useUser();
  const { data, isLoading } = useGetUserList();
  if (isLoading) {
    return <h1>로딩중</h1>;
  }
  return (
    <Read_userList_container>
      <BoardSmall>
        {data?.map((item) => (
          <BoardSmallCard
            key={item.id}
            title={`${item.name}`}
            subTitle={`${item.email}`}
            created_at={item.created_at}
          />
        ))}
      </BoardSmall>
    </Read_userList_container>
  );
};
