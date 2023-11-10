'use client';

import React, { useEffect, useRef } from 'react';
import simpleDate from 'utils/simpleDate';
import { useFormContext } from 'react-hook-form';
import { deleteImage, uploadImage } from 'utils/imageUpload/uploader';
import useQnA from 'hooks/supabase/qna/useQnA';
import cloudFolderList from 'utils/imageUpload/cloudFolderList';
import MainLoading from 'components/Loading/MainLoading';
import SelectAdminWrite from 'components/admin/Board/AdminWriteItem/SelectAdminWrite';
import { Editor } from '@toast-ui/react-editor';
import QnaUpdateContainer from './styles';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/i18n/ko-kr';

export default function QnaUpdate({ id }) {
  // notice 업데이트
  const { useGetOnlyQnA } = useQnA();
  const { data: qnaData, isLoading } = useGetOnlyQnA(id);

  // react hooks form
  const { register, setValue, getValues, watch } = useFormContext();
  // editor
  const editorRef = useRef(null);
  // 기본 값 할당
  useEffect(() => {
    setValue('id', id);
    setValue('title', qnaData.title);
    setValue('type', qnaData.type);
    setValue('contents', qnaData.contents);
    editorRef.current?.getInstance().setHTML(qnaData.contents);
    setValue('images', qnaData.images);
    return () => {
      getValues('images')?.ids?.map(async (publicId) => {
        await deleteImage(publicId);
      });
    };
  }, [qnaData]);

  const editorOnChange = () => {
    const htmlContent = editorRef.current.getInstance().getHTML();
    setValue('contents', htmlContent);
  };
  const onUploadImage = async (blob, callback) => {
    if (watch('images').ids) {
      const { url, public_id: publicId } = await uploadImage(blob, cloudFolderList.board);
      setValue('images', { ids: [...watch('images').ids, publicId] });
      callback(url, 'alt text');
    }
    return false;
  };
  if (isLoading) {
    return <MainLoading />;
  }
  return (
    <QnaUpdateContainer>
      <div className="contents_header">
        <div className="update_input_box">
          <SelectAdminWrite
            title="분류"
            itemList={['일반문의', '배송문의', '회원문의', '주문/결제문의', '출력/마감문의']}
            defaultValue={qnaData?.type}
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
            <h2>{qnaData.name}</h2>
          </div>
          <div className="date">
            <span>작성일</span>
            <h2>{simpleDate(qnaData.createdAt, 'm')}</h2>
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
    </QnaUpdateContainer>
  );
}
