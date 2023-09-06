import React from 'react';
import { Dashboard_container } from './styles';
import { SmallCard } from './SmallCard';
import { Read_Mainslides } from '../Read/Read_Mainslides';
import { Read_MainslidesList } from '../Read/Read_MainslidesList';
import { RiMoneyEuroBoxLine, RiLogoutBoxRLine, RiStackLine, RiUserAddLine } from 'react-icons/ri';
import { Read_OrderList } from '../Read/Read_OrderList';
import { Read_userList } from '../Read/Read_userList';
import { DashboardFrame } from './DashboardFrame';
import { useUser } from 'hooks/supabase/auth/useUser';

export const Dashboard = () => {
  //유저 데이터
  const { useGetUserList } = useUser();
  const { data, isLoading } = useGetUserList();
  if (isLoading) {
    return <h1>로딩중</h1>;
  }
  console.log(data);
  return (
    <Dashboard_container>
      <section>
        <SmallCard title="월 매출" lastText="건" value={1234} icon={<RiMoneyEuroBoxLine />} />
        <SmallCard title="월 방문자 수" lastText="건" value={12} icon={<RiLogoutBoxRLine />} />
        <SmallCard title="월 주문 수" lastText="건" value={123} icon={<RiStackLine />} />
        <SmallCard title="사용자 수" lastText="명" value={data.length} icon={<RiUserAddLine />} />
      </section>
      <section>
        <DashboardFrame title="메인 슬라이드" flexSize={3}>
          <Read_Mainslides />
        </DashboardFrame>

        <DashboardFrame title="슬라이드 목록" flexSize={1}>
          <Read_MainslidesList />
        </DashboardFrame>
      </section>
      <section>
        <DashboardFrame title="시안확인 목록" flexSize={3}>
          <Read_OrderList />
        </DashboardFrame>
        <DashboardFrame title="사용자 목록" flexSize={1}>
          <Read_userList />
        </DashboardFrame>
      </section>
    </Dashboard_container>
  );
};
