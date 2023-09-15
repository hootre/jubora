'use client';
import React from 'react';
import { Notice_detail_container } from './styles';
import { BoardCommentList } from 'components/common/Board/BoardCommentList';
import { BoardCommentInput } from 'components/common/Board/BoardCommentInput';
import { SimpleDate } from 'utils/SimpleDate';
import { useNotice } from 'hooks/supabase/notice/useNotice';
import Notice_Read from '../Notice_Read';

export const Notice_detail = ({ id }) => {
  const { useGetOnlyNotice } = useNotice();
  const { data, isLoading } = useGetOnlyNotice(id);
  if (isLoading) {
    return <h1>Loading</h1>;
  }
  return (
    <Notice_detail_container>
      <div className="contents_header">
        <div className="title">{data.title}</div>
        <div className="subtitle">
          <div className="name">
            <span>작성자</span>
            <h2>{data.name}</h2>
          </div>
          <div className="date">
            <span>작성일</span>
            <h2>{SimpleDate(data.created_at, 'm')}</h2>
          </div>
          <div className="date">
            <span>댓글</span>
            <h2>0건</h2>
          </div>
        </div>
      </div>
      <div className="contents_body">
        <div className={'content'} dangerouslySetInnerHTML={{ __html: data.contents }}></div>
      </div>
      <div className="comment_input">
        <BoardCommentInput from_table={'notice'} from_table_id={id} writer={data.name} />
      </div>
      <div className="comment_box">
        <h2>댓글목록</h2>
        <BoardCommentList from_table={'notice'} from_table_id={id} />
      </div>
      <Notice_Read />
    </Notice_detail_container>
  );
};
