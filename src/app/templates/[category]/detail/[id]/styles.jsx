import styled from '@emotion/styled';
import { Common } from 'styles/Common';

export const Detail_container = styled.section`
  > form {
    display: flex;
    align-items: center;
    gap: 56px;
    margin: 30px auto;
    max-width: ${Common.size.container_width};
    min-height: calc(100vh - 249px);
  }
  .form_box {
    flex: 1 1 800px;
  }
  .side_detail {
    width: 300px;
    height: 700px;
    > h1 {
      padding: 10px;
      font-size: 25px;
    }
    .side_content {
      padding: 15px;
      border: 1px solid #000;
      > img {
        width: 100%;
        object-fit: cover;
      }
      > h1 {
        font-size: 20px;
        font-weight: bold;
        padding: 10px 0;
      }
      > p {
        color: ${Common.colors.text200};
        line-height: 25px;
        margin-bottom: 10px;
      }
      .price {
        border-top: 1px solid#000;
        display: flex;
        justify-content: space-between;
        padding: 10px;
        > h1 {
          font-size: 25px;
        }
        > h2 {
          color: ${Common.colors.primary100};
          font-size: 25px;
        }
      }
    }
    .purchaseBox {
      margin-top: 10px;
      > button {
        width: 100%;
      }
    }
  }
  .productImgBox {
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
  .productContent {
    display: flex;
    flex-direction: column;

    .titleBox {
      padding: 5px 0;
      border-bottom: 1px solid var(--base-black);
      .subTitle {
        display: inline-block;
        font-size: 10px;
        color: var(--text-200);
        margin-bottom: 5px;
      }
      .title {
        font-size: 20px;
        font-weight: bold;
      }
    }
    .contentBox {
      margin: 10px 0;
      position: relative;
      .from_item_btn_box {
        display: flex;
        gap: 10px;
      }
      .from_item_btn {
        padding: 10px 40px;
        color: ${Common.colors.text300};
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

      .option_container {
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
        &.name_box {
          > h2:not(:first-child) {
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
    .contents {
      display: flex;
      align-items: center;
      margin: 8px 0px;
      flex-direction: row;
      h2 {
        font-size: 16px;
        flex: 0 0 100px;
      }
      .textarea {
        width: 300px;
        background: ${Common.colors.white};
        outline: none;
      }
    }
    .file_box {
      > input {
        position: absolute;
        top: 0;
        left: 0;
        width: 0;
        height: 0;
        font-size: 0;
        visibility: hidden;
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
    .purchaseBox {
      display: flex;
      flex-direction: column;
      border-top: 1px solid var(--base-black);
      padding-top: 20px;
      .priceBox {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
        .count {
          display: flex;
          align-items: center;
          gap: 15px;
          input {
            color: rgb(99, 99, 99);
            font-size: 14px;
            text-align: center;
            border-top: none;
            border-right: none;
            border-left: none;
            border-image: initial;
            border-bottom: 1px solid transparent;
            box-sizing: border-box;
            outline: none;
            appearance: none;
            margin: 0px;
            padding: 0px;
            width: 24px;
            height: 32px;
            background-color: transparent;
            font-family: inherit;
          }
          .icon {
            display: flex;
            border: 1px solid rgb(226, 226, 226);
            appearance: none;
            outline: none;
            padding: 0px;
            margin: 0px;
            cursor: pointer;
            background-color: transparent;
            width: 32px;
            height: 32px;
            -webkit-box-align: center;
            align-items: center;
            -webkit-box-pack: center;
            justify-content: center;
            color: var(--text-200);
          }
        }
        .price {
          display: flex;
          align-items: center;
          h2 {
            font-size: 20px;
            font-weight: bold;
          }
        }
      }
    }
  }
`;
