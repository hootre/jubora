'use client';

import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import useTemplatesTag from 'hooks/supabase/templatesTag/useTemplatesTag';
import ReadTemplatesTag from 'components/admin/Read/ReadTemplatesTag';
import toast from 'react-hot-toast';
import ItemText from 'components/home/Order/OrderWriterItem/ItemText';
import ItemSelect from 'components/home/Order/OrderWriterItem/ItemSelect';
import ItemCategory from 'components/home/Order/OrderWriterItem/ItemCategory';
import TemplatesTagWriteContainer from './styles';

export default function TemplatesTagWrite() {
  // 제품 목록 생성
  const { useCreateTemplatesTag } = useTemplatesTag();
  const { mutate: handleCreateTemplatesTag } = useCreateTemplatesTag();
  // form 데이터 관리
  const methods = useForm();
  const { handleSubmit, reset } = methods;
  const [isUploading, setIsUploading] = useState(false);

  const onSubmit = (data) => {
    if (!data.title) {
      toast.error('제목은 필수입니다.');
    } else if (!data.tagList) {
      toast.error('태그는 필수입니다.');
    } else {
      setIsUploading(true);
      handleCreateTemplatesTag(data, {
        onSettled: () => {
          reset();
          setIsUploading(false);
        },
      });
    }
  };
  return (
    <TemplatesTagWriteContainer>
      <FormProvider {...methods}>
        <main>
          <ItemText title="제목" valueName="title" />
          <ItemSelect title="해당 목록" valueName="fromNav" list={['banner', 'print', 'real']} />
          <ItemCategory title="태그" valueName="tagList" />
          <div className="C_basic_flex submit_btn">
            <button
              type="button"
              className="C_basic_button"
              disabled={isUploading}
              onClick={handleSubmit(onSubmit)}
            >
              {isUploading ? '업로드중...' : '제품 등록하기'}
            </button>
          </div>
        </main>
      </FormProvider>
      <ReadTemplatesTag />
    </TemplatesTagWriteContainer>
  );
}
