import styled from '@emotion/styled';
import { Common } from 'styles/Common';
export const BoardSmall_container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  > div:nth-child(2n) {
    background: ${Common.colors.bg100};
  }
`;
