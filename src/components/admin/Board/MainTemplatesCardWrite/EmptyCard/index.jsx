'use client';

import React, { useEffect, useState } from 'react';

import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useForm } from 'react-hook-form';
import getByteSize from 'utils/getByteSize';
import toast from 'react-hot-toast';
import EmptyCardContainer from './style';

export default function EmptyCard({ item, index, updataData }) {
  // form 데이터 관리
  const methods = useForm();
  const [isUploading, setIsUploading] = useState(false);
  const {
    setValue,
    getValues,
    watch,
    handleSubmit,
    register,
    formState: { isValid },
  } = methods;
  // 기본 값 할당

  const [imagePreview, setImagePreview] = useState('');
  const image = watch('image');
  useEffect(() => {
    setValue('id', item.id);
    if (item.image) {
      setValue('image', item.image);
      setValue('title', item.title);
      setValue('subtitle', item.subtitle);
      setValue('description', item.description);
      setValue('prevPublicId', item.publicId);
    }
  }, [item]);
  useEffect(() => {
    if (typeof image !== 'string' && image?.length > 0) {
      if (watch('image')?.[0].size > 10485760) {
        setValue('image', '');
        toast.error('이미지 사이즈가 10mb보다 큽니다');
      } else {
        const file = image[0];
        setImagePreview(URL.createObjectURL(file));
      }
    }
  }, [image]);

  const deleteData = (name) => {
    setValue(name, '');
    setImagePreview(item.image ? item.image : '');
  };
  const onSubmit = async (data) => {
    setIsUploading(true);
    updataData(data, {
      onSettled: () => {
        setIsUploading(false);
      },
    });
  };
  return (
    <EmptyCardContainer>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>{`${index}번 이미지`}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="accordion_content">
            <form className="" onSubmit={handleSubmit(onSubmit)}>
              <div className="optionContainer file_box">
                <h2>메인 이미지</h2>
                <div>
                  <div className="input_box">
                    <label htmlFor={`image_${index}`} className="from_item_btn">
                      첨부파일 등록
                    </label>
                    <span className="confirm_text">최대 이미지 크기는 10mb입니다</span>
                  </div>
                  <input
                    id={`image_${index}`}
                    className="file_input"
                    type="file"
                    accept="image/*"
                    name="image"
                    {...register('image', {
                      required: '이미지는 필수입니다.',
                    })}
                  />
                  {getValues('image')?.[0]?.name && (
                    <div className="file_text">
                      <span className="file_name">{getValues('image')?.[0].name}</span>
                      <span className="file_size">{getByteSize(getValues('image')?.[0].size)}</span>
                      <button
                        type="button"
                        className="delete_btn"
                        onClick={() => deleteData('image')}
                      >
                        삭제
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="optionContainer ">
                <h2>제목</h2>
                <div className="item">
                  <input
                    className="C_basic_input"
                    type="text"
                    name="title1"
                    placeholder="첫번째줄"
                    {...register('title')}
                  />
                </div>
              </div>
              <div className="optionContainer ">
                <h2>소제목</h2>
                <div className="item">
                  <input
                    className="C_basic_input"
                    type="text"
                    name="content1"
                    placeholder="첫번째줄"
                    {...register('subtitle')}
                  />
                </div>
              </div>
              <div className="optionContainer ">
                <h2>내용</h2>
                <div className="item">
                  <input
                    className="C_basic_input"
                    type="text"
                    name="subtitle"
                    placeholder="내용"
                    required
                    {...register('description')}
                  />
                </div>
              </div>
              <div className="C_basic_flex">
                <button
                  type="submit"
                  className={
                    isUploading || !isValid ? `C_basic_button uploading` : `C_basic_button `
                  }
                  disabled={isUploading}
                >
                  {isUploading ? '업로드중...' : '등록하기'}
                </button>
              </div>
            </form>
            {item.image ? (
              <div className="preView">
                {imagePreview ? (
                  <img src={imagePreview} alt="preview" />
                ) : (
                  <img src={item.image} alt="mainImage" />
                )}
                <div className="title_box">
                  <h1>{watch('title') ? watch('title') : item.title}</h1>
                  <span>{watch('subtitle') ? watch('subtitle') : item.subtitle}</span>
                </div>
                <div className="description">
                  {watch('description') ? watch('description') : item.description}
                </div>
              </div>
            ) : (
              <div className="preView">
                {imagePreview ? (
                  <img src={imagePreview} alt="preview" />
                ) : (
                  <img src="https://placehold.co/500x200" alt="placehold" />
                )}
                <div className="title_box">
                  <h1>{watch('title') ? watch('title') : '기본 텍스트'}</h1>
                  <span>
                    {watch('subtitle') ? watch('subtitle') : '1장부터 9,900원! 수량별 추가할인~'}
                  </span>
                </div>
                <div className="description">
                  {watch('description')
                    ? watch('description')
                    : '실내,실외 어디서든 선명하게 홍보해 보세요'}
                </div>
              </div>
            )}
          </div>
        </AccordionDetails>
      </Accordion>
    </EmptyCardContainer>
  );
}
