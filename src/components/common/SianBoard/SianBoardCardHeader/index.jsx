import React from 'react';
import SianBoardCardHeaderContainer from './style';

export default function SianBoardCardHeader() {
  return (
    <SianBoardCardHeaderContainer>
      <div>
        <span className="date">주문일</span>
        <span className="title">제품이름</span>
        <span className="orderId">시안번호</span>
        <span className="state">처리현황</span>
        <span className="delivery">배송방법</span>
        <span className="price">총 결제금액</span>
      </div>
    </SianBoardCardHeaderContainer>
  );
}
