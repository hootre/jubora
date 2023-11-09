'use client';

import React, { useEffect, useRef } from 'react';
import simpleDate from 'utils/simpleDate';
import useNotice from 'hooks/supabase/notice/useNotice';
import { useFormContext } from 'react-hook-form';
import { deleteImage, uploadImage } from 'utils/imageUpload/uploader';

import SelectAdminWrite from 'components/admin/Board/AdminWriteItem/SelectAdminWrite';
import cloudFolderList from 'utils/imageUpload/cloudFolderList';
import MainLoading from 'components/Loading/MainLoading';
import { Editor } from '@toast-ui/react-editor';
import NoticeUpdateContainer from './styles';

import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/i18n/ko-kr';

export default function NoticeUpdate({ id }) {
  // notice 업데이트
  const { useGetOnlyNotice } = useNotice();
  const { data: noticeData, isLoading } = useGetOnlyNotice(id);

  // react hooks form
  const { register, setValue, getValues, watch } = useFormContext();
  // editor
  const editorRef = useRef(null);
  // 기본 값 할당
  useEffect(() => {
    setValue('id', id);
    setValue('title', noticeData.title);
    setValue('type', noticeData.type);
    setValue('contents', noticeData.contents);
    editorRef.current?.getInstance().setHTML(noticeData.contents);
    setValue('images', noticeData.images);
    return () => {
      getValues('images')?.ids?.map(async (publicId) => {
        await deleteImage(publicId);
      });
    };
  }, []);

  const editorOnChange = () => {
    const htmlContent = editorRef.current.getInstance().getHTML();
    setValue('contents', htmlContent);
  };
  const onUploadImage = async (blob, callback) => {
    if (watch('images').ids) {
      const { url, publicId } = await uploadImage(blob, cloudFolderList.board);
      setValue('images', { ids: [...watch('images').ids, publicId] });
      callback(url, 'alt text');
    }
  };
  if (isLoading) {
    return <MainLoading />;
  }
  return (
    <NoticeUpdateContainer>
      <div className="contents_header">
        <div className="update_input_box">
          <SelectAdminWrite
            title="분류"
            itemList={['공지', '일반']}
            defaultValue={noticeData?.type}
            valueName="type"
          />
          <div className="title">
            <h2>제목</h2>
            <input type="text" {...register('title')} />
          </div>
        </div>
        <div className="subtitle">
          <div className="name">
            <span>작성자</span>
            <h2>{noticeData.name}</h2>
          </div>
          <div className="date">
            <span>작성일</span>
            <h2>{simpleDate(noticeData.createdAt, 'm')}</h2>
          </div>
          <div className="date">
            <span>댓글</span>
            <h2>0건</h2>
          </div>
        </div>
      </div>
      <div className="contents_body">
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
    </NoticeUpdateContainer>
  );
}
