import styled from '@emotion/styled';
import Common from 'styles/Common';

const OrderDataTableContainer = styled.div`
  table {
    width: 100%;
    margin-bottom: 15px;
    border-top: 2px solid ${Common.colors.primary100};
    th {
      padding: 15px 0 10px 0;
      border: 1px solid ${Common.colors.bd100};
      text-align: center;
      &:nth-of-type(1) {
        border-left: none;
      }
      &:nth-last-of-type(1) {
        border-right: none;
      }
    }
    tr {
      td {
        font-size: 13px;
        vertical-align: middle;

        .select_img {
          width: 500px;
        }
        &:nth-of-type(1) {
          border-left: none;
        }
        &:nth-last-of-type(1) {
          border-right: none;
        }
        padding: 10px 0;
        text-align: center;
        border: 1px solid ${Common.colors.bd100};
      }
    }
  }
`;
export default OrderDataTableContainer;
