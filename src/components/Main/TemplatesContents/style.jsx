import styled from '@emotion/styled';
import { Common } from 'styles/Common';

export const TemplatesContents_container = styled.section`
  position: relative;
  padding: 50px 0;
  width: 1400px;
  margin: 0 auto;
  overflow: hidden;
  .nav {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 20px;
    > li {
      cursor: pointer;
      padding: 15px;
      border-radius: 5px;
      transition: all 0.2s;
      &.active {
        background: ${Common.colors.primary100};
        color: ${Common.colors.white};
        font-weight: bold;
      }
    }
  }
`;
