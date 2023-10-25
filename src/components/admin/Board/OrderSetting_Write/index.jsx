'use client';
import { useMainTemplatesCard } from 'hooks/supabase/main/templatesCard/useTemplatesCard';
import { EmptyCard } from './EmptyCard';
import { OrderSetting_Write_container } from './styles';
import { Main_TemplatesCardList } from 'components/home/Main/Main_TemplatesCardList';
import { useTemplatesTag } from 'hooks/supabase/templatesTag/useTemplatesTag';
import { MainLoading } from 'components/Loading/MainLoading';
import { useOrderSetting } from 'hooks/supabase/order/orderSetting/useOrderSetting';

export const OrderSetting_Write = () => {
  // 현재 메뉴목록
  const { useGetTemplatesTag } = useTemplatesTag();
  const { data: tagList, isLoading: tag_loading } = useGetTemplatesTag();

  // 주문세팅
  const {
    useGetOrderSetting,
    useCreateOrderSetting,
    useUpdateOrderSetting,
    useDeleteOrderSetting,
  } = useOrderSetting();
  const { data: orderSettingData, isLoading: orderSetting_loading } = useGetOrderSetting();
  const { mutate: createData } = useCreateOrderSetting();
  const { mutate: updataData } = useUpdateOrderSetting();
  const { mutate: deleteData } = useDeleteOrderSetting();
  if (tag_loading || orderSetting_loading) {
    return <MainLoading />;
  }
  return (
    <OrderSetting_Write_container>
      <h2 className="main_title">기본적인 셋팅 안에 들어가는 내용입니다</h2>
      {tagList.map((item) => {
        let useOrderSetting = orderSettingData.filter(
          (data) => data.category_name === item.title
        )[0];
        let isOrderSetting = typeof useOrderSetting === 'object';
        if (isOrderSetting) {
          return (
            <EmptyCard
              key={item.id}
              title={item.title}
              isOrderSetting={isOrderSetting}
              order_setting={useOrderSetting}
              createData={createData}
              updataData={updataData}
              deleteData={deleteData}
            />
          );
        } else {
          return (
            <EmptyCard
              key={item.id}
              title={item.title}
              isOrderSetting={isOrderSetting}
              order_setting={useOrderSetting}
              createData={createData}
              updataData={updataData}
              deleteData={deleteData}
            />
          );
        }
      })}
    </OrderSetting_Write_container>
  );
};
