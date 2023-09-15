import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import supabase_client from 'lib/supabase_client';
import { toast } from 'react-hot-toast';
import { gatherKeys } from 'utils/gatherKeys';
import { deleteImage, uploadImage } from 'utils/imageUpload/uploader';

// 특정 id 제품 상세
const useGetOnlyQnA = (id) => {
  const handleGetOnlyQnA = async () => {
    const { data, error } = await supabase_client.from('qna').select('*').eq('id', id).single();

    return new Promise((resolve, reject) => {
      if (error) {
        reject(`QnA Detail 오류 :  ${error.message}`);
      } else {
        resolve(data);
      }
    });
  };
  return useQuery([`qna_${id}`], handleGetOnlyQnA);
};

//  생성
const useCreateQnA = () => {
  const handleCreateQnA = async ({ name, title, contents, images, type }) => {
    const { data, error } = await supabase_client
      .from('qna')
      .insert({ name, title, contents, images, type });
    return new Promise((resolve, reject) => {
      if (error) {
        reject(`묻고답하기 생성오류 :  ${error.message}`);
      } else {
        toast.success('성공적으로 생성하였습니다');
        resolve(data);
      }
    });
  };
  const client = useQueryClient();
  return useMutation(handleCreateQnA, {
    onSuccess: async () => {
      await client.invalidateQueries(gatherKeys.qna);
    },
  });
};
// 목록
const useGetQnA = () => {
  const handleGetQnA = async () => {
    const { data, error } = await supabase_client.from('qna').select('*');
    return new Promise((resolve, reject) => {
      if (error) {
        reject(`메인 슬라이드 불러오기 오류 :  ${error.message}`);
      } else {
        resolve(data);
      }
    });
  };
  return useQuery(gatherKeys.qna, handleGetQnA);
};
// 수정
const useUpdateQnA = () => {
  const handleUpdateQnA = async ({ id, name, title, contents, images, type }) => {
    const { data, error } = await supabase_client
      .from('qna')
      .update({ name, title, contents, images, type })
      .eq('id', id);

    return new Promise((resolve, reject) => {
      if (error) {
        reject(`묻고답하기 수정 오류 :  ${error.message}`);
      } else {
        toast.success('성공적으로 수정하였습니다');
        resolve(data);
      }
    });
  };

  const client = useQueryClient();
  return useMutation(handleUpdateQnA, {
    onSuccess: async () => {
      await client.invalidateQueries(gatherKeys.qna);
    },
  });
};
// 삭제
const useDeleteQnA = () => {
  const handleDeleteQnA = async ({ id, images }) => {
    if (images.ids.length > 0) {
      images.ids.map(async (public_id) => {
        await deleteImage(public_id);
      });
    }
    const { data, error } = await supabase_client.from('qna').delete().eq('id', id);
    return new Promise((resolve, reject) => {
      if (error) {
        reject(`묻고답하기 삭제 오류 :  ${error.message}`);
      } else {
        toast.success('성공적으로 삭제하였습니다');
        resolve(data);
      }
    });
  };
  const client = useQueryClient();
  return useMutation(handleDeleteQnA, {
    onSuccess: () => {
      client.removeQueries(gatherKeys.qna);
    },
  });
};
export const useQnA = () => {
  return { useGetOnlyQnA, useCreateQnA, useGetQnA, useUpdateQnA, useDeleteQnA };
};
