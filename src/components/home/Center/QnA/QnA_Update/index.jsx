'use client';
import React, { useEffect, useRef } from 'react';
import { QnA_Update_container } from './styles';
import { SimpleDate } from 'utils/SimpleDate';
// Toast UI Editor
dynamic(() => import('@toast-ui/editor/dist/toastui-editor.css'), { ssr: false });
const { Editor } = dynamic(() => import('@toast-ui/react-editor'), { ssr: false });
dynamic(() => import('@toast-ui/editor/dist/i18n/ko-kr'), { ssr: false });
import { useFormContext } from 'react-hook-form';
import { deleteImage, uploadImage } from 'utils/imageUpload/uploader';
import { Select_Admin_Write } from 'components/admin/Board/Admin_Write_Item/Select_Admin_Write';
import { useQnA } from 'hooks/supabase/qna/useQnA';
import dynamic from 'next/dynamic';

export const QnA_Update = ({ id }) => {
  // notice 업데이트
  const { useGetOnlyQnA } = useQnA();
  const { data: qnaData, isLoading } = useGetOnlyQnA(id);

  // react hooks form
  const { register, setValue, getValues } = useFormContext();
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
      getValues('images')?.ids?.map(async (public_id) => {
        await deleteImage(public_id);
      });
    };
  }, [qnaData]);

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
  if (isLoading) {
    return <h1>Loading</h1>;
  }
  return (
    <QnA_Update_container>
      <div className="contents_header">
        <div className="update_input_box">
          <Select_Admin_Write
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
            <h2>{SimpleDate(qnaData.created_at, 'm')}</h2>
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
    </QnA_Update_container>
  );
};
