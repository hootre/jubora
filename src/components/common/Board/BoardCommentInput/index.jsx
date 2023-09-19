import React, { useEffect, useState } from 'react';
import { BoardCommentInput_container } from './style';
import { useForm } from 'react-hook-form';
import { useUser } from 'hooks/supabase/auth/useUser';
import { useComment } from 'hooks/supabase/comment/useComment';

export const BoardCommentInput = ({ from_table, from_table_id, from_comment = null, writer }) => {
  // user상태관리
  const { useGetUserInfo } = useUser();
  const { data: user, isLoading: userLoading } = useGetUserInfo();
  // comment 생성
  const [disabled, setDisabled] = useState();
  const { useCreateComment } = useComment();
  const { mutate: createComment } = useCreateComment();

  // form 데이터 관리
  const {
    handleSubmit,
    formState: {},
    setValue,
    register,
    reset,
  } = useForm();
  // 로그인 로그아웃 상태
  useEffect(() => {
    if (user) {
      setValue('writer', user.name ? user.name : writer);
    }
    reset({ from_table, from_table_id, from_comment });
  }, [user, reset]);
  const onSubmit = (data) => {
    setDisabled(true);
    createComment(data, {
      onSuccess: () => {
        setDisabled(false);
        reset();
      },
    });
  };
  if (userLoading) {
    return <h1>Loading</h1>;
  }

  return (
    <BoardCommentInput_container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          {...register('contents')}
          placeholder="댓글을 입력해주세요"
          required
          disabled={disabled}
        />
      </form>
    </BoardCommentInput_container>
  );
};
