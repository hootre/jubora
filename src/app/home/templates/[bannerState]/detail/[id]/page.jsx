import React from 'react';
import serverTemplates from 'hooks/supabase/templates/serverTemplates';
import serverOrderSetting from 'hooks/supabase/order/orderSetting/serverOrderSetting';
import OrderWrite from 'components/home/Order/OrderWrite';

const page = async ({ params: { id }, searchParams: { bannerType, categoryName } }) => {
  // 제품 이미지 가져오기
  const { serverGetOnlyTemplates } = serverTemplates();
  const detailData = await serverGetOnlyTemplates(id);
  // 초기 주문 항목 리스트
  const { serverGetTypeOrderSetting } = serverOrderSetting();
  const orderSetting = await serverGetTypeOrderSetting(categoryName);
  // user 상태
  return (
    <OrderWrite
      detailData={detailData}
      orderSetting={orderSetting}
      bannerType={bannerType}
      categoryName={categoryName}
    />
  );
};
export default page;
