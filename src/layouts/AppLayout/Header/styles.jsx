import styled from 'styled-components';

export const HeaderBox = styled.div`
  box-shadow: 0px 9px 11px 5px rgba(0, 0, 0, 0.05);

  position: sticky;
  top: 0;
  z-index: 100;
  opacity: 0.9;
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
        li {
          margin-right: 30px;
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
        transition: all 0.5s;
        &:hover {
          border-color: var(--primary-300);
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
        }
      }
      .login {
        ul {
          display: flex;
          align-items: center;
          li {
            span {
              display: block;
              width: 1px;
              height: 14px;
              background-color: var(--bg-200);
              margin: 0 20px;
            }
            a {
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
