import styled from '@emotion/styled';
import { Common } from 'styles/Common';

export const Write_contaier = styled.section`
  padding: 50px 0;
  .table_select_box {
    padding-bottom: 20px;
    border-bottom: 5px solid ${Common.colors.primary300};
    h1 {
      padding: 5px;
    }
    .board_link_box {
      display: flex;
      gap: 10px;
      .board_link {
        > a {
          display: flex;
          padding: 10px 15px;
          border: 1px solid ${Common.colors.bd100};
          transition: all 0.2s ease;
        }
        &.active,
        &:hover {
          > a {
            color: ${Common.colors.white};
            background: ${Common.colors.black};
          }
        }
      }
    }
  }
`;