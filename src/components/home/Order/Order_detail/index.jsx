import { SianUpdateList } from 'components/common/SianBoard/SianUpdateList';
import { DiBrackets } from 'react-icons/di';
import { Order_Detail_container } from './style';
import { useState } from 'react';
import { DataTable } from './DataTable';
import { Order_Update } from '../Order_Update';
import { FormProvider, useForm } from 'react-hook-form';
import { useOrder } from 'hooks/supabase/order/useOrder';
export const Order_Detail = ({ data, userData }) => {
  // order 수정하기
  const { useUpdateOrder, useUpdateOrderState } = useOrder();
  const { mutate: updateOrder } = useUpdateOrder(data.id);
  const { mutate: updateOrderState } = useUpdateOrderState(data.id);
  // 수정하기 State
  const [sianUpdate, setSianUpdate] = useState();
  const toggleSianUpdate = () => {
    setSianUpdate((prev) => !prev);
  };

  // form 데이터 관리
  const methods = useForm();
  const { handleSubmit, watch } = methods;
  const onSubmit = (data) => {
    console.log(data);
    updateOrder(data);
    toggleSianUpdate();
  };
  return (
    <Order_Detail_container>
      <section className="order_data">
        <div className="title_box">
          <div className="title">
            <DiBrackets className="icon" />
            <h1>시안확인</h1>
          </div>
          <div className="btn_box">
            {sianUpdate ? (
              <>
                <div className="update_order" onClick={handleSubmit(onSubmit)}>
                  수정완료
                </div>
                <div className="modify_btn" onClick={toggleSianUpdate}>
                  수정취소
                </div>
              </>
            ) : (
              <div className="modify_btn" onClick={toggleSianUpdate}>
                수정하기
              </div>
            )}
          </div>
        </div>

        <FormProvider {...methods}>
          {sianUpdate ? (
            <Order_Update data={data} role={userData.role} />
          ) : (
            <DataTable data={data} />
          )}
        </FormProvider>
      </section>
      <section className="sian_data">
        <SianUpdateList order_id={data.id} role={userData.role} state={data.state} />
        <div className="submit_box">
          <button className="modify_byn C_basic_button" onClick={updateOrderState}>
            출력승인
          </button>
        </div>
      </section>
    </Order_Detail_container>
  );
};
