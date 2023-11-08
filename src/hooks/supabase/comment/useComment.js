import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import supabaseClient from 'lib/supabaseClient';
import { toast } from 'react-hot-toast';

// Comment 생성
const useCreateComment = () => {
  const handleCreateComment = async ({ fromTable, fromTableId, fromComment, writer, contents }) => {
    const { data, error } = await supabaseClient.from('comment').insert({
      fromTable,
      fromTableId,
      fromComment,
      writer,
      contents,
    });
    return new Promise((resolve, reject) => {
      if (error) {
        reject(new Error(`댓글 작성 오류 :  ${error.message}`));
      } else {
        toast.success('성공적으로 작성하였습니다');
        resolve(data);
      }
    });
  };

  const client = useQueryClient();
  return useMutation(handleCreateComment, {
    onSuccess: (variables) => {
      client.invalidateQueries([`comment_${variables.fromTableId}`]);
    },
  });
};
// Comment 목록
const useGetComment = (fromTable, fromTableId) => {
  const handleGetComment = async () => {
    const { data, error } = await supabaseClient
      .from('comment')
      .select('*')
      .eq('fromTable', fromTable)
      .eq('fromTableId', fromTableId);

    return new Promise((resolve, reject) => {
      if (error) {
        reject(new Error(`Comment 가져오기 오류 :  ${error.message}`));
      } else {
        resolve(data);
      }
    });
  };
  return useQuery([`comment_${fromTableId}`], handleGetComment);
};

// Templates DELETE
const useDeleteComment = () => {
  const handleDeleteComment = async ({ id }) => {
    const { data, error } = await supabaseClient.from('comment').delete().eq('id', id);
    return new Promise((resolve, reject) => {
      if (error) {
        reject(new Error(`댓글 삭제 오류 :  ${error.message}`));
      } else {
        toast.success('성공적으로 삭제하였습니다');
        resolve(data);
      }
    });
  };
  const client = useQueryClient();
  return useMutation(handleDeleteComment, {
    onSuccess: (data, variables) => {
      client.invalidateQueries([`comment_${variables.fromTableId}`]);
    },
  });
};
const useComment = () => ({
  useCreateComment,
  useGetComment,
  useDeleteComment,
});

export default useComment;
