import styled from '@emotion/styled';
import { Common } from 'styles/Common';

export const EmptyCard_container = styled.div`
  margin: 10px;
  .accordion {
    transition: all 0.2s ease;
    box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.2);
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
    }
  }
  .accordion_content {
    display: flex;
    gap: 30px;
    padding: 20px 10px;
    border-bottom: 5px solid ${Common.colors.primary300};
    box-shadow: 0px 3px 3px 2px rgba(0, 0, 0, 0.05);
    form {
      flex: 1;
    }
    .update_btn_box {
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
      .upload_btn {
        color: ${Common.colors.white};
        background-color: ${Common.colors.primary100};
      }
      .delete_btn {
        color: ${Common.colors.white};
        background-color: ${Common.colors.red};
      }
    }
    .orderSetting_box {
      .orderBasic {
        width: 100%;
        display: flex;
        -webkit-box-align: baseline;
        align-items: center;
        min-height: 40px;
        flex-direction: row;
        padding: 10px 0;
        border-bottom: 1px solid ${Common.colors.bd100};
        > h2 {
          flex: 0 0 140px;
          font-size: 15px;
          padding: 0 20px;
        }
        > div {
          flex: 1;
          display: flex;
          flex-wrap: wrap;
        }
      }
      .from_item_btn_box {
        display: flex;

        gap: 10px;
      }
      .from_item_btn {
        font-size: 12px;
        text-align: center;
        width: 150px;
        padding: 10px 20px;
        color: ${Common.colors.text100};
        background: ${Common.colors.white};
        border: 1px solid ${Common.colors.bd100};
        border-radius: 2px;
        transition: all 0.2s ease;
        cursor: pointer;
        &.active,
        &:hover {
          font-weight: bold;
          color: ${Common.colors.white};
          background: ${Common.colors.black};
        }
      }
    }
  }
  .C_basic_flex {
    margin-top: 10px;
  }
`;
