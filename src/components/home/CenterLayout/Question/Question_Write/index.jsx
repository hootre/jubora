'use client';
import React from 'react';
import { Question_Write_container } from './styles';
// Toast UI Editor
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/i18n/ko-kr';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { FormControl, MenuItem, Select, TextField } from '@mui/material';
import { useEffect } from 'react';
import { deleteImage, uploadImage } from 'utils/imageUpload/uploader';
import { cloudFolderList } from 'utils/imageUpload/cloudFolderList';
import { useNotice } from 'hooks/supabase/notice/useNotice';
import Question_Read from '../Question_Read';
import { useQuestion } from 'hooks/supabase/question/useQuestion';
import Link from 'next/link';
const Question_Write = ({ name }) => {
  // notice 생성함수
  const { useCreateQuestion } = useQuestion();
  const { mutate: createQuestion } = useCreateQuestion();
  // form
  const {
    register,
    setValue,
    getValues,
    reset,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm();
  // 기본 값 할당
  useEffect(() => {
    setValue('name', name);
    setValue('images', { ids: [] });
    setValue('table', 'notice');
    return () => {
      getValues('images')?.ids?.map(async (public_id) => {
        await deleteImage(public_id);
      });
    };
  }, [reset]);
  // editor
  const editorRef = useRef(null);
  const onSubmit = async (data) => {
    createQuestion(data, {
      onSuccess: () => {
        getValues('images')?.ids?.map(async (public_id) => {
          if (!getValues('contents').includes(public_id)) {
            await deleteImage(public_id);
          }
        });
        editorRef.current.getInstance().setMarkdown('');
        reset();
      },
    });
  };
  const editorOnChange = () => {
    let htmlContent = editorRef.current.getInstance().getHTML();
    setValue('contents', htmlContent);
  };
  const onUploadImage = async (blob, callback) => {
    const { url, public_id } = await uploadImage(blob, cloudFolderList.board);
    setValue('images', { ids: [...getValues('images')?.ids, public_id] });
    callback(url, 'alt text');
    return false;
  };
  return (
    <Question_Write_container className="C_container">
      <div className="top_box">
        <div className="box">
          <h1>분류</h1>
          <FormControl sx={{ minWidth: 120 }} size="small">
            <p className={`point_text ${errors.BoardType && 'active'}`}>
              {errors.BoardType?.message}{' '}
            </p>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              defaultValue={'일반'}
              {...register('type', {
                required: '분류 선택은 필수입니다.',
              })}
            >
              <MenuItem value="일반">일반</MenuItem>
              <MenuItem value="배송">배송</MenuItem>
              <MenuItem value="회원">회원</MenuItem>
              <MenuItem value="디자인">디자인</MenuItem>
              <MenuItem value="주문/결제">주문/결제</MenuItem>
              <MenuItem value="출력/마감">출력/마감</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="box title">
          <h1>제목</h1>
          <TextField
            variant="outlined"
            type="text"
            size="small"
            fullWidth
            placeholder="제목"
            {...register('title', {
              required: '제목은 필수입니다.',
            })}
          />
          <p className={`point_text ${errors.title && 'active'}`}>{errors.title?.message} </p>
        </div>

        <Link href="/home/center/question" className="direct_board">
          게시판 바로가기
        </Link>
      </div>
      <div className="box">
        <h1>내용</h1>
        <Editor
          ref={editorRef}
          onChange={editorOnChange}
          height="400px"
          placeholder="내용을 입력해주세요"
          previewStyle="vertical"
          hideModeSwitch={true}
          language="ko"
          hooks={{ addImageBlobHook: onUploadImage }}
          toolbarItems={[
            // 툴바 옵션 설정
            ['heading', 'bold'],
            ['hr', 'quote'],
            ['image', 'link'],
          ]}
        />
      </div>
      <div className="btn_box">
        <div className="C_basic_button inactive" onClick={() => reset()}>
          초기화
        </div>
        <div className="C_basic_button" onClick={handleSubmit(onSubmit)}>
          작성완료
        </div>
      </div>
      <Question_Read />
    </Question_Write_container>
  );
};
export default Question_Write;
