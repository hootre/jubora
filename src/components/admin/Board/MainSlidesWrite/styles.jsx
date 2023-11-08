import styled from '@emotion/styled';
import Common from 'styles/Common';

const MainSlidesWrtieContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  border-bottom: 5px solid ${Common.colors.primary300};
  box-shadow: 0px 3px 3px 2px rgba(0, 0, 0, 0.05);
  > form {
    display: flex;
    align-items: center;
    flex-direction: column;
    max-width: ${Common.size.containerWidth};
    margin: 0 auto;

    > .title {
      width: 100%;
      text-align: left;
      font-size: 22px;
      padding: 20px;
    }
    .input_box {
      display: flex;
      flex-direction: column;
      gap: 10px;
      .from_item_btn {
        display: block;
        padding: 10px 40px;
        border-radius: 2px;
        transition: all 0.2s ease;
        cursor: pointer;
        font-weight: bold;
        color: ${Common.colors.white};
        background: ${Common.colors.black};
      }
      .confirm_text {
        display: block;
        font-size: 12px;
        color: ${Common.colors.text200};
        &:hover {
          opacity: 1;
        }
      }
    }
    .optionContainer {
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
        > div {
          display: flex;
        }
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
          width: 200px;
          box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.05);
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-left: 20px;
          gap: 10px;
          font-size: 14px;
          .file_name {
            color: ${Common.colors.black};
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            line-height: 20px;
          }
          .file_size {
            font-size: 12px;
          }
          .delete_btn {
            cursor: pointer;
            font-size: 12px;
            color: ${Common.colors.text200};
            &:hover {
              color: ${Common.colors.black};
            }
          }
        }
      }
    }
    .C_basic_flex {
      .C_basic_button {
        margin-top: 10px;
      }
    }
  }
`;
export default MainSlidesWrtieContainer;
