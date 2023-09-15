'use client';
import React from 'react';
import { Notice_Write_container } from './styles';
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
import Notice_Read from '../Notice_Read';
import Link from 'next/link';
const Notice_Write = ({ name }) => {
  // notice 생성함수
  const { useCreateNotice } = useNotice();
  const { mutate: createNotice } = useCreateNotice();
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
    createNotice(data, {
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
    <Notice_Write_container className="C_container">
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
              defaultValue={'공지'}
              {...register('type', {
                required: '분류 선택은 필수입니다.',
              })}
            >
              <MenuItem value="공지">공지</MenuItem>
              <MenuItem value="일반">일반</MenuItem>
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
        <Link href="/home/center/notice" className="direct_board">
          게시판 바로가기
        </Link>
      </div>

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
      <div className="btn_box">
        <div className="C_basic_button inactive" onClick={() => reset()}>
          초기화
        </div>
        <div className="C_basic_button" onClick={handleSubmit(onSubmit)}>
          작성완료
        </div>
      </div>
      <Notice_Read />
    </Notice_Write_container>
  );
};
export default Notice_Write;
