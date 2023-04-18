import styled from 'styled-components';

export const PaymentModalBox = styled.article`
  .back {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100vh;
    z-index: 1;
    background: rgba(0, 0, 0, 0.15);
  }
  .container {
    position: absolute;
    top: 25px;
    right: 0;
    width: 760px;
    z-index: 2;
    min-height: 660px;
    border-radius: 10px;
    box-shadow: 0 0 16px #00000040;
    background-color: var(--base-white);
    display: flex;
    > div {
      text-align: left;
      flex: 1;
    }
    .payList {
      background-color: var(--bg-100);
      display: flex;
      flex-direction: column;
      padding: 30px;
      h1 {
        margin-bottom: 20px;
      }
      .cartList {
        display: flex;
        flex-direction: column;
        li {
          display: flex;
          align-items: center;
          padding: 5px;
          background-color: var(--base-white);
          border-radius: 4px;
          box-shadow: 0 0 4px #00000040;
          margin: 5px;
          .img {
            flex: 0 0 100px;
            width: 100px;
            height: 80px;
            object-fit: contain;
          }
          .content {
            flex: 1;
            padding: 10px;
            .title {
              font-size: 12px;
              color: var(--text-100);
              margin-bottom: 20px;
            }
            .category {
              font-size: 10px;
              color: var(--text-300);
              padding-bottom: 2px;
            }
            .price {
              font-size: 14px;
              color: var(--text-100);
            }
          }
        }
      }
      .noCart {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: auto 0;
        padding-bottom: 45px;
        .icon {
          color: var(--text-200);
          font-size: 50px;
        }
        h2 {
          color: var(--text-100);
          padding: 20px;
          font-size: 16px;
        }
        h3 {
          color: var(--text-300);
          font-size: 13px;
        }
      }
    }
    /* 알아서 결제할 때 해라 동준아 */
    .orderInfo {
      padding: 30px;
    }
  }
`;
