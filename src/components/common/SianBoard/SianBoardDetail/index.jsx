import React from 'react';
import { SianBoardDetail_container } from './style';
import { DiBrackets } from 'react-icons/di';
import { Payments } from 'utils/Payment';
import { Order_Detail } from 'components/home/Order/Order_detail';
export const SianBoardDetail = ({ data, userData }) => {
  return (
    <SianBoardDetail_container>
      <Order_Detail data={data} userData={userData} />
      <section>
        <div className="title_box">
          <div className="title">
            <DiBrackets className="icon" />
            <h1>결제하기</h1>
          </div>
          <div className="payment_box">
            <Payments order_data={data} />
          </div>
        </div>
      </section>
    </SianBoardDetail_container>
  );
};
