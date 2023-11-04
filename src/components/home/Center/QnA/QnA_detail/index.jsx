'use client';
import React, { useState } from 'react';
import { QnA_detail_container } from './styles';
import { BoardDetail } from 'components/common/Board/BoardDetail';
import { BoardCommentList } from 'components/common/Board/BoardCommentList';
import { BoardCommentInput } from 'components/common/Board/BoardCommentInput';
import { useQnA } from 'hooks/supabase/qna/useQnA';
import { SimpleDate } from 'utils/SimpleDate';
import QnA_Read from '../QnA_Read';
import { FormProvider, useForm } from 'react-hook-form';
import { useUser } from 'hooks/supabase/auth/useUser';
import { QnA_Update } from '../QnA_Update';

export const QnA_detail = ({ id }) => {
  // 어드민 유저정보 확인
  const { useGetUserInfo } = useUser();
  const { data: userData } = useGetUserInfo();
  // qna 관련
  const { useGetOnlyQnA, useUpdateQnA } = useQnA();
  const { mutate: UpdateQnA } = useUpdateQnA(id);
  const { data: qnaData, isLoading } = useGetOnlyQnA(id);
  // form 데이터 관리
  const methods = useForm();
  const {
    setValue,
    getValues,
    handleSubmit,
    formState: { isValid, errors },
  } = methods;
  // 수정하기 State
  const [sianUpdate, setSianUpdate] = useState();
  const toggleSianUpdate = () => {
    setSianUpdate((prev) => !prev);
  };
  const onSubmit = async (data) => {
    UpdateQnA(data, {
      onSuccess: () => {
        getValues('images')?.ids?.map(async (public_id) => {
          if (!getValues('contents').includes(public_id)) {
            await deleteImage(public_id);
          }
        });
        toggleSianUpdate();
      },
    });
  };
  if (isLoading) {
    return <h1>Loading</h1>;
  }
  return (
    <QnA_detail_container>
      <div className="btn_box">
        {userData?.role === 'admin' &&
          (sianUpdate ? (
            <>
              <div className="update_order" onClick={handleSubmit(onSubmit)}>
                수정완료
              </div>
              <div className="modify_btn" onClick={toggleSianUpdate}>
                수정취소
              </div>
            </>
          ) : (
            <div className="modify_btn" onClick={toggleSianUpdate}>
              주문수정하기
            </div>
          ))}
      </div>
      <FormProvider {...methods}>
        {sianUpdate ? (
          <QnA_Update id={id} />
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
                  <h2>{SimpleDate(qnaData.created_at, 'm')}</h2>
                </div>
                <div className="date">
                  <span>댓글</span>
                  <h2>0건</h2>
                </div>
              </div>
            </div>
            <div className="contents_body">
              <div
                className={'content'}
                dangerouslySetInnerHTML={{ __html: qnaData.contents }}
              ></div>
            </div>
          </>
        )}
      </FormProvider>
      <div className="comment_input">
        <BoardCommentInput from_table={'qna'} from_table_id={id} writer={qnaData.name} />
      </div>
      <div className="comment_box">
        <h2>댓글목록</h2>
        <BoardCommentList from_table={'qna'} from_table_id={id} />
      </div>
      <QnA_Read />
    </QnA_detail_container>
  );
};
