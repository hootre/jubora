import styled from '@emotion/styled';
import { Common } from 'styles/Common';

export const TemplatesSixContent_container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  .content {
    display: flex;
    justify-content: space-between;
    max-width: ${Common.size.container_width};
    section {
      ul {
        display: grid;
        gap: 10px;
        transition: opacity 3s ease-in, height 1s ease;
        > li {
          opacity: 0;
        }
        &.banner_row {
          grid-template-rows: repeat(2, 100px);
          grid-template-columns: repeat(3, 1fr);
          height: 250px;
          > li {
            opacity: 1;
          }
        }
        &.banner_col {
          grid-template-columns: repeat(6, 1fr);
          height: 620px;
          > li {
            opacity: 1;
          }
        }
        &.banner_square {
          grid-template-rows: repeat(2, 1fr);
          grid-template-columns: repeat(4, 1fr);
          height: 770px;
          > li {
            opacity: 1;
          }
        }
      }
    }
  }
`;
