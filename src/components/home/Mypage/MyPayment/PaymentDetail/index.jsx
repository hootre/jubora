'use client';

import usePayment from 'hooks/supabase/payment/usePayment';
import MainLoading from 'components/Loading/MainLoading';
import { DiBrackets } from 'react-icons/di';
import DataTableContainer from './style';

export default function PaymentDetail({ id }) {
  const { useGetOnlyPayment } = usePayment();
  const { data, isLoading } = useGetOnlyPayment(id);

  if (isLoading) {
    return <MainLoading />;
  }
  return (
    <DataTableContainer>
      <div className="title_box">
        <div className="title">
          <DiBrackets className="icon" />
          <h1>제품 정보</h1>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>상태</th>
            <th>제품</th>
            <th>제품이름</th>
            <th>결제가격</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="state">결제완료</td>
            <td>
              <img src={data.productImage} alt="select_img" className="select_img" />
            </td>
            <td>{data.name}</td>
            <td className="price">
              {data.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
            </td>
          </tr>
        </tbody>
      </table>

      <div className="title_box">
        <div className="title">
          <DiBrackets className="icon" />
          <h1>주문자 정보</h1>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>이메일</th>
            <th>이름/교회명</th>
            <th>결제수단</th>
            <th>주소</th>
            <th>우편번호</th>
            <th>결제일</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{data.buyerEmail}</td>
            <td>{data.buyerName}</td>
            <td>{data.pg}</td>
            <td>{`${data.address.address1} ${data.address.address2} ${data.address.address3} `}</td>
            <td>{`${data.address.zonecode}`}</td>
            <td>{String(data.createdAt).substring(0, 10)}</td>
          </tr>
        </tbody>
      </table>
      <div className="btn_box">
        <button type="button">영수증 출력</button>
        <button type="button">견적서 출력</button>
      </div>
    </DataTableContainer>
  );
}
