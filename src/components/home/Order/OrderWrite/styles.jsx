import styled from '@emotion/styled';
import Common from 'styles/Common';

const OrderWriteContainer = styled.section`
  > form {
    display: flex;
    align-items: center;
    gap: 56px;
    margin: 30px auto;
    max-width: ${Common.size.containerWidth};
    min-height: calc(100vh - 249px);
  }
  .form_box {
    width: 800px;
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
        flex-wrap: wrap;
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
`;
export default OrderWriteContainer;
