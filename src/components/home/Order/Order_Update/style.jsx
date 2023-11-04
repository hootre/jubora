import styled from '@emotion/styled';
import { Common } from 'styles/Common';

export const Order_Update_container = styled.div`
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
        .sample_btn {
          margin: 5px;
          padding: 7px 60px;
          color: ${Common.colors.white};
          background: ${Common.colors.black};
          border-radius: 10px;
          transition: all 0.2s ease;
          cursor: pointer;
          &:hover {
            transform: translateY(2px);
          }
        }
        textarea {
          width: 50%;
          height: 100px;
          border: 0;
          padding: 10px 15px;
          font-size: 14px;
          font-weight: 500;
          line-height: 22px;
          text-align: center;
          border: none;
          resize: none;
          outline: none;
        }
        input {
          border: none;
          padding: 5px 5px;
          margin: 10px;
          box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.2);
        }
        .select_img {
          max-width: 500px;
          max-height: 500px;
          object-fit: contain;
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
