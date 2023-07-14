import styled from '@emotion/styled';
import { Common } from 'styles/Common';

export const Footer_container = styled.footer`
  position: absolute;
  width: 100%;
  height: 200px;
  bottom: -200px;
  background-color: ${Common.colors.black};
  color: ${Common.colors.text200};
  font-size: 12px;
  .footer {
    padding: 40px 0px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .footerContent {
      display: flex;
      flex-direction: column;
      > nav {
        margin-bottom: 15px;
        ul {
          display: flex;
          align-items: center;
          li {
            font-weight: 500;
            span {
              display: block;
              width: 1px;
              height: 14px;
              background-color: ${Common.colors.bg200};
              margin: 0 20px;
            }
          }
        }
      }
      .footerInfo {
        display: flex;
        align-items: center;
        img {
          width: 120px;
          height: auto;
          margin-right: 20px;
          filter: grayscale(30%);
        }
        p {
          line-height: 1.67;
          b {
            color: ${Common.colors.white};
            font-weight: 800;
          }
        }
      }
    }
    .footerCs {
      p {
        &.footerTitle {
          color: ${Common.colors.white};
          font-size: 12px;
          span {
            font-size: 16px;
          }
        }
        line-height: 1.67;
      }
    }
  }
`;
