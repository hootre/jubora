import SianUpdateList from 'components/common/SianBoard/SianUpdateList';
import { DiBrackets } from 'react-icons/di';
import { FormProvider, useForm } from 'react-hook-form';
import useOrder from 'hooks/supabase/order/useOrder';
import { useState } from 'react';
import OrderDetailContainer from './style';
import OrderUpdate from '../OrderUpdate';
import OrderDataTable from './OrderDataTable';

export default function OrderDetail({ data, userData }) {
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
  const { handleSubmit } = methods;
  const onSubmit = (formData) => {
    updateOrder(formData);
    toggleSianUpdate();
  };
  return (
    <OrderDetailContainer>
      <section className="order_data">
        <div className="title_box">
          <div className="title">
            <DiBrackets className="icon" />
            <h1>시안확인</h1>
          </div>
          <div className="btn_box">
            {sianUpdate ? (
              <>
                <button type="button" className="update_order" onClick={handleSubmit(onSubmit)}>
                  수정완료
                </button>
                <button type="button" className="modify_btn" onClick={toggleSianUpdate}>
                  수정취소
                </button>
              </>
            ) : (
              <button type="button" className="modify_btn" onClick={toggleSianUpdate}>
                수정하기
              </button>
            )}
          </div>
        </div>

        <FormProvider {...methods}>
          {sianUpdate ? (
            <OrderUpdate data={data} role={userData.role} />
          ) : (
            <OrderDataTable data={data} />
          )}
        </FormProvider>
      </section>
      <section className="sian_data">
        <SianUpdateList orderId={data.id} role={userData.role} state={data.state} />
        {userData.role !== 'admin' && (
          <div className="submit_box">
            <button type="button" className="modify_byn C_basic_button" onClick={updateOrderState}>
              출력승인
            </button>
          </div>
        )}
      </section>
    </OrderDetailContainer>
  );
}
