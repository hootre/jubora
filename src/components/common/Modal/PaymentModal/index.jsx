import React from 'react';
import './PaymentModal.scss';
export const PaymentModal = ({ toggleIsPayment }) => {
  return (
    <article className="paymentModal_container">
      <div className="back" onClick={toggleIsPayment}></div>
      <div className="content_box">
        <div className="pay_list">
          <h1>결제요청</h1>
          <ul className="cart_list">
            <li>
              <img
                src="http://jubora.co.kr/data/file/sp01_04/3554112016_6SwQDHbC_EAB3A0EB829C23.jpg"
                alt="img"
                className="img"
              />
              <div className="content">
                <h3 className="title">레트로 타이틀 템플릿</h3>
                <h4 className="category">현수막/배너</h4>
                <h3 className="price">9,800원</h3>
              </div>
            </li>
            <li>
              <img
                src="http://jubora.co.kr/data/file/sp01_04/3554112016_6SwQDHbC_EAB3A0EB829C23.jpg"
                alt="img"
                className="img"
              />
              <div className="content">
                <h3 className="title">레트로 타이틀 템플릿</h3>
                <h4 className="category">현수막/배너</h4>
                <h3 className="price">9,800원</h3>
              </div>
            </li>
          </ul>
          {/* <div className="noCart">
            <MdOutlineRemoveShoppingCart className="icon" />
            <h2>결제관련 상품이 없습니다</h2>
            <h3>시안보기 완료후에 결제 진행이 가능합니다</h3>
          </div> */}
        </div>
        <div className="order_info">
          <h1>내 정보</h1>
        </div>
      </div>
    </article>
  );
};
