import styled from '@emotion/styled';
import Common from 'styles/Common';

const PublicOrderContainer = styled.div`
  width: 100%;
  display: flex;
  -webkit-box-align: baseline;
  align-items: center;
  min-height: 40px;
  flex-direction: row;
  padding: 10px 0;
  border-bottom: 1px solid ${Common.colors.bd100};

  /* orderSettingContainer */
  &.orderSettingContainer {
    width: 100%;
    border: none;
    .upload_input {
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
      margin: 0 10px 10px 10px;
      padding: 0 15px;
      width: 200px;
      box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.05);
      box-sizing: border-box;
      display: flex;
      align-items: center;
      .file_name {
        color: ${Common.colors.black};
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        line-height: 20px;
        padding: 10px;
        margin-right: 20px;
        font-size: 11px;
      }
      .delete_btn {
        cursor: pointer;
        font-size: 10px;
        color: ${Common.colors.text200};
      }
    }
    .category_box {
      display: flex;
      flex-direction: column;
      justify-content: center;
      .category_tag_list {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-top: 10px;
        .tag_btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: ${Common.colors.text100};
          background: ${Common.colors.white};
          border: 1px solid ${Common.colors.bd100};
          border-radius: 2px;
          transition: all 0.2s ease;
          min-width: 100px;
          max-width: 250px;
          .tag_content {
            display: flex;
            padding: 10px;
            gap: 40px;
          }
          > span {
            font-size: 18px;
            text-align: center;
          }
          .icon_box {
            height: 100%;
            display: flex;
            gap: 5px;
            .icon {
              font-size: 17px;
              cursor: pointer;
              color: ${Common.colors.text300};
              transition: all 0.2s ease;
              &:hover {
                color: ${Common.colors.black};
                transform: scale(1.1);
              }
            }
          }
          > img {
            width: 150px;
            height: 150px;
            object-fit: contain;
          }
          .description,
          .add_price {
            width: 100%;
            > h3 {
              padding: 10px 0 5px 10px;
              font-size: 12px;
              color: ${Common.colors.text300};
              border-bottom: 1px solid ${Common.colors.text300};
            }
            .tag_textarea {
              max-width: 250px;
              height: 70px;
              border: none;
              outline: none;
              resize: none;
            }
            > input {
              padding: 5px;
            }
          }
        }
      }
    }
  }
  /* ItemCategory */
  &.categoryContainer {
    width: 100%;
    .category_box {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 10px;
      .category_tag_list {
        display: flex;
        .tag_btn {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 10px;
          border: ${Common.colors.bd100};
          background: ${Common.colors.black};
          border-radius: 10px;
          font-size: 12px;
          color: ${Common.colors.white};
          margin-right: 10px;
          .icon {
            margin-left: 5px;
            cursor: pointer;
          }
        }
      }
    }
  }

  select {
    margin-right: 10px;
  }
  .contentBox {
    margin: 10px 0;
    position: relative;
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

    .optionContainer {
      display: flex;
      -webkit-box-align: baseline;
      align-items: center;
      min-height: 40px;
      flex-direction: row;
      padding: 10px 0;
      border-bottom: 1px solid ${Common.colors.bd100};

      .point_text {
        height: 0;
        display: flex;
        align-items: center;
        overflow: hidden;
        color: var(--base-red);
        font-size: 13px;
        opacity: 0.2;
        transition: all 0.5s ease;
      }
      h2 {
        font-size: 15px;
        flex: 0 0 100px;
      }
      .type_btn_box {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      &.name_box {
        > h2:not(:first-of-type) {
          flex: 0 0 80px;
        }
        > div {
          margin-right: 10px;
        }
      }
      .option_box {
        display: flex;
        flex-direction: column;
        flex: 1;
        height: 50px;
        line-height: 50px;
        position: relative;
        > option {
          > span {
            position: absolute;
            padding: 20px;
          }
        }
      }
    }
  }

  .size_box {
    display: flex;
    align-items: center;
    position: relative;
    padding-bottom: 20px;
    > div {
      display: flex;
      justify-content: space-between;
      align-items: end;
    }
    input {
      width: 50px;
    }
    &:after {
      content: '70cm 이상 10cm 단위로 입력해주세요';
      position: absolute;
      color: ${Common.colors.text300};
      left: 5px;
      bottom: 0px;
      font-size: 12px;
    }
    .row {
      margin-right: 10px;
    }
    .col {
      margin: 0 10px;
    }
    .count {
      margin-right: 3px;
    }
  }
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
  h2 {
    font-size: 16px;
    flex: 0 0 100px;
  }
  .textarea {
    width: 400px;
    background: ${Common.colors.white};
    outline: none;
  }
  &.file_box {
    input {
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
  .contentText {
    display: flex;
    align-items: center;
    margin: 8px 0px;
    flex-direction: row;
    h2 {
      font-size: 16px;
      flex: 0 0 100px;
    }
  }
  &.productImg {
    display: flex;
    align-items: end;
    justify-content: start;
    > div {
      h1 {
        padding: 5px;
      }
      img {
        padding: 5px;
        border: 1px solid ${Common.colors.bd100};
        width: 400px;
        max-height: 400px;
        object-fit: contain;
      }
    }
    .sample_btn {
      margin: 5px;
      padding: 7px 60px;
      color: ${Common.colors.white};
      background: ${Common.colors.black};
      border-radius: 10px;
      transition: all 0.2s ease;
      cursor: pointer;
    }
  }
  .password_text {
    font-size: 13px;
    color: ${Common.colors.text200};
  }
  .point_text {
    height: 0;
    display: flex;
    align-items: center;
    overflow: hidden;
    color: var(--base-red);
    font-size: 13px;
    opacity: 0.2;
    transition: all 0.5s ease;
  }
  h2 {
    flex: 0 0 140px;
    font-size: 15px;
    padding: 0 20px;
  }
  .text {
    font-size: 13px;
    flex: 1;
  }
  .type_btn_box {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;

    .btn_box {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }
    .etc_box {
      display: flex;
      align-items: center;
      gap: 10px;
      h3 {
        font-weight: 300;
        color: ${Common.colors.text300};
      }
    }
  }
  &.name_box {
    > h2:not(:first-of-type) {
      flex: 0 0 80px;
    }
    > div {
      margin-right: 10px;
    }
  }
  .option_box {
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 50px;
    line-height: 50px;
    position: relative;
    > option {
      > span {
        position: absolute;
        padding: 20px;
      }
    }
  }
`;
export default PublicOrderContainer;
