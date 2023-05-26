import styled from 'styled-components';

export const RegisterBox = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 249px);
  .pointText {
    height: 0;
    overflow: hidden;
    color: var(--base-red);
    font-size: 13px;
    opacity: 0.2;
    transition: all 0.5s ease;
    &.active {
      display: block;
      height: auto;
      opacity: 1;
      padding: 10px;
    }
    &.checkActive {
      display: block;
      height: auto;
      opacity: 1;
    }
  }
  input.invalid {
    border-color: #f03c3280;
    box-shadow: 0 0 0 3px #f03c3226;
  }
  > div {
    max-width: 400px;
    width: 100%;
    margin: 0 auto;
    > div {
      width: 100%;
      padding: 25px;
      background: var(--base-white);
      border-radius: 5px;
      border: 1px solid var(--bd-100);
      .title {
        display: flex;
        justify-content: center;
        margin: 50px 0 70px;
      }
      form {
        .emailLabel {
          margin: 17px 0 7px 10px;
          label {
            color: var(--text-100);
            font-size: 16px;
          }
        }
        .topMessage {
          padding: 10px;
        }
        input.input {
          width: 100%;
          height: 50px;
          min-height: 50px;
          padding: 0px 12px;
          outline: none;
          border: 1px solid var(--bd-100);
          color: var(--text-100);
          border-radius: 5px;
          font-size: 14px;
          font-weight: 400;
          margin-bottom: 8px;
        }
        // 체크박스 영역
        .checkBox {
          > div {
            display: flex;
            align-items: center;
            padding: 10px 0;
            color: var(--text-300);
            width: 100%;
            height: 50px;
            .check {
            }
            a {
              text-decoration: underline;
              color: var(--text-200);
            }
          }

          .label {
            display: flex;
            align-items: center;
            cursor: pointer;
            height: 30px;
            font-size: 13px;
            .label__checkbox {
              display: none;
            }
            .label__icon {
              width: 30px;
            }
            .label__check {
              border-radius: 50%;
              border: 3px solid rgba(0, 0, 0, 0.1);
              background: white;
              vertical-align: middle;
              width: 20px;
              height: 20px;
              cursor: pointer;
              display: flex;
              align-items: center;
              justify-content: center;
              transition: border 0.3s ease;

              .icon {
                opacity: 0.2;
                font-size: 12px;
                color: transparent;
                transition: opacity 0.3s 0.1s ease;
                -webkit-text-stroke: 3px rgba(0, 0, 0, 0.5);
              }

              &:hover {
                border: 3px solid rgba(0, 0, 0, 0.2);
              }
            }
          }

          .label__checkbox:checked + .label__icon .label__check {
            animation: check 0.5s cubic-bezier(0.895, 0.03, 0.685, 0.22) forwards;

            .icon {
              opacity: 1;
              transform: scale(0);
              color: white;
              -webkit-text-stroke: 0;
              animation: icon 0.3s cubic-bezier(1, 0.008, 0.565, 1.65) 0.1s 1 forwards;
            }
          }

          @keyframes icon {
            from {
              opacity: 0;
              transform: scale(0.3);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }

          @keyframes check {
            0% {
              width: 15px;
              height: 15px;
              border-width: 5px;
            }
            10% {
              width: 15px;
              height: 15px;
              opacity: 0.1;
              background: rgba(0, 0, 0, 0.2);
              border-width: 15px;
            }
            12% {
              width: 15px;
              height: 15px;
              opacity: 0.4;
              background: rgba(0, 0, 0, 0.1);
              border-width: 0;
            }
            50% {
              width: 20px;
              height: 20px;
              background: #00d478;
              border: 0;
              opacity: 0.6;
            }
            100% {
              width: 20px;
              height: 20px;
              background: #00d478;
              border: 0;
              opacity: 1;
            }
          }
        }
        // 회원가입 영역
        .submit {
          width: 100%;
          height: 50px;
          min-height: 50px;
          border-radius: 25px;
          font-size: 14px;
          margin-bottom: 10px;
          cursor: pointer;
          color: var(--text-200);
          background: var(--bg-100);
          border: none;
          margin-top: 30px;
          &.possible {
            color: var(--base-white);
            background: var(--primary-100);
          }
        }
        .or {
          color: var(--text-200);
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
            cursor: pointer;
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
                border: 1px solid var(--bd-100);
                box-sizing: border-box;
              }
              svg {
                width: 56px;
                height: 56px;
              }
            }
            p {
              margin-top: 8px;
              color: var(--text-200);
            }
          }
        }

        .footerBtn {
          display: flex;
          justify-content: center;
          margin-top: 30px;
          .forgetEmail {
            &:nth-child(1) {
              border-right: 1px solid var(--bd-100);
            }
            cursor: pointer;
            > p {
              color: var(--text-200);
              font-size: 12px;
              font-weight: bold;
            }
          }
        }
      }
    }
  }
`;
