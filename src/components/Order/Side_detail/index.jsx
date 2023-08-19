import React from 'react';
import { Side_datail_container } from './style';
import { useFormContext } from 'react-hook-form';

export const Side_detail = () => {
  // react hooks form
  const { register, watch } = useFormContext();
  if (watch('price') !== undefined) {
    return (
      <Side_datail_container>
        <h1>상세보기</h1>
        <div className="side_content">
          <img src="https://www.nuriad.co.kr/data/bbsData/16376633441.jpg" alt="" />
          <h1>사방 타공</h1>
          <p>
            상하 또는 좌우 중 짧은 쪽 폭에 원형막대를 넣어 고정한 뒤, 로프를 엮어드리는 방법입니다.
            로프까지 완조립되어 있어 간편하게 외부에 시공할 수 있습니다. 비용이 저렴하여 게릴라
            홍보용 현수막에 주로 사용됩니다. ★90cm 폭 이하에서만 주문이 가능합니다★
          </p>
          <div className="price">
            <h1>총 가격</h1>
            <h2>
              {watch('price')
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              원
            </h2>
          </div>
        </div>

        <div className="purchaseBox">
          <button className="basic_button">주문하기</button>
        </div>
      </Side_datail_container>
    );
  }
};
