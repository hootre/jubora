import styled from '@emotion/styled';
import { Common } from 'styles/Common';

export const DataTable_container = styled.div`
  .title_box {
    display: flex;
    flex-direction: column;
    align-items: start;
    margin-bottom: 10px;
    width: 100%;
    .title {
      display: flex;
      align-items: center;
      .icon {
        width: 30px;
        height: 30px;
        color: ${Common.colors.primary100};
      }
    }
  }
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

        &.state {
          font-size: 18px;
          color: ${Common.colors.primary100};
          font-weight: bold;
        }
        .select_img {
          width: 400px;
        }
        &.price {
          font-size: 18px;
          font-weight: bold;
          color: ${Common.colors.primary100};
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
  .btn_box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: end;
    flex: 0 0 300px;
    > button {
      cursor: pointer;
      display: inline-block;
      width: 120px;
      height: 30px;
      line-height: 25px;
      color: ${Common.colors.black};
      background-color: ${Common.colors.white};
      border: 1px solid ${Common.colors.bd100};
      text-align: center;
      font-size: 13px;
      letter-spacing: -0.045rem;
      padding: 0 8px;
      margin: 2px 0;
      box-sizing: border-box;
      transition: all 0.2s;
      &:hover {
        color: ${Common.colors.white};
        background-color: ${Common.colors.primary100};
        transform: translateY(-2px);
        box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
      }
    }
    text-align: center;
  }
`;
