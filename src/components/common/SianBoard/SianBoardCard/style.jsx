import styled from '@emotion/styled';
import { Common } from 'styles/Common';

export const SianBoardCard_container = styled.div`
  display: flex;
  justify-content: center;

  > div {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid ${Common.colors.bd100};
    cursor: pointer;
    transition: all 0.2s ease;
    > span {
      color: ${Common.colors.black};
      margin: 10px 0;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 13px;
      > a {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      &.date {
        flex: 0 0 100px;
        text-align: center;
      }

      &.title {
        flex: 1;
        text-align: center;
        &:hover {
          > a {
            font-weight: bold;
            text-decoration: underline;
            color: ${Common.colors.primary100};
          }
        }
      }
      &.orderId {
        flex: 0 0 70px;
        text-align: center;
        &.active {
          color: ${Common.colors.text200};
        }
      }
      &.state {
        color: ${Common.colors.primary100};
        flex: 0 0 70px;
        text-align: center;
      }
      &.delivery {
        flex: 0 0 70px;
        text-align: center;
      }
      &.price_box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex: 0 0 100px;
        > span {
          margin-bottom: 5px;
        }
        > button {
          cursor: pointer;
          background-color: ${Common.colors.primary100};
          display: inline-block;
          width: 70px;
          height: 25px;
          line-height: 25px;
          border: 1px solid ${Common.colors.bd100};
          text-align: center;
          font-size: 13px;
          letter-spacing: -0.045rem;
          color: ${Common.colors.white};
          padding: 0 8px;
          margin: 2px 0;
          box-sizing: border-box;
          transition: all 0.2s;
          &:hover {
            background: ${Common.colors.primary200};
            transform: translateY(-2px);
            box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
          }
        }
        .price {
          font-size: 15px;
          font-weight: bold;
        }
        text-align: center;
      }
    }
  }
`;
