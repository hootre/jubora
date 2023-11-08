import styled from '@emotion/styled';
import Common from 'styles/Common';

const PaymentModalContainer = styled.article`
  .back {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100vh;
    z-index: 1;
    background: rgba(0, 0, 0, 0.05);
    cursor: pointer;
  }
  .content_box {
    position: absolute;
    top: 25px;
    right: 0;
    width: 340px;
    z-index: 2;
    border-radius: 10px;
    box-shadow: 0 0 16px #221f1f40;
    background-color: ${Common.colors.white};
    display: flex;
    > div {
      text-align: left;
      flex: 1;
    }
    .pay_box {
      background-color: ${Common.colors.bg100};
      display: flex;
      flex-direction: column;
      padding: 30px;
      h1 {
        margin-bottom: 20px;
      }
      .cart_list {
        display: flex;
        flex-direction: column;
        > li {
          display: flex;
          align-items: center;
          padding: 5px;
          border-radius: 4px;
          background-color: ${Common.colors.white};
          margin: 10px 5px;
          cursor: pointer;
          transition: all 0.2s ease;
          filter: grayscale(1);
          box-shadow: 0 0 4px ${Common.colors.black};

          .img {
            flex: 0 0 100px;
            width: 100px;
            height: 80px;
            object-fit: contain;
          }
          .content {
            position: relative;
            flex: 1;
            padding: 10px;
            .state {
              position: absolute;
              top: -15px;
              right: 0;
              background: ${Common.colors.white};
              font-size: 12px;
              padding: 5px;
              border-radius: 5px;
              border: 1px solid #222;
            }

            .title {
              font-size: 12px;
              color: ${Common.colors.text100};
              margin-bottom: 20px;
            }
            .category {
              font-size: 10px;
              color: ${Common.colors.text300};
              padding-bottom: 2px;
            }
            .price {
              font-size: 14px;
              color: ${Common.colors.text100};
            }
          } // 결제대기
          &.ac_await {
            filter: grayscale(0);
            box-shadow: 0 0 4px ${Common.colors.await_bd};
            &:hover {
              box-shadow: 0 0 8px ${Common.colors.await_bd};
            }
            .state {
              border: 1px solid ${Common.colors.await_bd};
              color: ${Common.colors.awaitText};
            }
          }
          // 배송중
          &.ac_delivery_ing {
            filter: grayscale(0);
            box-shadow: 0 0 4px ${Common.colors.successBd};
            &:hover {
              box-shadow: 0 0 8px ${Common.colors.successBd};
            }
            .state {
              border: 1px solid ${Common.colors.successBd};
              color: ${Common.colors.successText};
            }
          }
        }
      }

      .no_cart {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: auto 0;
        padding-bottom: 45px;
        .icon {
          color: ${Common.colors.text200};
          font-size: 50px;
        }
        h2 {
          color: ${Common.colors.text100};
          padding: 20px;
          font-size: 16px;
        }
        h3 {
          color: ${Common.colors.text300};
          font-size: 13px;
        }
      }
    }
    /* 알아서 결제할 때 해라 동준아 */
    .order_info {
      padding: 30px;
      display: flex;
      flex-direction: column;
      .order_content {
        .order_phone_box {
          margin-bottom: 10px;
          > h2 {
            font-size: 18px;
          }
          > p {
            color: ${Common.colors.text300};
            font-size: 12px;
            padding: 5px 0;
          }
          > input {
            color: ${Common.colors.black};
            font-size: 14px;
            width: 100%;
            border: solid 1px ${Common.colors.bd100};
            padding: 12px 6px;
            height: 50px;
            line-height: 50px;
          }
        }
        .account_number_box {
          width: 100%;
          padding: 10px;
          display: flex;
          align-items: center;
          > p {
            padding: 5px 10px;
          }
          > button {
            background: ${Common.colors.black};
            color: ${Common.colors.white};
            transition: all 0.2s ease;
            border-radius: 5px;
            font-size: 12px;
            &:hover {
              transform: translateY(-2px);
            }
            padding: 5px;
            cursor: pointer;
          }
        }
      }
    }
  }
`;
export default PaymentModalContainer;
