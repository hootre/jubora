'use client';

import React, { useState } from 'react';
import BoardCommentList from 'components/common/Board/BoardCommentList';
import BoardCommentInput from 'components/common/Board/BoardCommentInput';
import useQnA from 'hooks/supabase/qna/useQnA';
import simpleDate from 'utils/simpleDate';
import { FormProvider, useForm } from 'react-hook-form';
import { deleteImage } from 'utils/imageUpload/uploader';
import MainLoading from 'components/Loading/MainLoading';
import User from 'hooks/supabase/auth/useUser';
import QnaDetailContainer from './styles';
import QnaUpdate from '../QnaUpdate';
import QnaRead from '../QnaRead';

export default function QnADetail({ id }) {
  // 어드민 유저정보 확인
  const { useGetUserInfo } = User();
  const { data: userData } = useGetUserInfo();
  // qna 관련
  const { useGetOnlyQnA, useUpdateQnA } = useQnA();
  const { mutate: UpdateQnA } = useUpdateQnA(id);
  const { data: qnaData, isLoading } = useGetOnlyQnA(id);
  // form 데이터 관리
  const methods = useForm();
  const { getValues, handleSubmit } = methods;
  // 수정하기 State
  const [sianUpdate, setSianUpdate] = useState();
  const toggleSianUpdate = () => {
    setSianUpdate((prev) => !prev);
  };
  const onSubmit = async (data) => {
    UpdateQnA(data, {
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
    <QnaDetailContainer>
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
              주문수정하기
            </button>
          ))}
      </div>
      <FormProvider {...methods}>
        {sianUpdate ? (
          <QnaUpdate id={id} />
        ) : (
          <>
            <div className="contents_header">
              <div className="title_box">
                <div className={qnaData.type === '공지' ? 'type notice' : 'type'}>
                  [{qnaData.type}]
                </div>
                <div className="title">{qnaData.title}</div>
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
              <div className="content" dangerouslySetInnerHTML={{ __html: qnaData.contents }} />
            </div>
          </>
        )}
      </FormProvider>
      <div className="comment_input">
        <BoardCommentInput fromTable="qna" fromTableId={id} writer={qnaData.name} />
      </div>
      <div className="comment_box">
        <h2>댓글목록</h2>
        <BoardCommentList fromTable="qna" fromTableId={id} />
      </div>
      <QnaRead />
    </QnaDetailContainer>
  );
}
