import React from 'react';
import { SianBoardDetail_container } from './style';
import { DiBrackets } from 'react-icons/di';
import { Order_Detail } from 'components/home/Order/Order_Detail';
import { Payments } from 'components/common/Payment';
export const SianBoardDetail = ({ data }) => {
  return (
    <SianBoardDetail_container>
      <Order_Detail data={data} />
      <section>
        <div className="title_box">
          <div className="title">
            <DiBrackets className="icon" />
            <h1>결제하기</h1>
          </div>
          <div className="payment_box">
            <Payments />
          </div>
        </div>
      </section>
    </SianBoardDetail_container>
  );
};
