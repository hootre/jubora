import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import supabase_client from 'lib/supabase_client';
import { toast } from 'react-hot-toast';
import { gatherKeys } from 'utils/gatherKeys';
import { deleteImage, uploadImage } from 'utils/imageUpload/uploader';

//  생성
const useCreateQuestion = () => {
  const handleCreateQuestion = async ({ name, title, contents, images, type }) => {
    const { data, error } = await supabase_client
      .from('question')
      .insert({ name, title, contents, images, type });
    return new Promise((resolve, reject) => {
      if (error) {
        reject(`자주묻는질문 생성오류 :  ${error.message}`);
      } else {
        toast.success('성공적으로 생성하였습니다');
        resolve(data);
      }
    });
  };
  const client = useQueryClient();
  return useMutation(handleCreateQuestion, {
    onSuccess: async () => {
      await client.invalidateQueries(gatherKeys.question);
    },
  });
};
// 목록
const useGetQuestion = () => {
  const handleGetQuestion = async () => {
    const { data, error } = await supabase_client.from('question').select('*');
    return new Promise((resolve, reject) => {
      if (error) {
        reject(`메인 슬라이드 불러오기 오류 :  ${error.message}`);
      } else {
        resolve(data);
      }
    });
  };
  return useQuery(gatherKeys.question, handleGetQuestion);
};
// 수정
const useUpdateQuestion = () => {
  const handleUpdateQuestion = async ({ id, name, title, contents, images, type }) => {
    const { data, error } = await supabase_client
      .from('question')
      .update({ name, title, contents, images, type })
      .eq('id', id);

    return new Promise((resolve, reject) => {
      if (error) {
        reject(`자주묻는질문 수정 오류 :  ${error.message}`);
      } else {
        toast.success('성공적으로 수정하였습니다');
        resolve(data);
      }
    });
  };

  const client = useQueryClient();
  return useMutation(handleUpdateQuestion, {
    onSuccess: async () => {
      await client.invalidateQueries(gatherKeys.question);
    },
  });
};
// 삭제
const useDeleteQuestion = () => {
  const handleDeleteQuestion = async ({ id, images }) => {
    if (images.ids.length > 0) {
      images.ids.map(async (public_id) => {
        await deleteImage(public_id);
      });
    }
    const { data, error } = await supabase_client.from('question').delete().eq('id', id);
    return new Promise((resolve, reject) => {
      if (error) {
        reject(`자주묻는질문 삭제 오류 :  ${error.message}`);
      } else {
        toast.success('성공적으로 삭제하였습니다');
        resolve(data);
      }
    });
  };
  const client = useQueryClient();
  return useMutation(handleDeleteQuestion, {
    onSuccess: () => {
      client.removeQueries(gatherKeys.question);
    },
  });
};
export const useQuestion = () => {
  return { useCreateQuestion, useGetQuestion, useUpdateQuestion, useDeleteQuestion };
};
