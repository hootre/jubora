import { SianUpdateList } from 'components/common/SianBoard/SianUpdateList';
import { DiBrackets } from 'react-icons/di';
import { Order_Detail_container } from './style';
import { useUser } from 'hooks/supabase/auth/useUser';
import { useState } from 'react';
import { DataTable } from './DataTable';
import { Order_Update } from '../Order_Update';
import { FormProvider, useForm } from 'react-hook-form';
import { useOrder } from 'hooks/supabase/order/useOrder';
export const Order_Detail = ({ data }) => {
  // 현재 user 등급
  const { useGetUserInfo } = useUser();
  const { data: userData, isLoading: userLoading } = useGetUserInfo();
  // order 수정하기
  const { useUpdateOrder } = useOrder();
  const { mutate: UpdateOrder } = useUpdateOrder(data.id);
  // 수정하기 State
  const [sianUpdate, setSianUpdate] = useState();
  const toggleSianUpdate = () => {
    setSianUpdate((prev) => !prev);
  };

  // form 데이터 관리
  const methods = useForm();
  const { handleSubmit } = methods;
  const onSubmit = (data) => {
    UpdateOrder(data);
    toggleSianUpdate();
  };
  if (userLoading) {
    return;
  }
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
                주문수정하기
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
        <SianUpdateList order_id={data.id} role={userData.role} />
        {userData.role === 'admin' ? (
          <></>
        ) : (
          <div className="submit_box">
            <button className="modify_byn">출력승인</button>
          </div>
        )}
      </section>
    </Order_Detail_container>
  );
};
