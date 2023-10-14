'use client';
import { useMainTemplatesCard } from 'hooks/supabase/main/templatesCard/useTemplatesCard';
import { EmptyCard } from './EmptyCard';
import { MainTemplatesCard_Write_container } from './styles';
import { Main_TemplatesCardList } from 'components/home/Main/Main_TemplatesCardList';

export const MainTemplatesCard_Write = () => {
  const { useGetMainTemplatesCard, useUpdateMainTemplatesCard } = useMainTemplatesCard();
  const { data: MainTemplatesCardData, isLoading } = useGetMainTemplatesCard();
  const { mutate: updataMainTemplatesCard } = useUpdateMainTemplatesCard();
  if (isLoading) {
    return;
  }
  return (
    <MainTemplatesCard_Write_container>
      {MainTemplatesCardData.map((item, index) => (
        <EmptyCard
          key={item.id}
          item={item}
          index={index + 1}
          updataData={updataMainTemplatesCard}
        />
      ))}
      <Main_TemplatesCardList />
    </MainTemplatesCard_Write_container>
  );
};
