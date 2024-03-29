'use client';

import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import useTemplates from 'hooks/supabase/templates/useTemplates';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import useTemplatesTag from 'hooks/supabase/templatesTag/useTemplatesTag';
import { AiOutlineClose } from 'react-icons/ai';
import MainLoading from 'components/Loading/MainLoading';
import ItemSelect from 'components/home/Order/OrderWriterItem/ItemSelect';
import ItemUpload from 'components/home/Order/OrderWriterItem/ItemUpload';

export default function TemplatesPrint({ bannerState }) {
  let tagList = [];
  // 제품 목록 생성
  const { useCreateTemplate } = useTemplates();
  const { mutate: handleCreateBanner } = useCreateTemplate();

  // form 데이터 관리
  const methods = useForm();
  const { handleSubmit, watch, setValue, reset } = methods;
  const [isUploading, setIsUploading] = useState(false);

  // 태그 관리
  const { useGetTemplatesTag } = useTemplatesTag();
  const { data: templatesTagData, isLoading: tagLoading } = useGetTemplatesTag();
  // 태그 생성
  const toggleCategory = (data) => {
    const DuplicateCheck = watch('category').filter((item) => item === data).length > 0;
    if (DuplicateCheck) {
      setValue(
        'category',
        watch('category').filter((item) => item !== data)
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
  if (tagLoading) {
    return <MainLoading />;
  }
  tagList = templatesTagData.map((item) => item.title);
  return (
    <FormProvider {...methods}>
      <main>
        <ItemSelect title="제품 항목" valueName="categoryName" list={tagList} />
        <ItemUpload title="이미지" valueName="imgRow" />
        <div className="optionContainer">
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
                    <li key={item.id} className="tag_box">
                      <h2>{item.title}</h2>
                      {Array.isArray(item.tagList.list) &&
                        item.tagList.list?.map((item2) => (
                          <button
                            type="button"
                            key={item2}
                            className={
                              watch('category')?.filter((data) => data === item2).length > 0
                                ? 'tag_btn active'
                                : 'tag_btn'
                            }
                            onClick={() => toggleCategory(item2)}
                          >
                            {item2}
                          </button>
                        ))}
                    </li>
                  ))}
                </ul>
              </AccordionDetails>
            </Accordion>
            <div className="tag_box">
              {watch('category')?.map((item) => (
                <div key={item} className="tag_btn active">
                  {item}
                  <AiOutlineClose className="icon" onClick={() => toggleCategory(item)} />
                </div>
              ))}
            </div>
          </div>
        </div>
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
  );
}
