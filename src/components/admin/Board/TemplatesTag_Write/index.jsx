'use client';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { useProductsTag } from 'hooks/supabase/public/useProductsCategory';
import { TemplatesTag_Write_container } from './styles';
import { Item_category } from 'components/home/Order/Order_writer_Item/Item_category';
import { Item_text } from 'components/home/Order/Order_writer_Item/Item_text';
import { useTemplatesTag } from 'hooks/supabase/templatesTag/useTemplatesTag';
import { Read_TemplatesTag } from 'components/admin/Read/Read_TemplatesTag';

export const TemplatesTag_Write = () => {
  // 제품 목록 생성
  const { useCreateTemplatesTag } = useTemplatesTag();
  const { mutate: handleCreateTemplatesTag } = useCreateTemplatesTag();
  // form 데이터 관리
  const methods = useForm();
  const { handleSubmit, reset } = methods;
  const [isUploading, setIsUploading] = useState(false);

  const onSubmit = (data) => {
    setIsUploading(true);
    handleCreateTemplatesTag(data, {
      onSettled: () => {
        reset();
        setIsUploading(false);
      },
    });
  };
  return (
    <TemplatesTag_Write_container>
      <FormProvider {...methods}>
        <main>
          <Item_text title={'제목'} valueName={'title'} />
          <Item_category title={'태그'} valueName={'tagList'} />
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
      <Read_TemplatesTag />
    </TemplatesTag_Write_container>
  );
};