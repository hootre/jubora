'use client';
import React from 'react';
import { Notice_Write_container } from './styles';
// Toast UI Editor
dynamic(() => import('@toast-ui/editor/dist/toastui-editor.css'), { ssr: false });
const { Editor } = dynamic(() => import('@toast-ui/react-editor'), { ssr: false });
dynamic(() => import('@toast-ui/editor/dist/i18n/ko-kr'), { ssr: false });
import { useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { deleteImage, uploadImage } from 'utils/imageUpload/uploader';
import { cloudFolderList } from 'utils/imageUpload/cloudFolderList';
import { useNotice } from 'hooks/supabase/notice/useNotice';
import Notice_Read from '../../../home/Center/Notice/Notice_Read';
import Link from 'next/link';
import { Select_Admin_Write } from '../Admin_Write_Item/Select_Admin_Write';
import { Title_Admin_Write } from '../Admin_Write_Item/Title_Admin_Write';
import { useUser } from 'hooks/supabase/auth/useUser';
import dynamic from 'next/dynamic';
const Notice_Write = () => {
  // 어드민 유저정보 확인
  const { useGetUserInfo } = useUser();
  const {
    data: { name },
  } = useGetUserInfo();
  // notice 생성함수
  const { useCreateNotice } = useNotice();
  const { mutate: createNotice } = useCreateNotice();

  // form 데이터 관리
  const methods = useForm();
  const {
    setValue,
    getValues,
    reset,
    handleSubmit,
    formState: { isValid, errors },
  } = methods;
  // 기본 값 할당
  useEffect(() => {
    if (name) {
      setValue('name', name);
    }
    setValue('type', '공지');
    reset({ images: { ids: [] }, name });
    return () => {
      getValues('images')?.ids?.map(async (public_id) => {
        await deleteImage(public_id);
      });
    };
  }, [reset, name]);
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
      <FormProvider {...methods}>
        <div className="top_box">
          <Select_Admin_Write
            title="분류"
            defaultValue={'공지'}
            itemList={['공지', '일반']}
            valueName="type"
          />
          <Title_Admin_Write title="제목" valueName="title" />
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
      </FormProvider>
    </Notice_Write_container>
  );
};
export default Notice_Write;
