import styled from '@emotion/styled';
import Common from 'styles/Common';

const HeaderContainer = styled.header`
  box-shadow: 0px 3px 3px 2px rgba(0, 0, 0, 0.05);
  background-color: ${Common.colors.white};
  .prev_site {
    display: flex;
    justify-content: center;
    height: 40px;
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .navContainer {
      width: 100%;
      display: flex;
      flex-direction: column;

      .header_top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 70px;
        position: relative;
        .full_line {
          position: absolute;
          bottom: 0;
          left: -25%;
          width: 100vw;
          height: 1px;
          background: ${Common.colors.bd100};
        }
        > a > img {
          width: 120px;
          height: auto;
          margin-right: 60px;
          cursor: pointer;
        }
        .subContainer {
          display: flex;
          align-items: start;
          font-size: 12px;
          font-weight: 500;
          line-height: 1.67;
          color: ${Common.colors.text200};
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
                  margin: 0 10px;
                }
                > button {
                  font-size: 13px;
                  line-height: 14px;
                  cursor: pointer;
                  display: flex;
                  align-items: center;
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
      .temp_nav {
        display: ${(props) => (props.ScrollActive ? 'block' : 'none')};
        height: 60px;
      }
      .nav_box {
        position: ${(props) => (props.ScrollActive ? 'fixed' : 'relative')};
        box-shadow: ${(props) =>
          props.ScrollActive ? '0px 3px 3px 2px rgba(0, 0, 0, 0.05)' : 'none'};
        width: 100%;
        top: 0;
        left: 0;
        background-color: ${Common.colors.white};
        z-index: ${(props) => (props.ScrollActive ? 5 : 1)};
        display: flex;
        justify-content: center;
        transition: all 0.2s ease;
        > div {
          width: ${Common.size.containerWidth};
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 5px 0;
        }
        .sian_box {
          display: flex;
          > li {
            &:hover {
              > svg {
                color: ${Common.colors.primary100};
              }
              color: ${Common.colors.primary100};
              transform: translateY(-2px);
            }
            > svg {
              margin-right: 5px;
              transition: all 0.2s ease;
            }
            transition: all 0.2s ease;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 5px 0;
            font-size: 14px;
            width: 120px;
            text-align: center;
            font-weight: bold;
            margin: 0 0 0 10px;
            color: ${Common.colors.text100};
            background: ${Common.colors.white};
            box-shadow: 0px 3px 3px 2px rgba(0, 0, 0, 0.05);
            border-radius: 8px;
          }
        }
        .nav {
          display: flex;
          align-items: center;
          position: relative;
          .lineBox {
            &.non {
              opacity: 0;
            }
            position: absolute;
            bottom: -4px;
            width: 160px;
            opacity: 1;
            z-index: 10;
            border-bottom: 4px solid ${Common.colors.accent100};
            transition-duration: 0.4s;
            transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
          }
          > li {
            > a,
            span {
              display: inline-block;
              padding: 10px 35px;
              width: 160px;
              text-align: center;
              color: ${Common.colors.black};
              font-size: 17px;
              font-weight: bold;
              line-height: 1.63;
              font-stretch: normal;
              font-style: normal;
              letter-spacing: normal;
              transition: all 0.2s ease;
              &:hover {
                font-weight: bold;
                text-decoration: none;
                color: ${Common.colors.accent100};
              }
              &:after {
                opacity: 0;
              }
              &.active {
                font-weight: bold;
                color: ${Common.colors.accent100};
              }
            }
            &.banner:hover ~ .drop_downContainer {
              .menu_benner {
                display: flex;
              }
            }
            &.print:hover ~ .drop_downContainer {
              .menu_print {
                display: flex;
              }
            }
            &.real:hover ~ .drop_downContainer {
              .menu_real {
                display: flex;
              }
            }
          }
          .drop_downContainer {
            position: absolute;
            overflow: auto;
            display: none;
            top: 45px;
            z-index: 5;
            width: ${Common.size.containerWidth};
            height: 410px;
            background: #fff;
            box-shadow: 0px 3px 3px 2px rgba(0, 0, 0, 0.05);
            .nav_item {
              display: none;
              justify-content: start;
              height: 100%;
              padding: 50px;
              &:hover {
                display: flex;
              }
              .title {
                font-size: 25px;
                font-weight: bold;
              }
              .nav_menu_item {
                flex: 1;
                margin-right: 50px;
                h1 {
                  max-width: 250px;
                  font-size: 18px;
                  padding: 10px 0;
                  margin-bottom: 10px;
                  border-bottom: 1px solid ${Common.colors.accent100};
                }
                ul {
                  display: flex;
                  flex-direction: column;
                  flex-wrap: wrap;
                  height: 250px;
                }
                li {
                  font-size: 16px;
                  color: ${Common.colors.text200};
                  cursor: pointer;
                  padding: 8px 5px;
                  margin-right: 10px;
                  &:hover {
                    color: ${Common.colors.accent100};
                  }
                }
              }
            }
          }
          &:hover {
            .drop_downContainer {
              display: block;
            }
          }
        }
      }
    }
  }
`;
export default HeaderContainer;
