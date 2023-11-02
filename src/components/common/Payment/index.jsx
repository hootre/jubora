'use client';

import toast from 'react-hot-toast';
import { v4 } from 'uuid';

export const Payments = () => {
  const paymentHandler = () => {
    if (!window.IMP) return;
    /* 1. 가맹점 식별하기 */
    const { IMP } = window;
    IMP.init(process.env.NEXT_PUBLIC_IAMPORT_IMP); // 가맹점 식별코드

    /* 2. 결제 데이터 정의하기 */
    const data = {
      pg: 'kakaopay', // PG사 코드표 참조
      pay_method: 'card',
      // 주문번호는 결제창 요청 시 항상 고유 값으로 채번 되어야 합니다.
      // 결제 완료 이후 결제 위변조 대사 작업시 주문번호를 이용하여 검증이 필요하므로 주문번호는 가맹점 서버에서 고유하게(unique)채번하여 DB 상에 저장해주세요
      merchant_uid: `mid_${v4()}`, // 주문번호
      name: '노르웨이',
      amount: 100, // 숫자 타입
      buyer_email: 'zxv7295@naver.com',
      buyer_name: '전동준',
      // notice_url: "http//localhost:3002/api/payments/webhook",
    };

    const pay_data = {
      name: '결제해당 제품',
      amount: '결제 금액',
      buyer_email: '결제자 이메일',
      buyer_name: '결제자 이름',
      address: {
        address_1: '서울 광진구',
        address_2: '면목로 1(군자동)',
        address_3: '201호',
      },
    };
    /* 4. 결제 창 호출하기 */
    IMP.request_pay(data, (res) => callback(res, pay_data));
  };

  const callback = async (res) => {
    const { success, error_msg, merchant_uid, imp_uid } = res;
    console.log('imp_uid : ', imp_uid);

    if (success) {
      console.log('data : ', 결제성공);
    } else {
      toast.error(`결제 실패: ${error_msg}`);
    }
  };

  return (
    <>
      <button onClick={paymentHandler} className="C_basic_button">
        결제하기
      </button>
    </>
  );
};
