import styled from '@emotion/styled';
import { Common } from 'styles/Common';

export const SideNav_container = styled.div`
  border-right: 1px solid ${Common.colors.bd100};
  ul {
    padding: 10px;
    > li {
      > a {
        display: inline-block;
        padding: 30px 20px;
        &:hover {
          font-weight: bold;
        }
      }
    }
  }
`;
