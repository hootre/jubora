import styled from '@emotion/styled';
import { Common } from 'styles/Common';

export const QnA_detail_container = styled.section`
  width: 100%;
  padding: 50px 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .btn_box {
    display: flex;
    justify-content: end;
    gap: 10px;
    > div {
      padding: 10px 15px;
      border-radius: 5px;
      border: 1px solid ${Common.colors.bd100};
      cursor: pointer;
      transition: all 0.2s ease;
      &:hover {
        transform: translateY(-2px);
      }
    }
    .update_order {
      border: none;
      color: ${Common.colors.white};
      background: ${Common.colors.primary100};
    }
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
  .contents_header {
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid ${Common.colors.bd100};
    .title_box {
      display: flex;
      align-items: center;
      gap: 10px;
      .type {
        font-size: 25px;
        font-weight: bold;
        color: ${Common.colors.text200};
        &.notice {
          color: ${Common.colors.red};
        }
      }
      .title {
        font-size: 30px;
      }
    }
    .subtitle {
      display: flex;
      align-items: end;
      gap: 10px;
      > div {
        display: flex;
        gap: 10px;
      }
    }
  }
  .contents_body {
    min-height: 400px;
    padding: 20px;
  }
  .commnet_input {
    width: 100%;
  }
  .comment_box {
    padding: 20px;
    background: ${Common.colors.bg300};
    border: 1px solid ${Common.colors.bd100};
    > h2 {
      padding-bottom: 10px;
      border-bottom: 1px solid ${Common.colors.bd100};
    }
  }
`;
