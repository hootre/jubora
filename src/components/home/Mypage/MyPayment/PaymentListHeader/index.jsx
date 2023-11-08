import PaymentListHeaderContainer from './style';

export default function PaymentListHeader() {
  return (
    <PaymentListHeaderContainer>
      <div>
        <span className="date">결제일</span>
        <span className="title">제품이름</span>
        <span className="delivery">결제방법</span>
        <span className="price">총 결제금액</span>
      </div>
    </PaymentListHeaderContainer>
  );
}
