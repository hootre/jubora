'use client';
import React, { useEffect, useState } from 'react';
import 'react-awesome-button/dist/styles.css';
import './styles.jsx';
import { FormProvider, useForm } from 'react-hook-form';
import { Order_detail_container } from './styles.jsx';

import { useRouter } from 'next/navigation.js';

import { useUser } from 'hooks/supabase/auth/useUser.js';
import { useOrder } from 'hooks/supabase/order/useOrder.js';

import { Item_seleteImg } from 'components/Order/Item_seleteImg/index.jsx';
import { Item_privacy } from 'components/Order/Item_privacy/index.jsx';
import { Item_buttonNav } from 'components/Order/Item_buttonNav/index.jsx';
import { Item_size } from 'components/Order/Item_size/index.jsx';
import { Item_address } from 'components/Order/Item_address/index.jsx';
import { Item_content } from 'components/Order/Item_content/index.jsx';
import { Item_upload } from 'components/Order/Item_upload/index.jsx';
import { Side_detail } from 'components/Order/Side_detail/index.jsx';
import { useOrderItemPreview } from 'hooks/supabase/order/orderItemPreview/useOrderItemPreview.js';

const Order_detail = ({ detail_data, order_setting, bannerType }) => {
  // order from 셋팅
  const order_setting_for = ['item_1', 'item_2', 'item_3', 'item_4', 'item_5', 'item_6', 'item_7'];

  // user상태관리
  const { useGetUserInfo } = useUser();
  const { data: user, isLoading: userLoading } = useGetUserInfo();

  // 제품 preview 이미지
  const { useGetOrderItemPreview } = useOrderItemPreview();
  const { data: prevData, isLoading: prevLoading } = useGetOrderItemPreview();

  // Order 생성 함수
  const { useCreateOrder } = useOrder();
  const { mutate: createOrder } = useCreateOrder();

  // form 데이터 관리
  const methods = useForm();
  const { handleSubmit, setValue } = methods;

  // 로그인 로그아웃 상태
  useEffect(() => {
    if (user) {
      setValue('writer_user_email', user.email);
      setValue('name', user.name);
    }
    // 기본 값
    if (detail_data && order_setting) {
      order_setting_for.map((item) => {
        setValue(item, order_setting[item]?.list[0]);
      });
      setValue('title', detail_data?.title);
      setValue('products_id', detail_data?.id);
      setValue(
        'image',
        bannerType === 'banner_row'
          ? detail_data.img_row
          : bannerType === 'banner_col'
          ? detail_data.img_col
          : detail_data.img_square
      );
    }
    setValue('state', '확인전');
    setValue('price', 20000);
  }, [user]);

  const router = useRouter();
  const onSubmit = (data) => {
    console.log(data);
    createOrder(data);
    // router.push('/order');
  };
  if (userLoading || prevLoading) {
    return <h1>Loading</h1>;
  }
  console.log(detail_data);
  return (
    <Order_detail_container>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form_box">
            <div className="productImgBox">
              <Item_seleteImg bannerType={bannerType} detail_data={detail_data} />
            </div>
            <div className="productContent">
              <div className="contentBox">
                <div className="noUser_box">
                  <Item_privacy user={user} />
                </div>
                <div className="active_btn_box">
                  {order_setting_for.map(
                    (item, idx) =>
                      order_setting[item] !== null && (
                        <Item_buttonNav key={idx} item={item} order_setting={order_setting} />
                      )
                  )}
                </div>

                <Item_size />
                <Item_address />
                <Item_content />
                <Item_upload />
              </div>
            </div>
          </div>
          <Side_detail />
        </form>
      </FormProvider>
    </Order_detail_container>
  );
};
export default Order_detail;
