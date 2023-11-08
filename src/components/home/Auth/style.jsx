import styled from '@emotion/styled';
import Common from 'styles/Common';

const AuthContainer = styled.section`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  min-height: 500px;
  box-shadow: 24px;
  padding: 30px;
  background: ${Common.colors.white};
  border-radius: 15px;
  .closeBtn {
    position: absolute;
    top: 15px;
    right: 15px;
    cursor: pointer;
  }
  .title {
    display: flex;
    flex-direction: column;
    gap: 10px;
    h2 {
      font-size: 15px;
      color: ${Common.colors.text200};
    }
    h1 {
      font-size: 20px;
    }
  }
  .login_util {
    display: flex;
    justify-content: start;
    align-items: center;
    margin: 20px 0;
    border-bottom: 1px solid ${Common.colors.bd100};
    > li {
      font-size: 13px;
      padding: 15px;
      cursor: pointer;
      &.active {
        font-weight: bold;
        color: ${Common.colors.primary100};
        border-bottom: 2px solid ${Common.colors.primary100};
      }
    }
  }
  .forgetPassword_title {
    > h1 {
      font-size: 20px;
      padding: 30px 0;
    }
  }
  main {
    animation: smoothAppear 0.5s;
  }
  .form_box {
    input.input {
      width: 100%;
      height: 40px;
      line-height: 40px;
      padding: 0px 12px;
      outline: none;
      border: 1px solid ${Common.colors.bd100};
      color: ${Common.colors.text100};
      border-radius: 5px;
      font-size: 14px;
      font-weight: 400;
      margin-bottom: 8px;
      &:hover {
        border: 1px solid ${Common.colors.primary100};
      }
    }
    .passwordForget {
      display: flex;
      justify-content: end;
      text-decoration: underline;
      margin-bottom: 5px;
      font-size: 11px;
      color: ${Common.colors.text200};
      cursor: pointer;
      &:hover {
        color: ${Common.colors.text100};
      }
    }
    // 비밀번호 초기화 메일
    .alert_box {
      margin: 15px 0 20px 0;
      background: ${Common.colors.primaryBg};
      color: ${Common.colors.text100};
      > li {
        font-size: 12px;
        padding: 15px;
      }
    }
    .go_login {
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 11px;
      text-decoration: underline;
      color: ${Common.colors.text300};
      &:hover {
        color: ${Common.colors.black};
      }
    }

    // 회원가입 영역
    .submit {
      width: 100%;
      height: 40px;
      border-radius: 5px;
      font-size: 16px;
      font-weight: bold;
      margin-top: 30px;
      margin-bottom: 10px;
      opacity: 0.4;
      cursor: pointer;
      color: ${Common.colors.text200};
      border: 1px solid rgba(0, 0, 0, 0.3);
      background: ${Common.colors.white};
      &.possible {
        color: ${Common.colors.white};
        opacity: 1;
        background: ${Common.colors.primary100};
      }
    }
    // SignIn 웹 로그인
    .social_login_box {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 20px;
      button {
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        &.googleBtn {
          background-color: #f4f4f4;
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background-repeat: no-repeat;
          background-position: center;
          margin-bottom: 5px;
        }
        &.kakaoBtn {
          background-color: #ffe800;
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background-repeat: no-repeat;
          background-position: center;
          margin-bottom: 5px;
        }
      }
    }
    // SignUpSocial btn
    .signUp_social {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 10px;
      button {
        width: 200px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 13px;
        font-weight: bold;
        transition: all 0.2s ease;
        cursor: pointer;
        &.googleBtn {
          background-color: #f4f4f4;
        }
        &.kakaoBtn {
          background-color: #ffe800;
        }
        &.emailBtn {
          color: ${Common.colors.primary200};
          border: 1px solid ${Common.colors.primary100};
        }
        &:hover {
          transform: translateY(-2px);
          box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
        }
      }
    }
    // SignUp 체크박스 영역
    .checkBox {
      > div {
        display: flex;
        align-items: center;
        padding: 10px 0;
        color: ${Common.colors.text300};
        width: 100%;
        height: 50px;
        a {
          text-decoration: underline;
          color: ${Common.colors.text200};
        }
      }

      .label {
        display: flex;
        align-items: center;
        cursor: pointer;
        height: 30px;
        font-size: 12px;
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
          width: 20px;
          height: 20px;
        }
        10% {
          width: 20px;
          height: 20px;
          opacity: 0.1;
          background: rgba(0, 0, 0, 0.2);
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
          background: ${Common.colors.successText};
          border: 0;
          opacity: 0.6;
        }
        100% {
          width: 20px;
          height: 20px;
          background: ${Common.colors.successText};
          border: 0;
          opacity: 1;
        }
      }
    }
  }
`;
export default AuthContainer;
