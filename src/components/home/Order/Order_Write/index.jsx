'use client';
import React, { useEffect, useState } from 'react';
import 'react-awesome-button/dist/styles.css';
import './styles.jsx';
import { FormProvider, useForm } from 'react-hook-form';
import { Order_Write_container } from './styles.jsx';

import { useRouter } from 'next/navigation.js';

import { useUser } from 'hooks/supabase/auth/useUser.js';
import { useOrder } from 'hooks/supabase/order/useOrder.js';
import { Side_detail } from 'components/home/Order/Side_detail/index.jsx';
import { useOrderItemPreview } from 'hooks/supabase/order/orderItemPreview/useOrderItemPreview.js';
import { Item_selectImg } from '../Order_writer_Item/Item_selectImg/index.jsx';
import { Item_privacy } from '../Order_writer_Item/Item_privacy/index.jsx';
import { Item_size } from '../Order_writer_Item/Item_size/index.jsx';
import { Item_address } from '../Order_writer_Item/Item_address/index.jsx';
import { Item_content } from '../Order_writer_Item/Item_content/index.jsx';
import { Item_upload } from '../Order_writer_Item/Item_upload/index.jsx';
import { Item_buttonNav } from '../Order_writer_Item/Item_buttonNav/index.jsx';

const Order_Write = ({ detail_data, order_setting, bannerType }) => {
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
  const { mutate: createOrder } = useCreateOrder(user?.email);

  // form 데이터 관리
  const methods = useForm();
  const { handleSubmit, setValue } = methods;

  // 로그인 로그아웃 상태
  useEffect(() => {
    if (user) {
      setValue('writer_user_email', user.email);
      setValue('name', user.name);
      setValue('address_1', user.address_1);
      setValue('address_2', user.address_2);
      setValue('address_3', user.address_3);
    }
    // 기본 값
    if (detail_data && order_setting) {
      order_setting_for.map((item) => {
        setValue(item, {
          title: order_setting[item]?.title,
          content: order_setting[item]?.list[0],
        });
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
    setValue('template_type', bannerType);
    setValue('category_type', detail_data?.category);
    setValue('state', '확인전');
    setValue('price', 20000);
  }, [user]);

  const router = useRouter();
  const onSubmit = (data) => {
    createOrder(data);
    router.push(`/home/mypage/my_modify`);
  };
  if (userLoading || prevLoading) {
    return <h1>Loading</h1>;
  }
  return (
    <Order_Write_container>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form_box">
            <div className="productImgBox">
              <Item_selectImg bannerType={bannerType} detail_data={detail_data} />
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

                <Item_size title="크기" row="row" col="col" count="count" />
                <Item_address
                  title="수령주소"
                  address_1="address_1"
                  address_2="address_2"
                  address_3="address_3"
                />
                <Item_content title="내용" valueName="contents" />
                <Item_upload title="이미지파일" valueName="file" />
              </div>
            </div>
          </div>
          <Side_detail />
        </form>
      </FormProvider>
    </Order_Write_container>
  );
};
export default Order_Write;