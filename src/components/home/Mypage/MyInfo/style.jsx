import styled from '@emotion/styled';
import Common from 'styles/Common';

const MyInfoContainer = styled.div`
  padding: 10px;
  .address_content {
    width: 100%;
    .address_btn_box {
      display: flex;
      align-items: center;
      > button {
        font-size: 11px;
        width: 120px;
        height: 30px;
        color: ${Common.colors.primary100};
        border: 1px solid ${Common.colors.primary100};
        border-radius: 10px;
        margin-right: 10px;
        transition: all 0.2s ease;
        cursor: pointer;
        &:hover {
          font-weight: bold;
          background: ${Common.colors.primaryBg};
          transform: translateY(-2px);
        }
      }
    }
    > div {
      margin: 5px 0;
      width: 300px;
      .address_input {
        width: 300px;
      }
    }
  }
  .btn_box {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    .update_btn {
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${Common.colors.white};
      user-select: none;
      height: 48px;
      padding: 0px 12px;
      background-color: ${Common.colors.primary100};
      border-radius: 8px;
      width: 200px;
      font-size: 17px;
      font-weight: bold;
      transition: all 0.2s;
      cursor: pointer;
      &:hover {
        background: ${Common.colors.primary200};
        transform: translateY(-2px);
        box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
      }
    }
  }
`;
export default MyInfoContainer;
