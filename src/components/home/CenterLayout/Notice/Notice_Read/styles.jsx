import styled from '@emotion/styled';
import { Common } from 'styles/Common';

export const Notice_Read_container = styled.section`
  width: 100%;
  .top_box {
    display: flex;
    justify-content: end;
    padding: 0 20px;
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
      padding: 10px;
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
  .board_item {
    display: flex;
    justify-content: center;

    > div {
      width: 100%;
      display: flex;
      align-items: center;
      height: 50px;
      padding: 10px;
      border-bottom: 1px solid ${Common.colors.bd100};
      cursor: pointer;
      transition: all 0.2s ease;
      &:hover {
        background: ${Common.colors.bg100};
        .id,
        .name,
        .date {
          color: ${Common.colors.black};
        }
        .title {
          color: ${Common.colors.primary100};
        }
      }
      > span {
        color: ${Common.colors.text100};
        &.id {
          flex: 0 0 50px;
          text-align: center;
        }
        &.state {
          color: ${Common.colors.black};
          flex: 0 0 100px;
          text-align: center;
          &.notice {
            font-weight: bold;
            color: ${Common.colors.red};
          }
        }
        &.title {
          flex: 1;
          text-align: left;
          overflow: hidden;
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
  }
`;
