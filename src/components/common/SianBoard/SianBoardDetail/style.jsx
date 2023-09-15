import styled from '@emotion/styled';
import { Common } from 'styles/Common';

export const SianBoardDetail_container = styled.div`
  section {
    margin: 30px 0;
    display: flex;
    flex-direction: column;
  }
  .title_box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    .title {
      display: flex;
      align-items: center;
      .icon {
        width: 30px;
        height: 30px;
        color: ${Common.colors.primary100};
      }
    }
    .modify_btn {
      padding: 10px 15px;
      border-radius: 5px;
      border: 1px solid ${Common.colors.bd100};
      cursor: pointer;
      transition: all 0.2s ease;
      &:hover {
        transform: translateY(-2px);
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
    align-items: center;
    justify-content: center;
    margin: 15px 0;
    .modify_byn {
      cursor: pointer;
      padding: 15px;
      background: ${Common.colors.primary100};
      color: ${Common.colors.white};
      font-weight: bold;
      border-radius: 5px;
      width: 400px;
      transition: all 0.2s;
      &:hover {
        background: ${Common.colors.primary300};
        transform: translateY(-2px);
        box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
      }
      &:active {
        transform: translateY(0px);
      }
    }
  }
`;
