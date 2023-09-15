import styled from '@emotion/styled';
import { Common } from 'styles/Common';

export const SianUpdateList_container = styled.ul`
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
        .textarea_box {
          border: 1px solid ${Common.colors.bd100};
          padding: 10px 0;
          textarea {
            width: 100%;
            height: 70px;
            border: 0;
            padding: 10px 15px;
            font-size: 14px;
            font-weight: 500;
            line-height: 22px;
            border: none;
            resize: none;
            outline: none;
          }
          .file_list {
            display: flex;
            flex-wrap: wrap;

            align-items: center;
            margin-left: 10px;
            gap: 5px;
            .file_text {
              border: 1px solid #ddd;
              background: ${Common.colors.bg300};
              border-radius: 15px;
              padding: 7px 15px;
              box-sizing: border-box;
              display: flex;
              align-items: end;
              gap: 5px;
              .file_name {
                color: ${Common.colors.black};
                font-size: 12px;
              }
              .delete_btn {
                cursor: pointer;
                font-size: 11px;
                color: ${Common.colors.text200};
              }
            }
          }
        }
      }
      .sianupdate_btn_box {
        width: 100%;
        padding: 10px;
        display: flex;
        justify-content: space-between;
        > div {
          padding: 10px 20px;
          background: ${Common.colors.text100};
          color: ${Common.colors.white};
          cursor: pointer;
        }
        .file_box {
          .from_item_btn {
            cursor: pointer;
          }
          input {
            position: absolute;
            top: 0;
            left: 0;
            width: 0;
            height: 0;
            font-size: 0;
            visibility: hidden;
          }
        }
      }
    }
  }
`;
