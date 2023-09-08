import styled from '@emotion/styled';
import { Common } from 'styles/Common';

export const Notice_Read_container = styled.section`
  width: ${Common.size.container_width};
  margin: 0 auto;
  padding: 50px 0;
  .top_box {
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    .order_title {
      font-size: 30px;
      font-weight: bold;
      > span {
        font-size: 14px;
        font-weight: normal;
      }
    }
  }
`;
