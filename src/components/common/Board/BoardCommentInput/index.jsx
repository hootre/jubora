import React, { useEffect } from 'react';
import { BoardCommentInput_container } from './style';
import { useForm } from 'react-hook-form';
import { useUser } from 'hooks/supabase/auth/useUser';
import { useComment } from 'hooks/supabase/comment/useComment';

export const BoardCommentInput = ({ from_table, from_table_id, from_comment = null, writer }) => {
  // user상태관리
  const { useGetUserInfo } = useUser();
  const { data: user, isLoading: userLoading } = useGetUserInfo();
  // comment 생성
  const { useCreateComment } = useComment();
  const { mutate: createComment } = useCreateComment();

  // form 데이터 관리
  const {
    handleSubmit,
    formState: {},
    setValue,
    register,
  } = useForm();
  // 로그인 로그아웃 상태
  useEffect(() => {
    if (user) {
      setValue('writer', user.name ? user.name : writer);
    }
    // 기본 값
    setValue('from_table', from_table);
    setValue('from_table_id', from_table_id);
    setValue('from_comment', from_comment);
  }, [user]);
  const onSubmit = (data) => {
    createComment(data);
  };
  if (userLoading) {
    return <h1>Loading</h1>;
  }

  return (
    <BoardCommentInput_container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register('contents')} />
      </form>
    </BoardCommentInput_container>
  );
};
