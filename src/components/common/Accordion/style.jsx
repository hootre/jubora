import styled from '@emotion/styled';
import { Common } from 'styles/Common';

export const Accordion_container = styled.div`
  .main {
    &:hover,
    &.active {
      background: ${Common.colors.bg300};
    }
  }
  .content {
    box-sizing: border-box;
    height: 0;
    overflow: hidden;
    &.active {
      box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
      padding: 30px;
      height: auto;
    }
  }
`;
