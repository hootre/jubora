'use client';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Item_upload } from 'components/home/Order/Order_writer_Item/Item_upload';

import { useTemplates } from 'hooks/supabase/templates/useTemplates';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTemplatesTag } from 'hooks/supabase/templatesTag/useTemplatesTag';
import { AiOutlineClose } from 'react-icons/ai';
import { Item_select } from 'components/home/Order/Order_writer_Item/Item_select';
import { MainLoading } from 'components/Loading/MainLoading';
export const Templates_Print = ({ bannerState }) => {
  // 제품 목록 생성
  const { useCreateTemplate } = useTemplates();
  const { mutate: handleCreateBanner } = useCreateTemplate();

  // form 데이터 관리
  const methods = useForm();
  const { handleSubmit, watch, setValue, reset } = methods;
  const [isUploading, setIsUploading] = useState(false);

  // 태그 관리
  const { useGetTemplatesTag } = useTemplatesTag();
  const { data: templatesTagData, isLoading: tag_loading } = useGetTemplatesTag();
  // 태그 생성
  const toggleCategory = (data) => {
    const DuplicateCheck = watch('category').filter((item) => item === data).length > 0;
    if (DuplicateCheck) {
      setValue(
        'category',
        watch('category').filter((item) => item != data)
      );
      return;
    }
    const uniqueData = [...watch('category'), data];
    setValue('category', uniqueData);
  };

  useEffect(() => {
    setValue('bannerState', bannerState);
    setValue('category', []);
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
  if (tag_loading) {
    return <MainLoading />;
  }
  const bannerTypeList = templatesTagData.map((item) => {
    item.title;
  });
  return (
    <>
      <FormProvider {...methods}>
        <main>
          <Item_select title="제품 항목" valueName="bannerType" list={[bannerTypeList]} />
          <Item_upload title="이미지" valueName="img_row" />
          <div className="option_container">
            <h2>태그목록</h2>
            <div className="tag_content">
              <Accordion className="accordion">
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>태그</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <ul>
                    {templatesTagData.map((item) => (
                      <li className="tag_box">
                        <h2>{item.title}</h2>
                        {Array.isArray(item.tagList.list) &&
                          item.tagList.list?.map((item) => (
                            <div
                              key={item}
                              className={
                                watch('category')?.filter((data) => data === item).length > 0
                                  ? 'tag_btn active'
                                  : 'tag_btn'
                              }
                              onClick={() => toggleCategory(item)}
                            >
                              {item}
                            </div>
                          ))}
                      </li>
                    ))}
                  </ul>
                </AccordionDetails>
              </Accordion>
              <div className="tag_box">
                {watch('category')?.map((item) => (
                  <div className="tag_btn active">
                    {item}
                    <AiOutlineClose className="icon" onClick={() => toggleCategory(item)} />
                  </div>
                ))}
              </div>
            </div>
          </div>
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
    </>
  );
};
