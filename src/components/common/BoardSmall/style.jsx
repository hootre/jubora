import styled from '@emotion/styled';
import Common from 'styles/Common';

const BoardSmallContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  > div:nth-child(2n) {
    background: ${Common.colors.bg100};
  }
`;
export default BoardSmallContainer;
