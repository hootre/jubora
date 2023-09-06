import styled from '@emotion/styled';
import { Common } from 'styles/Common';

export const Order_container = styled.section`
  width: ${Common.size.container_width};
  margin: 0 auto;
  padding: 50px 0;
  .order_title {
    font-size: 30px;
    font-weight: bold;
    > span {
      font-size: 14px;
      font-weight: normal;
    }
  }
`;
