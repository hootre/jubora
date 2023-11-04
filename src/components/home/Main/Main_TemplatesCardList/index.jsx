'use client';
import React from 'react';
import { Main_TemplatesCardList_container } from './style';
import { Card } from './Card';
import { useMainTemplatesCard } from 'hooks/supabase/main/templatesCard/useTemplatesCard';
import { Skeleton } from '@mui/material';

export const Main_TemplatesCardList = () => {
  const { useGetMainTemplatesCard } = useMainTemplatesCard();
  const { data: MainTemplatesCardData, isLoading } = useGetMainTemplatesCard();
  if (isLoading) {
    return;
  }
  return (
    <Main_TemplatesCardList_container className="C_container">
      {MainTemplatesCardData.map((item, idx) => (
        <Card key={idx} item={item} />
      ))}
    </Main_TemplatesCardList_container>
  );
};
