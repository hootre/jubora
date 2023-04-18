import styled from 'styled-components';

export const HeaderBox = styled.div`
  box-shadow: 0px 9px 11px 5px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 5;
  backdrop-filter: blur(30px);
  background-color: var(--bg-300);
  #header {
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    padding: 0 70px;
    #navBox {
      display: flex;
      img {
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
          border-bottom: 4px solid #ffb838;
          transition-duration: 0.4s;
          transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        li {
          padding: 0 15px;
          width: 110px;
          text-align: center;
          a {
            color: var(--text-200);
            font-size: 14px;
            font-weight: 500;
            line-height: 1.63;
            font-stretch: normal;
            font-style: normal;
            letter-spacing: normal;
            &:hover {
              font-weight: bold;
              text-decoration: none;
              color: var(--text-100);
            }
            &:after {
              opacity: 0;
            }
            &.active {
              font-weight: bold;
              color: var(--text-100);
            }
          }
        }
      }
    }
    #subBox {
      display: flex;
      align-items: center;
      .search {
        display: flex;
        align-items: center;
        padding: 5px 18px;
        background: var(--bg-100);
        border: 1px solid var(--bg-200);
        box-sizing: border-box;
        border-radius: 17px;
        height: 34px;
        margin-right: 25px;
        transition: all 0.3s;
        &:hover {
          border-color: var(--primary-300);
        }
        &:focus-within {
          background-color: var(--base-white);
          box-shadow: 0px 9px 11px 5px rgba(0, 0, 0, 0.05);
        }
        svg {
          color: var(--text-200);
        }
        input {
          font-size: 14px;
          font-weight: 500;
          line-height: 1.64;
          font-stretch: normal;
          font-style: normal;
          letter-spacing: normal;
          color: var(--text-100);
          width: 100%;
          line-height: 22px;
          border: none;
          background: inherit;
          height: 22px;
          margin-left: 5px;
        }
      }
      .login {
        > ul {
          display: flex;
          align-items: center;
          .item {
            position: relative;
            span {
              display: block;
              width: 1px;
              height: 14px;
              background-color: var(--bg-200);
              margin: 0 20px;
            }
            a {
              cursor: pointer;
              display: flex;
              align-items: center;
              font-size: 12px;
              font-weight: 500;
              line-height: 1.67;
              font-stretch: normal;
              font-style: normal;
              letter-spacing: normal;
              color: var(--text-200);
            }
          }
        }
      }
    }
  }
`;
