import { DiBrackets } from 'react-icons/di';
import Payments from 'utils/Payment';
import OrderDetail from 'components/home/Order/OrderDetail';
import SianBoardDetailContainer from './style';

export default function SianBoardDetail({ data, userData }) {
  return (
    <SianBoardDetailContainer>
      <OrderDetail data={data} userData={userData} />
      <section>
        <div className="title_box">
          <div className="title">
            <DiBrackets className="icon" />
            <h1>결제하기</h1>
          </div>
          <div className="payment_box">
            <Payments order_data={data} />
          </div>
        </div>
      </section>
    </SianBoardDetailContainer>
  );
}
