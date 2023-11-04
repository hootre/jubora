import React from 'react';
import { BoardCommentList_container } from './style';
import { useComment } from 'hooks/supabase/comment/useComment';
import { SimpleDate } from 'utils/SimpleDate';
import { useUser } from 'hooks/supabase/auth/useUser';
import { BiX } from 'react-icons/bi';

export const BoardCommentList = ({ from_table, from_table_id }) => {
  // user상태관리
  const { useGetUserInfo } = useUser();
  const { data: user, isLoading: userLoading } = useGetUserInfo();
  // 댓글 목록
  const { useGetComment, useDeleteComment } = useComment();
  const { mutate: deleteComment } = useDeleteComment();
  const { data, isLoading } = useGetComment(from_table, from_table_id);
  if (isLoading || userLoading) {
    return <h1>Loading</h1>;
  }
  return (
    <BoardCommentList_container>
      {data?.map((item) => (
        <li key={item.id}>
          <div className="comment_header">
            <span className="name">{item.writer}</span>
            <span className="date">{SimpleDate(item.created_at, 'm')}</span>
          </div>
          <span className="contents">{item.contents}</span>
          {(user.name === item.writer || user.role === 'admin') && (
            <div
              className="delete_btn"
              onClick={() => deleteComment({ id: item.id, from_table_id })}
            >
              <BiX />
            </div>
          )}
        </li>
      ))}
    </BoardCommentList_container>
  );
};
