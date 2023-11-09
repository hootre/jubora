import React from 'react';
import useComment from 'hooks/supabase/comment/useComment';
import simpleDate from 'utils/simpleDate';
import User from 'hooks/supabase/auth/useUser';
import { BiX } from 'react-icons/bi';
import MainLoading from 'components/Loading/MainLoading';
import BoardCommentListContainer from './style';

export default function BoardCommentList({ fromTable, fromTableId }) {
  // user상태관리
  const { useGetUserInfo } = User();
  const { data: user, isLoading: userLoading } = useGetUserInfo();
  // 댓글 목록
  const { useGetComment, useDeleteComment } = useComment();
  const { mutate: deleteComment } = useDeleteComment();
  const { data, isLoading } = useGetComment(fromTable, fromTableId);
  if (isLoading || userLoading) {
    return <MainLoading />;
  }
  return (
    <BoardCommentListContainer>
      {data?.map((item) => (
        <li key={item.id}>
          <div className="comment_header">
            <span className="name">{item.writer}</span>
            <span className="date">{simpleDate(item.createdAt, 'm')}</span>
          </div>
          <span className="contents">{item.contents}</span>
          {(user.name === item.writer || user.role === 'admin') && (
            <button
              type="button"
              className="delete_btn"
              onClick={() => deleteComment({ id: item.id, fromTableId })}
            >
              <BiX />
            </button>
          )}
        </li>
      ))}
    </BoardCommentListContainer>
  );
}
