'use client';
import React, { useState } from 'react';
import { Notice_detail_container } from './styles';
import { BoardCommentList } from 'components/common/Board/BoardCommentList';
import { BoardCommentInput } from 'components/common/Board/BoardCommentInput';
import { SimpleDate } from 'utils/SimpleDate';
import { useNotice } from 'hooks/supabase/notice/useNotice';
import Notice_Read from '../Notice_Read';
import { FormProvider, useForm } from 'react-hook-form';
import { Notice_Update } from '../Notice_Update';
import { useUser } from 'hooks/supabase/auth/useUser';

export const Notice_detail = ({ id }) => {
  // 어드민 유저정보 확인
  const { useGetUserInfo } = useUser();
  const { data: userData } = useGetUserInfo();
  // notice 관련
  const { useGetOnlyNotice, useUpdateNotice } = useNotice();
  const { mutate: UpdateNotice } = useUpdateNotice(id);
  const { data: noticeData, isLoading } = useGetOnlyNotice(id);

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
    UpdateNotice(data, {
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
    <Notice_detail_container>
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
              수정하기
            </div>
          ))}
      </div>
      <FormProvider {...methods}>
        {sianUpdate ? (
          <Notice_Update id={id} />
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
                  <h2>{SimpleDate(noticeData.created_at, 'm')}</h2>
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
                dangerouslySetInnerHTML={{ __html: noticeData.contents }}
              ></div>
            </div>
          </>
        )}
      </FormProvider>

      <div className="comment_input">
        <BoardCommentInput from_table={'notice'} from_table_id={id} writer={noticeData.name} />
      </div>
      <div className="comment_box">
        <h2>댓글목록</h2>
        <BoardCommentList from_table={'notice'} from_table_id={id} />
      </div>
      <Notice_Read />
    </Notice_detail_container>
  );
};
