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
    margin-bottom: 10px;
    .icon {
      width: 30px;
      height: 30px;
      color: ${Common.colors.primary100};
    }
  }
  table {
    width: 100%;
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
  .sian_modify_box {
    display: flex;
    gap: 20px;
    padding: 40px;
    img {
      width: 500px;
      height: 500px;
      object-fit: contain;
    }
    .modify_box {
      width: 500px;
      display: flex;
      flex-direction: column;
      align-items: center;
      .sell_text {
        width: 100%;
        padding: 10px;
        margin-bottom: 20px;
        background: ${Common.colors.primaryBg};
        h2 {
          margin-bottom: 10px;
        }
        p {
        }
      }
      .modify_text {
        width: 100%;
        padding: 10px;
        h2 {
          margin-bottom: 10px;
        }
        .textarea {
          width: 100%;
        }
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
