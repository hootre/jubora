'use client';

import { useState } from 'react';
import BoardCommentList from 'components/common/Board/BoardCommentList';
import BoardCommentInput from 'components/common/Board/BoardCommentInput';
import simpleDate from 'utils/simpleDate';
import useNotice from 'hooks/supabase/notice/useNotice';
import { FormProvider, useForm } from 'react-hook-form';
import { deleteImage } from 'utils/imageUpload/uploader';
import MainLoading from 'components/Loading/MainLoading';
import User from 'hooks/supabase/auth/useUser';
import NoticeDetailContainer from './styles';
import NoticeUpdate from '../NoticeUpdate';
import NoticeRead from '../NoticeRead';

export default function NoticeDetail({ id }) {
  // 어드민 유저정보 확인
  const { useGetUserInfo } = User();
  const { data: userData } = useGetUserInfo();
  // notice 관련
  const { useGetOnlyNotice, useUpdateNotice } = useNotice();
  const { mutate: UpdateNotice } = useUpdateNotice(id);
  const { data: noticeData, isLoading } = useGetOnlyNotice(id);

  // form 데이터 관리
  const methods = useForm();
  const { getValues, handleSubmit } = methods;
  // 수정하기 State
  const [sianUpdate, setSianUpdate] = useState();
  const toggleSianUpdate = () => {
    setSianUpdate((prev) => !prev);
  };
  const onSubmit = async (data) => {
    UpdateNotice(data, {
      onSuccess: () => {
        getValues('images')?.ids?.map((publicId) => {
          if (!getValues('contents').includes(publicId)) {
            deleteImage(publicId);
          }
          return false;
        });
        toggleSianUpdate();
      },
    });
  };
  if (isLoading) {
    return <MainLoading />;
  }
  return (
    <NoticeDetailContainer>
      <div className="btn_box">
        {userData?.role === 'admin' &&
          (sianUpdate ? (
            <>
              <button type="button" className="update_order" onClick={handleSubmit(onSubmit)}>
                수정완료
              </button>
              <button type="button" className="modify_btn" onClick={toggleSianUpdate}>
                수정취소
              </button>
            </>
          ) : (
            <button type="button" className="modify_btn" onClick={toggleSianUpdate}>
              수정하기
            </button>
          ))}
      </div>
      <FormProvider {...methods}>
        {sianUpdate ? (
          <NoticeUpdate id={id} />
        ) : (
          <>
            <div className="contents_header">
              <div className="title_box">
                <div className={noticeData.type === '공지' ? 'type notice' : 'type'}>
                  [{noticeData.type}]
                </div>
                <div className="title">{noticeData.title}</div>
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
              <div className="content" dangerouslySetInnerHTML={{ __html: noticeData.contents }} />
            </div>
          </>
        )}
      </FormProvider>

      <div className="comment_input">
        <BoardCommentInput fromTable="notice" fromTableId={id} writer={noticeData.name} />
      </div>
      <div className="comment_box">
        <h2>댓글목록</h2>
        <BoardCommentList fromTable="notice" fromTableId={id} />
      </div>
      <NoticeRead />
    </NoticeDetailContainer>
  );
}
