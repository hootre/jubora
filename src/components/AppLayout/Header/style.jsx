import styled from '@emotion/styled';
import { Common } from 'styles/Common';

export const Header_container = styled.header`
  box-shadow: 0px 9px 11px 5px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 5;
  backdrop-filter: blur(30px);
  background-color: ${Common.colors.bg300};
  #header {
    width: 1400px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    #navBox {
      display: flex;
      > a > img {
        width: 120px;
        height: auto;
        margin-right: 60px;
        cursor: pointer;
      }
      .nav {
        display: flex;
        align-items: center;
        position: relative;
        .lineBox {
          position: absolute;
          bottom: -4px;
          width: 110px;
          opacity: 1;
          border-bottom: 4px solid ${Common.colors.accent100};
          transition-duration: 0.4s;
          transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        > li {
          padding: 0 15px;
          width: 110px;
          text-align: center;
          > a {
            color: ${Common.colors.text200};
            font-size: 14px;
            font-weight: 500;
            line-height: 1.63;
            font-stretch: normal;
            font-style: normal;
            letter-spacing: normal;
            &:hover {
              font-weight: bold;
              text-decoration: none;
              color: ${Common.colors.text100};
            }
            &:after {
              opacity: 0;
            }
            &.active {
              font-weight: bold;
              color: ${Common.colors.text100};
            }
          }
        }
      }
    }
    #subBox {
      display: flex;
      align-items: center;

      .login {
        > ul {
          display: flex;
          align-items: center;
          .item {
            position: relative;
            > span {
              display: block;
              width: 1px;
              height: 14px;
              background-color: ${Common.colors.bg200};
              margin: 0 20px;
            }
            > a {
              cursor: pointer;
              display: flex;
              align-items: center;
              font-size: 12px;
              font-weight: 500;
              line-height: 1.67;
              font-stretch: normal;
              font-style: normal;
              letter-spacing: normal;
              color: ${Common.colors.text200};
            }
          }
        }
      }
    }
  }
`;
