'use client';

import useTemplatesTag from 'hooks/supabase/templatesTag/useTemplatesTag';
import MainLoading from 'components/Loading/MainLoading';
import useOrderSetting from 'hooks/supabase/order/orderSetting/useOrderSetting';
import OrderSettingWriteContainer from './styles';
import EmptyCard from './EmptyCard';

export default function OrderSettingWrite() {
  // 현재 메뉴목록
  const { useGetTemplatesTag } = useTemplatesTag();
  const { data: tagList, isLoading: tagLoading } = useGetTemplatesTag();

  // 주문세팅
  const { useGetOrderSetting, useUpdateOrderSetting } = useOrderSetting();
  const { data: orderSettingData, isLoading: orderSettingLoading } = useGetOrderSetting();
  const { mutate: updataData } = useUpdateOrderSetting();
  if (tagLoading || orderSettingLoading) {
    return <MainLoading />;
  }
  return (
    <OrderSettingWriteContainer>
      <h2 className="main_title">기본적인 셋팅 안에 들어가는 내용입니다</h2>
      <h2 className="main_title">항목 삭제같은 경우 제품 필터목록에서 삭제가능합니다</h2>
      {tagList.map((item) => {
        const OrderSetting = orderSettingData.filter(
          (data) => data.categoryName.trim() === item.title.trim()
        )[0];
        const isOrderSetting = OrderSetting.item1 !== null;
        return (
          <EmptyCard
            key={item.id}
            title={item.title}
            isOrderSetting={isOrderSetting}
            orderSetting={OrderSetting}
            updataData={updataData}
          />
        );
      })}
    </OrderSettingWriteContainer>
  );
}
