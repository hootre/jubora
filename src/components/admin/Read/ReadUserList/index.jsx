'use client';

import BoardSmall from 'components/common/BoardSmall';
import BoardSmallCard from 'components/common/BoardSmall/BoardSmallCard';
import User from 'hooks/supabase/auth/useUser';
import MainLoading from 'components/Loading/MainLoading';
import ReadUserListContainer from './style';

export default function ReadUserList() {
  // 유저 데이터
  const { GetUserList } = User();
  const { data, isLoading } = GetUserList();
  if (isLoading) {
    return <MainLoading />;
  }
  return (
    <ReadUserListContainer>
      <BoardSmall>
        {data?.map((item) => (
          <BoardSmallCard
            key={item.id}
            title={`${item.name}`}
            subTitle={`${item.email}`}
            createdAt={item.createdAt}
          />
        ))}
      </BoardSmall>
    </ReadUserListContainer>
  );
}
