import styled from '@emotion/styled';
import Common from 'styles/Common';

const QnaReadContainer = styled.section`
  width: 100%;
  .login_check {
    height: 100px;
    position: relative;
  }
  .top_box {
    display: flex;
    justify-content: end;
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
      border-bottom: 1px solid ${Common.colors.bd100};
      transition: all 0.2s ease;
      > span {
        &.id {
          flex: 0 0 50px;
          text-align: center;
        }
        &.state {
          flex: 0 0 100px;
          text-align: center;
        }
        &.title {
          flex: 1;
          text-align: center;
        }
        &.name {
          flex: 0 0 100px;
          text-align: center;
        }
        &.date {
          flex: 0 0 100px;
          text-align: center;
        }
      }
    }
  }
  .main {
    .noBoard {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      h1 {
        margin-top: 50px;
        color: ${Common.colors.text200};
      }
    }
  }
  .BoardItem {
    display: flex;
    justify-content: space-between;
    width: 100%;

    > div {
      width: 100%;
      display: flex;
      align-items: center;
      height: 50px;
      line-height: 50px;
      border-bottom: 1px solid ${Common.colors.bd100};
      cursor: pointer;
      transition: all 0.2s ease;
      font-size: 14px;
      font-weight: 400;
      > span {
        color: ${Common.colors.black};
        &.id {
          flex: 0 0 50px;
          text-align: center;
        }
        &.state {
          color: ${Common.colors.text200};
          flex: 0 0 100px;
          text-align: center;
        }
        &.title {
          flex: 1;
          text-align: left;
          overflow: hidden;
          > a:hover {
            text-decoration: underline;
            color: ${Common.colors.primary100};
          }
        }
        &.name {
          flex: 0 0 100px;
          text-align: center;
          overflow: hidden;
        }
        &.date {
          flex: 0 0 100px;
          text-align: center;
        }
      }
    }
    .icon {
      font-size: 30px;
      flex: 0 0 50px;
    }
  }
`;
export default QnaReadContainer;
