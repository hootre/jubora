import Image from 'next/image';
import logo from 'assets/MainPage/logo.png';
import React, { useState } from 'react';
import { LoginBox } from './styles';
import { GoogleLogin } from 'api/firebase';
const login = () => {
  const [user, setUser] = useState();
  const handleLogin = () => {
    GoogleLogin().then(setUser);
  };
  return (
    <LoginBox>
      <div>
        <div>
          <div className="title">
            <a href="#">
              <Image src={logo} alt="" />
            </a>
          </div>
          <form action="">
            <div className="emailLabel">
              <label htmlFor="email">이메일</label>
            </div>
            <input type="email" className="emailInput" placeholder="이메일을 입력해주세요." />
            <button type="submit" className="submit">
              <span>이메일로 계속하기</span>
            </button>
            <p className="or">또는</p>
            <div className="webLogin">
              <button type="button" className="googleBtn" onClick={handleLogin}>
                <span>
                  <svg viewBox="0 0 57 56" className="css-1h47l4s">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M41.6657 28.3122C41.6657 27.34 41.5789 26.4044 41.4158 25.5068H28.5V30.8112H35.8813C35.5629 32.5255 34.5968 33.9792 33.1446 34.9514V38.3922H37.5758C40.1693 36.0044 41.6657 32.4889 41.6657 28.3122Z"
                      fill="#3D82F0"
                    ></path>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M28.5003 41.7146C32.2032 41.7146 35.3072 40.4864 37.5761 38.3927L33.1449 34.9504C31.9167 35.7733 30.3457 36.2594 28.5003 36.2594C24.9285 36.2594 21.9053 33.8472 20.8264 30.606H16.2443V34.1595C18.5011 38.6411 23.1396 41.7146 28.5003 41.7146Z"
                      fill="#31A752"
                    ></path>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M20.8261 30.606C20.5518 29.7831 20.3964 28.9039 20.3964 28.0002C20.3964 27.0966 20.5518 26.2174 20.8261 25.3945V21.841H16.244C15.316 23.6924 14.7857 25.7877 14.7857 28.0002C14.7857 30.2128 15.316 32.3081 16.244 34.1595L20.8261 30.606Z"
                      fill="#F9BA00"
                    ></path>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M28.5003 19.7407C30.5133 19.7407 32.322 20.4325 33.7422 21.7917L37.6767 17.8588C35.3011 15.6447 32.1971 14.2855 28.5003 14.2855C23.1396 14.2855 18.5011 17.359 16.2443 21.842L20.8264 25.394C21.9053 22.1529 24.9285 19.7407 28.5003 19.7407Z"
                      fill="#E64234"
                    ></path>
                  </svg>
                </span>
                <p>Google</p>
              </button>
              <button type="button" className="kakaoBtn">
                <span>
                  <svg viewBox="0 0 57 56">
                    <path
                      d="M0.5 28C0.5 12.536 13.036 0 28.5 0C43.964 0 56.5 12.536 56.5 28C56.5 43.464 43.964 56 28.5 56C13.036 56 0.5 43.464 0.5 28Z"
                      fill="#FEE500"
                    ></path>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M28.5 16.2063C21.5606 16.2063 15.9286 20.5812 15.9286 25.9617C15.9286 29.3183 18.1034 32.2474 21.4223 34.0326L20.0269 39.1492C20.0005 39.2509 20.006 39.3583 20.0424 39.4569C20.0788 39.5555 20.1446 39.6406 20.2307 39.7008C20.3169 39.761 20.4195 39.7934 20.5246 39.7937C20.6297 39.7939 20.7324 39.7621 20.8189 39.7023L26.9286 35.6417C27.444 35.6417 27.972 35.7297 28.5 35.7297C35.4394 35.7297 41.0714 31.3549 41.0714 25.9617C41.0714 20.5686 35.4394 16.2063 28.5 16.2063Z"
                      fill="#181600"
                    ></path>
                  </svg>
                </span>
                <p>Kakao</p>
              </button>
            </div>
            <button type="button" className="forgetEmail">
              <p>계정을 잊으셨나요?</p>
            </button>
          </form>
        </div>
      </div>
    </LoginBox>
  );
};

export default login;
