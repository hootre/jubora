import styled from '@emotion/styled';
import Common from 'styles/Common';

const TemplatesSixContentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  .content {
    display: flex;
    justify-content: space-between;
    max-width: ${Common.size.containerWidth};
    section {
      ul {
        display: grid;
        gap: 10px;
        transition: opacity 3s ease-in, height 1s ease;
        > li {
          opacity: 0;
          .none {
            display: none;
          }
          .active {
            display: block;
          }
        }
        &.banner_row {
          grid-template-rows: repeat(2, 100px);
          grid-template-columns: repeat(3, 1fr);
          > li {
            opacity: 1;
          }
        }
        &.banner_col {
          grid-template-columns: repeat(6, 1fr);
          > li {
            opacity: 1;
          }
        }
        &.banner_square {
          grid-template-rows: repeat(2, 1fr);
          grid-template-columns: repeat(4, 1fr);
          > li {
            opacity: 1;
          }
        }
      }
    }
  }
`;
export default TemplatesSixContentContainer;
