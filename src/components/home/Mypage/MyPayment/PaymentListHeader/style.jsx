import styled from '@emotion/styled';
import Common from 'styles/Common';

const PaymentListHeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  > div {
    width: 100%;
    display: flex;
    align-items: center;
    height: 50px;
    padding: 10px;
    border-bottom: 1px solid ${Common.colors.bd100};
    transition: all 0.2s ease;
    > span {
      font-size: 13px;
      &.date {
        flex: 0 0 100px;
        text-align: center;
      }
      &.title {
        flex: 1;
        text-align: center;
      }
      &.orderId {
        flex: 0 0 100px;
        text-align: center;
      }

      &.state {
        flex: 0 0 100px;
        text-align: center;
      }
      &.delivery {
        flex: 0 0 100px;
        text-align: center;
      }
      &.price {
        flex: 0 0 200px;
        text-align: center;
      }
    }
  }
`;
export default PaymentListHeaderContainer;
