'use client';

import React, { useRef, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { deleteImage, uploadImage } from 'utils/imageUpload/uploader';
import cloudFolderList from 'utils/imageUpload/cloudFolderList';
import useNotice from 'hooks/supabase/notice/useNotice';
import Link from 'next/link';
import User from 'hooks/supabase/auth/useUser';
import NoticeRead from 'components/home/Center/Notice/NoticeRead';
import { Editor } from '@toast-ui/react-editor';
import SelectAdminWrite from '../AdminWriteItem/SelectAdminWrite';
import TitleAdminWrite from '../AdminWriteItem/TitleAdminWrite';
import NoticeWriteContainer from './styles';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/i18n/ko-kr';

export default function NoticeWrite() {
  // 어드민 유저정보 확인
  const { useGetUserInfo } = User();
  const {
    data: { name },
  } = useGetUserInfo();
  // notice 생성함수
  const { useCreateNotice } = useNotice();
  const { mutate: createNotice } = useCreateNotice();

  // form 데이터 관리
  const methods = useForm();
  const { setValue, getValues, reset, handleSubmit, watch } = methods;
  // 기본 값 할당
  useEffect(() => {
    if (name) {
      setValue('name', name);
    }
    setValue('type', '공지');
    reset({ images: { ids: [] }, name });
    return () => {
      getValues('images')?.ids?.map(async (publicId) => {
        await deleteImage(publicId);
      });
    };
  }, [reset, name]);
  // editor
  const editorRef = useRef(null);
  const onSubmit = async (data) => {
    createNotice(data, {
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
      const { url, publicId } = await uploadImage(blob, cloudFolderList.board);
      setValue('images', { ids: [...watch('images').ids, publicId] });
      callback(url, 'alt text');
    }
    return false;
  };
  return (
    <NoticeWriteContainer className="CContainer">
      <FormProvider {...methods}>
        <div className="top_box">
          <SelectAdminWrite
            title="분류"
            defaultValue="공지"
            itemList={['공지', '일반']}
            valueName="type"
          />
          <TitleAdminWrite title="제목" valueName="title" />
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
        <div className="btn_box">
          <button type="button" className="C_basic_button inactive" onClick={() => reset()}>
            초기화
          </button>
          <button type="button" className="C_basic_button" onClick={handleSubmit(onSubmit)}>
            작성완료
          </button>
        </div>
        <NoticeRead />
      </FormProvider>
    </NoticeWriteContainer>
  );
}
