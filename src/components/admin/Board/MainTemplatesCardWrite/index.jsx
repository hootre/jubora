'use client';

import useMainTemplatesCard from 'hooks/supabase/main/templatesCard/useTemplatesCard';
import MainTemplatesCardList from 'components/home/Main/MainTemplatesCardList';
import MainLoading from 'components/Loading/MainLoading';
import EmptyCard from './EmptyCard';
import MainTemplatesCardWriteContainer from './styles';

export default function MainTemplatesCardWrite() {
  const { useGetMainTemplatesCard, useUpdateMainTemplatesCard } = useMainTemplatesCard();
  const { data: MainTemplatesCardData, isLoading } = useGetMainTemplatesCard();
  const { mutate: updataMainTemplatesCard } = useUpdateMainTemplatesCard();
  if (isLoading) {
    return <MainLoading />;
  }
  return (
    <MainTemplatesCardWriteContainer>
      {MainTemplatesCardData.map((item, index) => (
        <EmptyCard
          key={item.id}
          item={item}
          index={index + 1}
          updataData={updataMainTemplatesCard}
        />
      ))}
      <MainTemplatesCardList />
    </MainTemplatesCardWriteContainer>
  );
}
