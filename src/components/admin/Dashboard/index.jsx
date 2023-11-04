import React from 'react';
import { Dashboard_container } from './styles';
import { SmallCard } from './SmallCard';
import { Read_Mainslides } from '../Read/Read_Mainslides';
import { Read_MainslidesList } from '../Read/Read_MainslidesList';
import { RiMoneyEuroBoxLine, RiLogoutBoxRLine, RiStackLine, RiUserAddLine } from 'react-icons/ri';
import { Read_userList } from '../Read/Read_userList';
import { DashboardFrame } from './DashboardFrame';
import { useUser } from 'hooks/supabase/auth/useUser';
import Read_OrderList from '../Read/Read_OrderList';
import { usePayment } from 'hooks/supabase/payment/usePayment';
import { MainLoading } from 'components/Loading/MainLoading';

export const Dashboard = () => {
  //유저 데이터
  const { useGetUserList } = useUser();
  const { data: userList, isLoading: userLoading } = useGetUserList();
  // 주문 건수
  const { useGetPayment } = usePayment();
  const { data: payList, isLoading: payLoading } = useGetPayment();
  if (userLoading || payLoading) {
    return <MainLoading />;
  }
  return (
    <Dashboard_container>
      <section>
        <SmallCard
          title="매출 건수"
          lastText="건"
          value={payList.length}
          icon={<RiMoneyEuroBoxLine />}
        />
        <SmallCard title="방문자 수" lastText="건" value={12} icon={<RiLogoutBoxRLine />} />
        <SmallCard title="주문 수" lastText="건" value={payList.length} icon={<RiStackLine />} />
        <SmallCard
          title="사용자 수"
          lastText="명"
          value={userList.length}
          icon={<RiUserAddLine />}
        />
      </section>
      <section>
        <DashboardFrame title="메인 슬라이드" flexSize={3}>
          <Read_Mainslides view />
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
