import styled from '@emotion/styled';
import { Common } from 'styles/Common';

export const LoginRequest_container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .text_box {
    h1 {
      color: #595959;
      font-size: 18px;
      text-align: center;
      font-weight: 600;
      text-transform: none;
      line-height: 40px;
      display: block;
    }
    h2 {
      font-size: 13px;
      text-align: center;
      font-weight: 300;
      float: none;
      line-height: normal;
      color: #545454;
    }
  }
  .btn_box {
    margin-top: 15px;
    button {
      border: 0;
      border-radius: 3px;
      box-shadow: none;
      color: ${Common.colors.white};
      cursor: pointer;
      font-size: 17px;
      font-weight: 500;
      margin: 0 5px;
      padding: 10px 32px;
      transition: all 0.2s ease;
      &.signUp {
        background-color: ${Common.colors.bg200};
      }
      &.signIn {
        background-color: ${Common.colors.bg200};
      }
      &:hover {
        background-color: ${Common.colors.black};
        color: ${Common.colors.white};
        font-weight: bold;
      }
    }
  }
`;
