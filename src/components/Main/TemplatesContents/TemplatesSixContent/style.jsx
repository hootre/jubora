import styled from '@emotion/styled';
import { Common } from 'styles/Common';

export const TemplatesSixContent_container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  .content {
    display: flex;
    justify-content: space-between;
    height: 550px;
    max-width: ${Common.size.container_width};
    section {
      ul {
        display: grid;
        gap: 10px;
        &.row {
          grid-template-rows: repeat(2, 0.5fr);
          grid-template-columns: repeat(3, 1fr);
        }
        &.col {
          grid-template-columns: repeat(6, 1fr);
        }
        &.square {
          grid-template-rows: repeat(2, 1fr);
          grid-template-columns: repeat(3, 1fr);
        }
      }
    }
  }
`;
