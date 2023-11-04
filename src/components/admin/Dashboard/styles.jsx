import styled from '@emotion/styled';
import { Common } from 'styles/Common';

export const Dashboard_container = styled.div`
  background-color: ${Common.colors.bg300};
  flex: 1;
  padding: 30px;
  > section {
    display: flex;
    align-items: center;
    margin-bottom: 30px;
    gap: 10px;
  }
`;
