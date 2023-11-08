import { RiMoneyEuroBoxLine, RiLogoutBoxRLine, RiStackLine, RiUserAddLine } from 'react-icons/ri';
import User from 'hooks/supabase/auth/useUser';
import usePayment from 'hooks/supabase/payment/usePayment';
import MainLoading from 'components/Loading/MainLoading';
import DashboardContainer from './styles';
import SmallCard from './SmallCard';
import ReadMainslides from '../Read/ReadMainslides';
import ReadMainslidesList from '../Read/ReadMainslidesList';
import DashboardFrame from './DashboardFrame';
import ReadOrderList from '../Read/ReadOrderList';
import ReadUserList from '../Read/ReadUserList';

export default function Dashboard() {
  // 유저 데이터
  const { GetUserList } = User();
  const { data: userList, isLoading: userLoading } = GetUserList();
  // 주문 건수
  const { useGetPayment } = usePayment();
  const { data: payList, isLoading: payLoading } = useGetPayment();
  if (userLoading || payLoading) {
    return <MainLoading />;
  }
  return (
    <DashboardContainer>
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
          <ReadMainslides view />
        </DashboardFrame>

        <DashboardFrame title="슬라이드 목록" flexSize={1}>
          <ReadMainslidesList />
        </DashboardFrame>
      </section>
      <section>
        <DashboardFrame title="시안확인 목록" flexSize={3}>
          <ReadOrderList />
        </DashboardFrame>
        <DashboardFrame title="사용자 목록" flexSize={1}>
          <ReadUserList />
        </DashboardFrame>
      </section>
    </DashboardContainer>
  );
}
