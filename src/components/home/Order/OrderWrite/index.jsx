'use client';

import { orderSettingFor } from 'assets/data';
import MainLoading from 'components/Loading/MainLoading';
import useOrder from 'hooks/supabase/order/useOrder';
import useTemplates from 'hooks/supabase/templates/useTemplates';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import 'react-awesome-button/dist/styles.css';
import { FormProvider, useForm } from 'react-hook-form';
import { useTemplatesActions } from 'store';
import User from 'hooks/supabase/auth/useUser';
import OrderWriteContainer from './styles';
import ItemSelectImg from '../OrderWriterItem/ItemSelectImg';
import ItemPrivacy from '../OrderWriterItem/ItemPrivacy';
import ItemButtonNav from '../OrderWriterItem/ItemButtonNav';
import ItemSize from '../OrderWriterItem/ItemSize';
import ItemAddress from '../OrderWriterItem/ItemAddress';
import ItemContent from '../OrderWriterItem/ItemContent';
import ItemUpload from '../OrderWriterItem/ItemUpload';
import SideDetail from '../SideDetail';

function OrderWrite({ detailData, orderSetting, bannerType, categoryName }) {
  // 제품 조회수 증가
  const { useUpdateView } = useTemplates();
  const { mutate: updateViews } = useUpdateView(detailData.views, detailData.id);
  // user상태관리
  const { useGetUserInfo } = User();
  const { data: user, isLoading: userLoading } = useGetUserInfo();

  // Order 생성 함수
  const { useCreateOrder } = useOrder();
  const { mutate: createOrder } = useCreateOrder(user?.email);

  // zsutand
  const { setOrderPreview } = useTemplatesActions();

  // form 데이터 관리
  const methods = useForm();
  const { handleSubmit, setValue } = methods;
  // 첫 로딩 시
  useEffect(() => {
    setOrderPreview(orderSetting.item1.preview[0]);
    updateViews();
  }, []);
  // 로그인 로그아웃 상태
  useEffect(() => {
    if (user) {
      setValue('writerUserEmail', user.email);
      setValue('name', user.name);
      setValue('address1', user.address1);
      setValue('address2', user.address2);
      setValue('address3', user.address3);
      setValue('zonecode', user.zonecode);
    }
    // 기본 값
    if (detailData && orderSetting) {
      orderSettingFor.map((item, idx) =>
        setValue(item, {
          title: orderSetting[item]?.title,
          content: orderSetting[item]?.list[0],
          add_price: orderSetting[item].preview[idx]?.add_price,
        })
      );
      setValue('title', detailData?.title);
      setValue('products_id', detailData?.id);
      setValue(
        'image',
        bannerType === 'banner_row'
          ? detailData.imgRow
          : bannerType === 'banner_col'
          ? detailData.imgCol
          : detailData.imgSquare
      );
    }
    setValue('templateType', categoryName);
    setValue('categoryType', detailData?.category);
    setValue('state', '확인전');
    setValue('product_price', 20000);
    setValue('price', 20000);
  }, [user]);

  const router = useRouter();
  const onSubmit = (data) => {
    createOrder(data);
    router.push(`/home/mypage/my_modify`);
  };

  if (userLoading) {
    return <MainLoading />;
  }
  return (
    <OrderWriteContainer>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form_box">
            <div className="productImgBox">
              <ItemSelectImg bannerType={bannerType} detailData={detailData} />
            </div>
            <div className="productContent">
              <div className="contentBox">
                <div className="noUser_box">
                  <ItemPrivacy user={user} />
                </div>
                <div className="active_btn_box">
                  {orderSettingFor.map(
                    (item) =>
                      orderSetting[item].title.length > 0 && (
                        <ItemButtonNav key={item} itemName={item} orderSetting={orderSetting} />
                      )
                  )}
                </div>

                <ItemSize title="크기" row="row" col="col" count="count" />
                <ItemAddress
                  title="수령주소"
                  address1="address1"
                  address2="address2"
                  address3="address3"
                />
                <ItemContent title="내용" valueName="contents" />
                <ItemUpload title="이미지파일" valueName="file" />
              </div>
            </div>
          </div>
          <SideDetail />
        </form>
      </FormProvider>
    </OrderWriteContainer>
  );
}
export default OrderWrite;
