'use client';

import { useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FormControl, MenuItem, Select, TextField } from '@mui/material';
import { deleteImage, uploadImage } from 'utils/imageUpload/uploader';
import cloudFolderList from 'utils/imageUpload/cloudFolderList';
import useQuestion from 'hooks/supabase/question/useQuestion';
import Link from 'next/link';
import QuestionRead from 'components/home/Center/Question/QuestionRead';
import User from 'hooks/supabase/auth/useUser';

import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import { Editor } from '@toast-ui/react-editor';

import QuestionWriteContainer from './styles';

export default function QuestionWrite() {
  // 어드민 유저정보 확인
  const { useGetUserInfo } = User();
  const {
    data: { name },
  } = useGetUserInfo();
  // notice 생성함수
  const { useCreateQuestion } = useQuestion();
  const { mutate: createQuestion } = useCreateQuestion();
  // form
  const {
    register,
    setValue,
    getValues,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // 기본 값 할당
  useEffect(() => {
    if (name) {
      setValue('name', name);
    }
    setValue('images', { ids: [] });
    setValue('table', 'notice');
    return () => {
      getValues('images')?.ids?.map(async (publicId) => {
        await deleteImage(publicId);
      });
    };
  }, [reset, name]);
  // editor
  const editorRef = useRef(null);
  const onSubmit = async (data) => {
    createQuestion(data, {
      onSuccess: () => {
        getValues('images')?.ids?.map(async (publicId) => {
          if (!getValues('contents').includes(publicId)) {
            await deleteImage(publicId);
          }
        });
        editorRef.current.getInstance().setMarkdown('');
        reset();
      },
    });
  };
  const editorOnChange = () => {
    const htmlContent = editorRef.current.getInstance().getHTML();
    setValue('contents', htmlContent);
  };
  const onUploadImage = async (blob, callback) => {
    if (typeof watch('images').ids === 'object') {
      const { url, public_id: publicId } = await uploadImage(blob, cloudFolderList.board);
      setValue('images', { ids: [...watch('images').ids, publicId] });
      callback(url, 'alt text');
    }
    return false;
  };
  return (
    <QuestionWriteContainer className="CContainer">
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
              defaultValue="일반"
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
          hideModeSwitch
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
        <button type="button" className="C_basic_button inactive" onClick={() => reset()}>
          초기화
        </button>
        <button type="button" className="C_basic_button" onClick={handleSubmit(onSubmit)}>
          작성완료
        </button>
      </div>
      <QuestionRead />
    </QuestionWriteContainer>
  );
}
