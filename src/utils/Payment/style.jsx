import styled from '@emotion/styled';

const PaymentsContainer = styled.div`
  display: flex;
  align-items: center;

  gap: 10px;
  > button {
    width: 100px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .tosspay {
    > img {
      width: 100px;
    }
  }
  .kakaopay {
    > img {
      width: 100px;
    }
  }
`;
export default PaymentsContainer;
