import styled from '@emotion/styled';
import { Common } from 'styles/Common';

export const Payments_container = styled.div`
  display: flex;
  align-items: center;

  gap: 10px;
  > div {
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
