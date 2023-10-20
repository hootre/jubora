'use client';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Item_upload } from 'components/home/Order/Order_writer_Item/Item_upload';
import { Item_text } from 'components/home/Order/Order_writer_Item/Item_text';
import { Item_selectTwo } from 'components/home/Order/Order_writer_Item/Item_selectTwo';
import { useProductsTag } from 'hooks/supabase/public/useProductsCategory';
import { Templates_Print_container } from './styles';
import { Item_category } from 'components/home/Order/Order_writer_Item/Item_category';
import { useTemplates } from 'hooks/supabase/templates/useTemplates';

export const Templates_Print = ({ bannerState }) => {
  // 제품 목록 생성
  const { useCreateTemplate } = useTemplates();
  const { mutate: handleCreateBanner } = useCreateTemplate();
  // form 데이터 관리
  const methods = useForm();
  const { handleSubmit, watch, setValue, reset } = methods;
  const [isUploading, setIsUploading] = useState(false);

  // 제품 카테고리 목록
  const { useGetProductsTag } = useProductsTag();
  const { data: categoryList, isLoading: prodctsTag_loading } = useGetProductsTag();

  useEffect(() => {
    setValue('bannerState', bannerState);
  }, [bannerState]);
  const onSubmit = (data) => {
    setIsUploading(true);
    handleCreateBanner(data, {
      onSettled: () => {
        reset();
        setIsUploading(false);
      },
    });
  };
  if (prodctsTag_loading) {
    return;
  }
  return (
    <Templates_Print_container>
      <FormProvider {...methods}>
        <main>
          <Item_upload title="이미지" valueName="img_row" />
          <Item_category title={'분류 기준'} valueName={'category'} />
          <Item_selectTwo
            title="태그"
            valueName_1="tag"
            valueName_2="tag_detail"
            list_1={categoryList}
            list_2={
              categoryList.filter(
                (item) => item.title === (watch('tag') ?? categoryList[0].title)
              )[0]?.category_list.list
            }
          />
          <div className="C_basic_flex submit_btn">
            <button
              className="C_basic_button"
              disabled={isUploading}
              onClick={handleSubmit(onSubmit)}
            >
              {isUploading ? '업로드중...' : '제품 등록하기'}
            </button>
          </div>
        </main>
      </FormProvider>
    </Templates_Print_container>
  );
};
