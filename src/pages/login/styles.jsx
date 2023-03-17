import styled from 'styled-components';

export const LoginBox = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 289px);
  background: #f7f7f7;
  > div {
    max-width: 400px;
    width: 100%;
    margin: 0 auto;
    > div {
      width: 100%;
      padding: 25px;
      background: #fff;
      border-radius: 5px;
      border: 1px solid #e1e2e3;
      .title {
        display: flex;
        justify-content: center;
        margin: 50px 0 70px;
      }
      form {
        .emailLabel {
          margin: 17px 0 7px;
          label {
            color: #888;
          }
        }
        input.emailInput {
          width: 100%;
          height: 50px;
          min-height: 50px;
          padding: 0px 12px;
          outline: none;
          border: 1px solid #e1e2e3;
          color: #333;
          border-radius: 5px;
          font-size: 14px;
          font-weight: 400;
          margin-bottom: 8px;
        }
        .submit {
          width: 100%;
          height: 50px;
          min-height: 50px;
          border-radius: 25px;
          font-size: 14px;
          margin-bottom: 10px;
          cursor: pointer;
          color: #ccc;
          background: #f2f4f7;
          border: none;
          margin-top: 30px;
          span {
          }
        }
        .or {
          color: #bbb;
          font-size: 10px;
          text-align: center;
          margin: 5px 0 15px;
        }
        .webLogin {
          display: flex;
          justify-content: center;
          button {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            border: none;
            span {
              position: relative;
              display: flex;
              &:after {
                position: absolute;
                content: '';
                left: 0px;
                top: 0px;
                width: 100%;
                height: 100%;
                border-radius: 50%;
                border: 1px solid #e1e2e3;
                box-sizing: border-box;
              }
              svg {
                width: 56px;
                height: 56px;
              }
            }
            p {
              margin-top: 8px;
              color: #888;
            }
          }
        }
        .forgetEmail {
          width: 100%;
          cursor: pointer;

          > p {
            display: inline-flex;
            align-items: center;
            color: #767676;
            font-size: 12px;
            font-weight: bold;
            margin-top: 30px;
          }
        }
      }
    }
  }
`;
