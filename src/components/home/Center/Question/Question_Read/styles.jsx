import styled from '@emotion/styled';
import { Common } from 'styles/Common';

export const Question_Read_container = styled.section`
  width: 100%;
  .top_box {
    display: flex;
    justify-content: space-between;
    .order_title {
      font-size: 30px;
      font-weight: bold;
      > span {
        font-size: 14px;
        font-weight: normal;
      }
    }
    .btn_box {
      display: flex;
      gap: 5px;
      > div {
        font-weight: normal;
        font-size: 12px;
      }
      .delete_btn {
        background-color: ${Common.colors.red};
      }
    }
  }
  .board_header {
    display: flex;
    justify-content: center;
    > div {
      width: 100%;
      display: flex;
      align-items: center;
      height: 50px;
      border-bottom: 2px solid ${Common.colors.black};
      transition: all 0.2s ease;
      > span {
        &.state {
          flex: 0 0 100px;
          text-align: center;
        }
        &.title {
          flex: 1;
          text-align: center;
        }
      }
    }
  }
  .board_item {
    display: flex;
    justify-content: space-between;
    width: 100%;

    > div {
      width: 100%;
      display: flex;
      align-items: center;
      height: 70px;
      border-bottom: 1px solid ${Common.colors.bd100};
      cursor: pointer;
      transition: all 0.2s ease;
      font-size: 16px;
      font-weight: 400;
      > span {
        color: ${Common.colors.black};
        &.state {
          color: ${Common.colors.text200};
          flex: 0 0 100px;
          text-align: center;
        }
        &.title {
          flex: 1;
        }
      }
    }
    .icon {
      font-size: 30px;
      flex: 0 0 50px;
    }
  }
`;
