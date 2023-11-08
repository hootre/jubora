import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import User from 'hooks/supabase/auth/useUser';
import useComment from 'hooks/supabase/comment/useComment';
import MainLoading from 'components/Loading/MainLoading';
import BoardCommentInputContainer from './style';

export default function BoardCommentInput({ fromTable, fromTableId, fromComment = null, writer }) {
  // user상태관리
  const { useGetUserInfo } = User();
  const { data: user, isLoading: userLoading } = useGetUserInfo();
  // comment 생성
  const [disabled, setDisabled] = useState();
  const { useCreateComment } = useComment();
  const { mutate: createComment } = useCreateComment();

  // form 데이터 관리
  const { handleSubmit, setValue, register, reset } = useForm();
  // 로그인 로그아웃 상태
  useEffect(() => {
    if (user) {
      setValue('writer', user.name ? user.name : writer);
    }
    reset({ fromTable, fromTableId, fromComment });
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
    return <MainLoading />;
  }

  return (
    <BoardCommentInputContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          {...register('contents')}
          placeholder="댓글을 입력해주세요"
          required
          disabled={disabled}
        />
      </form>
    </BoardCommentInputContainer>
  );
}
