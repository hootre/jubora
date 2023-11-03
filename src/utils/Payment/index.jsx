'use client';

import toast from 'react-hot-toast';
import { v4 } from 'uuid';
import { Payments_container } from './style';
import Image from 'next/image';
import { usePayment } from 'hooks/supabase/payment/usePayment';

export const Payments = ({ order_data }) => {
  const { useCreatePayment } = usePayment();
  const { mutate: createPayment } = useCreatePayment();
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
      name: order_data.title,
      amount: order_data.price,
      buyer_email: order_data.writer_user_email,
      buyer_name: order_data.name,
    };
    /* 4. 결제 창 호출하기 */
    IMP.request_pay(data, (res) => callback(res, order_data, 'kakaopay'));
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
      name: order_data.title,
      amount: order_data.price,
      buyer_email: order_data.writer_user_email,
      buyer_name: order_data.name,
    };
    /* 4. 결제 창 호출하기 */
    IMP.request_pay(data, (res) => callback(res, order_data, 'tosspayments'));
  };
  const callback = async (res, order_data, pg) => {
    const { success, error_msg, merchant_uid, imp_uid } = res;
    const pay_data = {
      pg,
      product_image: order_data.image,
      name: order_data.title,
      amount: order_data.price,
      buyer_email: order_data.writer_user_email,
      buyer_name: order_data.name,
      address: {
        address_1: order_data.address_1,
        address_2: order_data.address_2,
        address_3: order_data.address_3,
        zonecode: order_data.zonecode,
      },
      merchant_uid,
      imp_uid,
    };

    if (success) {
      createPayment(pay_data);
    } else {
      toast.error(`${error_msg}`);
    }
  };

  return (
    <Payments_container>
      <div>
        <button className="C_basic_button">카드결제</button>
      </div>
      <div className="tosspay" onClick={tosspayHandler}>
        <img src="/image/tosspay.png" alt="토스페이" />
      </div>
      <div className="kakaopay" onClick={kakaopayHandler}>
        <img src="/image/kakaopay.png" alt="카카오페이" />
      </div>
    </Payments_container>
  );
};
