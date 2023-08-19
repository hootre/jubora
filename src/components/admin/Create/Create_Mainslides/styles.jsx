import styled from '@emotion/styled';
import { Common } from 'styles/Common';

export const Create_container = styled.section`
  > form {
    display: flex;
    align-items: center;
    flex-direction: column;
    max-width: ${Common.size.container_width};
    margin: 0 auto;
  }
  .title {
    width: 100%;
    text-align: left;
    font-size: 22px;
    padding: 20px;
  }
  .from_item_btn {
    padding: 10px 40px;
    border-radius: 2px;
    transition: all 0.2s ease;
    cursor: pointer;
    font-weight: bold;
    color: ${Common.colors.white};
    background: ${Common.colors.black};
  }
  .option_container {
    width: 1280px;
    display: flex;
    -webkit-box-align: baseline;
    align-items: center;
    min-height: 40px;
    flex-direction: row;
    padding: 10px 0;
    border-bottom: 1px solid ${Common.colors.bd100};

    h2 {
      flex: 0 0 140px;
      font-size: 15px;
      padding: 0 20px;
    }
    > .item {
      display: flex;
      margin: 0 5px;
    }
    &.file_box {
      .file_input {
        position: absolute;
        top: 0;
        left: 0;
        width: 0;
        height: 0;
        font-size: 0;
        visibility: hidden;
      }
      .file_text {
        border: 1px solid #ddd;
        padding: 0 15px;
        box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.05);
        box-sizing: border-box;
        display: flex;
        align-items: center;
        margin-left: 20px;
        .file_name {
          color: ${Common.colors.black};
          padding: 10px;
          margin-right: 20px;
          font-size: 14px;
        }
        .delete_btn {
          cursor: pointer;
          font-size: 12px;
          color: ${Common.colors.text200};
        }
      }
    }
  }
`;
