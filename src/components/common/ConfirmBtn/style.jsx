import styled from '@emotion/styled';
import { Common } from 'styles/Common';

export const ConfirmBtn_container = styled.div`
  .delete_user_btn {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    text-decoration: underline;
    color: ${Common.colors.text200};
  }
`;
export const Modal_Content = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  background-color: ${Common.colors.white};
  border: 2px solid ${Common.colors.bg200};
  box-shadow: 24px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
      color: #fff;
      cursor: pointer;
      font-size: 17px;
      font-weight: 500;
      margin: 0 5px;
      padding: 10px 32px;
      &.cancel {
        background-color: ${Common.colors.primary100};
      }
      &.delete {
        background-color: ${Common.colors.red};
      }
    }
  }
`;
