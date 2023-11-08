'use client';

import toast from 'react-hot-toast';
import { v4 } from 'uuid';
import usePayment from 'hooks/supabase/payment/usePayment';
import PaymentsContainer from './style';

function Payments({ orderData }) {
  const { useCreatePayment } = usePayment();
  const { mutate: createPayment } = useCreatePayment();
  const callback = async (res, data, pg) => {
    // eslint-disable-next-line camelcase
    const { success, error_msg, merchant_uid, imp_uid } = res;
    const payData = {
      pg,
      productImage: data.image,
      name: data.title,
      amount: data.price,
      buyerEmail: data.writerUserEmail,
      buyerName: data.name,
      address: {
        address1: data.address1,
        address2: data.address2,
        address3: data.address3,
        zonecode: data.zonecode,
      },
      merchantUid: merchant_uid,
      impUid: imp_uid,
    };

    if (success) {
      createPayment(payData);
    } else {
      // eslint-disable-next-line camelcase
      toast.error(`${error_msg}`);
    }
  };
  // 카카오페이
  const kakaopayHandler = () => {
    if (!window.IMP) return;
    /* 1. 가맹점 식별하기 */
    const { IMP } = window;
    IMP.init(process.env.NEXT_PUBLIC_IAMPORT_IMP); // 가맹점 식별코드

    /* 2. 결제 데이터 정의하기 */
    const data = {
      pg: 'kakaopay', // PG사 코드표 참조
      pay_method: 'card',
      merchant_uid: `mid_${v4()}`, // 주문번호
      name: orderData.title,
      amount: orderData.price,
      buyerEmail: orderData.writerUserEmail,
      buyerName: orderData.name,
    };
    /* 4. 결제 창 호출하기 */
    IMP.request_pay(data, (res) => callback(res, orderData, 'kakaopay'));
  };
  // 토스페이먼츠
  const tosspayHandler = () => {
    if (!window.IMP) return;
    /* 1. 가맹점 식별하기 */
    const { IMP } = window;
    IMP.init(process.env.NEXT_PUBLIC_IAMPORT_IMP); // 가맹점 식별코드

    /* 2. 결제 데이터 정의하기 */
    const data = {
      pg: 'tosspayments', // PG사 코드표 참조
      pay_method: 'card',
      merchant_uid: `mid_${v4()}`, // 주문번호
      name: orderData.title,
      amount: orderData.price,
      buyerEmail: orderData.writerUserEmail,
      buyerName: orderData.name,
    };
    /* 4. 결제 창 호출하기 */
    IMP.request_pay(data, (res) => callback(res, orderData, 'tosspayments'));
  };

  return (
    <PaymentsContainer>
      <div>
        <button type="button" className="C_basic_button">
          카드결제
        </button>
      </div>
      <button type="button" className="tosspay" onClick={tosspayHandler}>
        <img src="/image/tosspay.png" alt="토스페이" />
      </button>
      <button type="button" className="kakaopay" onClick={kakaopayHandler}>
        <img src="/image/kakaopay.png" alt="카카오페이" />
      </button>
    </PaymentsContainer>
  );
}

export default Payments;
