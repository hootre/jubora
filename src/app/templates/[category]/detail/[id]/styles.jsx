import styled from '@emotion/styled';
import { Common } from 'styles/Common';

export const Detail_container = styled.section`
  > form {
    display: flex;
    align-items: center;
    gap: 56px;
    margin: 56px auto;
    max-width: 1400px;
    min-height: calc(100vh - 249px);
  }

  .productImgBox {
    flex: 1;
    display: flex;
    justify-content: center;
    img {
      width: 80%;
      object-fit: contain;
    }
  }
  .productContent {
    display: flex;
    flex-direction: column;
    .titleBox {
      padding: 15px 0;
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
      .option_container {
        display: flex;
        -webkit-box-align: baseline;
        align-items: center;
        margin: 8px 0px;
        flex-direction: row;
        padding: 10px 0;
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
          font-size: 16px;
          flex: 0 0 100px;
        }
        .option_box {
          display: flex;
          flex-direction: column;
          flex: 1;
          height: 50px;
          line-height: 50px;
          > option {
            > span {
              padding: 20px;
            }
          }
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
      > textarea {
        flex: 1 1 0%;
        padding: 15px;
        height: 100px;
        background: transparent;
        outline: none;
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
