import styled from 'styled-components';

export const HeaderBox = styled.div`
  box-shadow: 0px 9px 11px 5px rgba(0, 0, 0, 0.05);
  .topHeader {
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--base-color-back);
    height: 40px;
    cursor: pointer;
    transition: height 0.3s ease;
    overflow: hidden;
  }
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
            color: var(--base-color-Btext);
            font-size: 14px;
            font-weight: 500;
            line-height: 1.63;
            font-stretch: normal;
            font-style: normal;
            letter-spacing: normal;
            &:hover {
              font-weight: bold;
              color: #000;
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
        background: #f4f5f5;
        border: 1px solid #dcdcdc;
        box-sizing: border-box;
        border-radius: 17px;
        height: 34px;
        margin-right: 25px;
        transition: all 0.5s;
        &:hover {
          border-color: #245fb1;
        }
        input {
          font-size: 14px;
          font-weight: 500;
          line-height: 1.64;
          font-stretch: normal;
          font-style: normal;
          letter-spacing: normal;
          color: #262630;
          width: 100%;
          color: #464646;
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
              background-color: #b9b9b9;
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
              color: #262630;
              color: #aaa;
            }
          }
        }
      }
    }
  }
`;
