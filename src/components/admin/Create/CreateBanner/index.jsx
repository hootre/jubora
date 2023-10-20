'use client';
import React, { memo, useState } from 'react';
import { Create_container } from './styles';
import { useProductsCategory, useProductsTag } from 'hooks/supabase/public/useProductsCategory';
import { useTemplates } from 'hooks/supabase/templates/useTemplates';
import { useOrderSetting } from 'hooks/supabase/order/orderSetting/useOrderSetting';
import { FormProvider, useForm } from 'react-hook-form';
import { Item_select } from 'components/home/Order/Order_writer_Item/Item_select';
import { Item_upload } from 'components/home/Order/Order_writer_Item/Item_upload';
import { Item_text } from 'components/home/Order/Order_writer_Item/Item_text';
import { Item_selectTwo } from 'components/home/Order/Order_writer_Item/Item_selectTwo';

const CreateBanner = () => {
  // 제품 카테고리 목록
  const { useGetProductsTag } = useProductsTag();
  const { data: categoryList, isLoading: prodctsTag_loading } = useGetProductsTag();

  // 제품 목록 생성
  const { useCreateTemplate } = useTemplates();
  const { mutate: handleCreateBanner } = useCreateTemplate();

  // from_btn 목록
  const { useGetWantOrderSetting } = useOrderSetting();
  const { data: fromBtnList, isLoading: from_btn_loading } = useGetWantOrderSetting([
    'id',
    'category_name',
  ]);

  // form 데이터 관리
  const methods = useForm();
  const { handleSubmit, setValue, watch } = methods;
  // form data
  const [formData, setFormData] = useState({});
  const [isUploading, setIsUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'img_row' || name === 'img_col' || name === 'img_square') {
      setFormData((formData) => ({ ...formData, [name]: files[0] }));
      return;
    }
    setFormData((formData) => ({ ...formData, [name]: value }));
  };
  const deleteData = (name) => {
    setFormData((formData) => ({ ...formData, [name]: '' }));
  };
  const onSubmit = (data) => {
    setIsUploading(true);
    handleCreateBanner(formData, {
      onSuccess: () => {
        setFormData({});
        setIsUploading(false);
      },
    });
  };
  if (prodctsTag_loading || from_btn_loading) {
    return <h1>Loading</h1>;
  }
  return (
    <Create_container className="">
      <FormProvider {...methods}>
        <form className="" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="title">현수막 제품 등록</h2>

          <Item_select title="카테고리" valueName="category" list={['현수막', '인쇄물', '실사']} />
          <Item_upload title="가로형(기본)" valueName="img_row" />
          <Item_upload title="세로형" valueName="img_col" />
          <Item_upload title="포스터형" valueName="img_square" />
          <Item_text title="제목" valueName="title" />

          <div className="option_container file_box">
            <h2>분류 기준</h2>
            <div>
              <input
                className="C_basic_input"
                type="text"
                name="title"
                value={formData.filterList ?? ''}
                placeholder="포함 태그를 입력하세요"
                required
                onChange={handleChange}
              />
            </div>
          </div>
          <Item_selectTwo
            title="태그"
            valueName_1="tag"
            valueName_2="tag_detail"
            list_1={categoryList}
            list_2={
              categoryList.filter(
                (item) => item.title === (watch('tag') ?? categoryList[0].title)
              )[0].category_list.list
            }
          />

          <div className="C_basic_flex">
            <button className="C_basic_button" disabled={isUploading}>
              {isUploading ? '업로드중...' : '제품 등록하기'}
            </button>
          </div>
        </form>
      </FormProvider>
    </Create_container>
  );
};

export default memo(CreateBanner);
