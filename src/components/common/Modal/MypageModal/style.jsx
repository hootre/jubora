import styled from '@emotion/styled';
import { Common } from 'styles/Common';

export const MyPageModal_container = styled.article`
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
    width: 240px;
    background: ${Common.colors.white};
    border-radius: 4px;
    box-shadow: 0 2px 14px #00000040;
    padding: 22px 36px;
    z-index: 2;
    box-sizing: border-box;
    .head {
      display: block;
      padding-bottom: 20px;
      border-bottom: 1px solid ${Common.colors.bd100};
      > h1 {
        display: inline-block;
        color: ${Common.colors.text100};
        font-size: 18px;
        font-weight: bold;
        position: relative;
        margin-bottom: 5px;
        &:after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100%;
          height: 3px;
          background: ${Common.colors.accent100};
        }
      }
      > h2 {
        color: ${Common.colors.text200};
        font-size: 10px;
      }
    }
    .content {
      margin-top: 20px;
      > ul {
        li {
          position: relative;
          cursor: pointer;
          padding: 10px 0;
          display: block;
          &:hover {
            font-weight: bold;
            &:before {
              content: '';
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
              left: -10px;
              width: 5px;
              height: 5px;
              background: ${Common.colors.accent100};
            }
          }
        }
      }
    }
  }
`;
