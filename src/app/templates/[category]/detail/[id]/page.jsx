import React from 'react';
import { serverTemplates } from 'hooks/supabase/templates/serverTemplates';
import { serverOrderSetting } from 'hooks/supabase/order/orderSetting/serverOrderSetting';
import Order_detail from 'components/Order/Order_detail';

const page = async ({ params: { id }, searchParams: { bannerType } }) => {
  // 제품 이미지 가져오기
  const { serverGetOnlyTemplates } = serverTemplates();
  const detail_data = await serverGetOnlyTemplates(id);

  // 초기 주문 항목 리스트
  const { serverGetTypeOrderSetting } = serverOrderSetting();
  const order_setting = await serverGetTypeOrderSetting(bannerType);

  // user 상태
  return (
    <Order_detail detail_data={detail_data} order_setting={order_setting} bannerType={bannerType} />
  );
};
export default page;
