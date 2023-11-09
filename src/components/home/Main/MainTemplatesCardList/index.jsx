'use client';

import React from 'react';
import useMainTemplatesCard from 'hooks/supabase/main/templatesCard/useTemplatesCard';
import MainLoading from 'components/Loading/MainLoading';
import MainTemplatesCardListContainer from './style';
import Card from './Card';

export default function MainTemplatesCardList() {
  const { useGetMainTemplatesCard } = useMainTemplatesCard();
  const { data: MainTemplatesCardData, isLoading } = useGetMainTemplatesCard();
  if (isLoading) {
    return <MainLoading />;
  }
  return (
    <MainTemplatesCardListContainer className="CContainer">
      {MainTemplatesCardData.map((item) => (
        <Card key={item.id} item={item} />
      ))}
    </MainTemplatesCardListContainer>
  );
}
