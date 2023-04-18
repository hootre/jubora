import React from 'react';
import { NoticeBox } from './styles';

export const Notice = ({ noticeList }) => {
  return (
    <NoticeBox>
      <div>
        <div className="title">
          <h1>Notice</h1>
        </div>
        <div className="notice">
          <ul className="noticeList">
            {noticeList &&
              noticeList.map((item, idx) => {
                return (
                  <li key={idx}>
                    <a href="#">{item[0]}</a>
                    <svg className="SvgIcon_SvgIcon__root__svg__DKYBi" viewBox="0 0 18 18">
                      <path d="m11.955 9-5.978 5.977a.563.563 0 0 0 .796.796l6.375-6.375a.563.563 0 0 0 0-.796L6.773 2.227a.562.562 0 1 0-.796.796L11.955 9z"></path>
                    </svg>
                  </li>
                );
              })}
          </ul>
          <a href="#" className="bottomBanner">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/weenidy-subscribe-prod.appspot.com/o/settings%2Fmain-bottom-banner%2F17e47a5fb3a0cc6b0ee93.jpg?alt=media&token=888ffbef-3445-4a01-a389-3913bd02f456"
              alt=""
            />
          </a>
        </div>
      </div>
    </NoticeBox>
  );
};
