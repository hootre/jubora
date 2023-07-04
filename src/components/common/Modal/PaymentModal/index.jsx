import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'react-hot-toast';
import { PaymentModal_container } from './style.jsx';
export const PaymentModal = ({ toggleIsPayment }) => {
  const [currentAccount, setCurrentAccount] = useState(0);
  return (
    <PaymentModal_container>
      <div className="back" onClick={toggleIsPayment}></div>
      <div className="content_box">
        <div className="pay_box">
          {/* <div className="noCart">
            <MdOutlineRemoveShoppingCart className="icon" />
            <h2>결제관련 상품이 없습니다</h2>
            <h3>시안보기 완료후에 결제 진행이 가능합니다</h3>
          </div> */}
          <h1>결제 목록</h1>
          <ul className="cart_list">
            <li className="ac_await">
              <img
                src="http://jubora.co.kr/data/file/sp01_04/3554112016_6SwQDHbC_EAB3A0EB829C23.jpg"
                alt="img"
                className="img"
              />
              <div className="content ">
                <div className="state ">결제대기</div>
                <h3 className="title">레트로 타이틀 템플릿</h3>
                <h4 className="category">현수막/배너</h4>
                <h3 className="price">9,800원</h3>
              </div>
            </li>
            <li className="ac_await">
              <img
                src="http://jubora.co.kr/data/file/sp01_04/3554112016_6SwQDHbC_EAB3A0EB829C23.jpg"
                alt="img"
                className="img"
              />
              <div className="content ">
                <div className="state ">결제대기</div>
                <h3 className="title">레트로 타이틀 템플릿</h3>
                <h4 className="category">현수막/배너</h4>
                <h3 className="price">9,800원</h3>
              </div>
            </li>
            <li className="ac_await">
              <img
                src="http://jubora.co.kr/data/file/sp01_04/3554112016_6SwQDHbC_EAB3A0EB829C23.jpg"
                alt="img"
                className="img"
              />
              <div className="content ">
                <div className="state ">결제대기</div>
                <h3 className="title">레트로 타이틀 템플릿</h3>
                <h4 className="category">현수막/배너</h4>
                <h3 className="price">9,800원</h3>
              </div>
            </li>
            <li className="ac_delivery_ing">
              <img
                src="http://jubora.co.kr/data/file/sp01_04/3554112016_6SwQDHbC_EAB3A0EB829C23.jpg"
                alt="img"
                className="img"
              />
              <div className="content ">
                <div className="state">배송중</div>
                <h3 className="title">레트로 타이틀 템플릿</h3>
                <h4 className="category">현수막/배너</h4>
                <h3 className="price">9,800원</h3>
              </div>
            </li>
          </ul>
        </div>
        <div className="order_info">
          <h1>결제정보</h1>
          <div className="order_content">
            <div className="order_phone_box">
              <h2>주문자 번호</h2>
              <p>입력하시면 문자로 계좌번호가 전송됩니다.</p>
              <input type="tel" pattern="[0-9]{3}[0-9]{4}[0-9]{4}" placeholder="ex) 01012345678" />
            </div>

            <div className="account_number_box">
              <p>농협(전동찬) 352-1400-1028-63</p>
              <CopyToClipboard
                text="농협 352-1400-1028-63"
                onCopy={() => toast.success('클립보드에 복사되었습니다.')}
              >
                <button>복사</button>
              </CopyToClipboard>
            </div>
          </div>
          <button className="basic_button">문자전송</button>
        </div>
      </div>
    </PaymentModal_container>
  );
};
