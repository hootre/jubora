'use client';

import BoardSmall from 'components/common/BoardSmall';
import useMainSlides from 'hooks/supabase/main/slides/useMainSlides';
import BoardSmallCard from 'components/common/BoardSmall/BoardSmallCard';
import MainLoading from 'components/Loading/MainLoading';
import ReadMainslidesListContainer from './style';

export default function ReadMainslidesList() {
  // 메인 슬라이드
  const { useGetMainSlides } = useMainSlides();
  const { data, isLoading } = useGetMainSlides();
  if (isLoading) {
    return <MainLoading />;
  }

  return (
    <ReadMainslidesListContainer>
      <BoardSmall>
        {data?.map((item) => (
          <BoardSmallCard
            key={item.id}
            title={`${item.title1}_${item.title2}`}
            subTitle={`${item.content1}_${item.content2}`}
            createdAt={item.createdAt}
          />
        ))}
      </BoardSmall>
    </ReadMainslidesListContainer>
  );
}
