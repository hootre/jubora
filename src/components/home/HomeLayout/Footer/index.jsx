import React from 'react';
import { Footer_container } from './style.jsx';
export const Footer = ({ logoImage }) => {
  return (
    <Footer_container>
      <div className="footer C_container">
        <div className="footerContent">
          <nav>
            <ul>
              <li>공지사항</li>
              <li>
                <span></span>
              </li>
              <li>이용안내</li>
              <li>
                <span></span>
              </li>
              <li>개인정보취급방침</li>
              <li>
                <span></span>
              </li>
              <li>라이선스</li>
            </ul>
          </nav>
          <div className="footerInfo">
            <img src={logoImage} alt="footer" />
            <div>
              <p>
                <b>상호</b> : JK주보라 <b>사업자등록번호</b> : 593-56-00232
              </p>
              <p>
                <b>주소</b> : 하남시 미사강변한강로 135 미사스카이폴리스 다동 716호{' '}
                <b>정보관리자</b> : 전동준
              </p>
              <p>
                <b>대표번호</b> : 070-4700-1895 <b>팩스번호</b> : 02-494-4199
              </p>
              <p>Copyright(C) jubora.co.kr. All rights reserved.</p>
            </div>
          </div>
        </div>
        <div className="footerCs">
          <p className="footerTitle">
            고객센터 <span>mm1895@naver.com</span>
          </p>
          <p>평일 09:00~20:00 토/일 휴무</p>
        </div>
      </div>
    </Footer_container>
  );
};
