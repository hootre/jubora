import React from 'react';
import { BoardCommentList_container } from './style';
import { useComment } from 'hooks/supabase/comment/useComment';

export const BoardCommentList = ({ from_table, from_table_id }) => {
  const { useGetComment } = useComment();
  const { data, isLoading } = useGetComment(from_table, from_table_id);
  if (isLoading) {
    return <h1>Loading</h1>;
  }
  console.log(data);
  return (
    <BoardCommentList_container>
      <ul>
        {data?.map((item) => (
          <li key={item.id}>
            <span>{item.writer}</span> |<span>{item.contents}</span> |
            <span>{String(item.created_at).substring(5, 10)}</span>
          </li>
        ))}
      </ul>
    </BoardCommentList_container>
  );
};
