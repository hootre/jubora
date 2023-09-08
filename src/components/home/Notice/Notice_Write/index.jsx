'use client';
import React from 'react';
import { Notice_Write_container } from './styles';
// Toast UI Editor
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/i18n/ko-kr';
import Link from 'next/link';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { FormControl, MenuItem, Select, TextField } from '@mui/material';
import { useEffect } from 'react';
import { deleteImage, uploadImage } from 'utils/imageUpload/uploader';
import { cloudFolderList } from 'utils/imageUpload/cloudFolderList';
export const Notice_Write = () => {
  // form
  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm();
  // 기본 값 할당
  useEffect(() => {
    setValue('image', []);
    setValue('table', 'notice');
    return () => {
      getValues('image').map(async (public_id) => {
        await deleteImage(public_id);
      });
    };
  }, []);
  // editor
  const editorRef = useRef(null);
  const onSubmit = (data) => {
    console.log(data);
  };
  const editorOnChange = () => {
    let htmlContent = editorRef.current.getInstance().getHTML();
    setValue('content', htmlContent);
  };
  const onUploadImage = async (blob, callback) => {
    const { url, public_id } = await uploadImage(blob, cloudFolderList.board);
    setValue('image', [public_id, ...getValues('image')]);
    callback(url, 'alt text');
    return false;
  };
  return (
    <Notice_Write_container className="C_container">
      <div className="top_box">
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
        <div className="box">
          <h1>현재상태</h1>
          <FormControl sx={{ minWidth: 120 }} size="small">
            <p className={`point_text ${errors.BoardType && 'active'}`}>
              {errors.BoardType?.message}{' '}
            </p>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              defaultValue={'notice'}
              {...register('state', {
                required: '게시판 선택은 필수입니다.',
              })}
            >
              <MenuItem value="notice">확인 전</MenuItem>
              <MenuItem value="notice">확인</MenuItem>
              <MenuItem value="notice">수정중</MenuItem>
              <MenuItem value="notice">출력중</MenuItem>
              <MenuItem value="notice">배송중</MenuItem>
              <MenuItem value="notice">배송완료</MenuItem>
            </Select>
          </FormControl>
        </div>
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
        <button className="C_basic_button inactive">임시저장</button>
        <button className="C_basic_button" onClick={handleSubmit(onSubmit)}>
          작성완료
        </button>
      </div>
    </Notice_Write_container>
  );
};
