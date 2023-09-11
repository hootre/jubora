import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import supabase_client from 'lib/supabase_client';
import { toast } from 'react-hot-toast';
import { gatherKeys } from 'utils/gatherKeys';
import { deleteImage, uploadImage } from 'utils/imageUpload/uploader';

//  생성
const useCreateNotice = () => {
  const handleCreateNotice = async ({ name, title, contents, images, type }) => {
    const { data, error } = await supabase_client
      .from('notice')
      .insert({ name, title, contents, images, type });
    return new Promise((resolve, reject) => {
      if (error) {
        reject(`공지사항 생성오류 :  ${error.message}`);
      } else {
        toast.success('성공적으로 생성하였습니다');
        resolve(data);
      }
    });
  };
  const client = useQueryClient();
  return useMutation(handleCreateNotice, {
    onSuccess: async () => {
      await client.invalidateQueries(gatherKeys.notice);
    },
  });
};
// 목록
const useGetNotice = () => {
  const handleGetNotice = async () => {
    const { data, error } = await supabase_client.from('notice').select('*');
    return new Promise((resolve, reject) => {
      if (error) {
        reject(`메인 슬라이드 불러오기 오류 :  ${error.message}`);
      } else {
        resolve(data);
      }
    });
  };
  return useQuery(gatherKeys.notice, handleGetNotice);
};
// 수정
const useUpdateNotice = () => {
  const handleUpdateNotice = async ({ id, name, title, contents, images, type }) => {
    const { data, error } = await supabase_client
      .from('notice')
      .update({ name, title, contents, images, type })
      .eq('id', id);

    return new Promise((resolve, reject) => {
      if (error) {
        reject(`공지사항 수정 오류 :  ${error.message}`);
      } else {
        toast.success('성공적으로 수정하였습니다');
        resolve(data);
      }
    });
  };

  const client = useQueryClient();
  return useMutation(handleUpdateNotice, {
    onSuccess: async () => {
      await client.invalidateQueries(gatherKeys.notice);
    },
  });
};
// 삭제
const useDeleteNotice = () => {
  const handleDeleteNotice = async ({ id, images }) => {
    if (images.ids.length > 0) {
      images.ids.map(async (public_id) => {
        await deleteImage(public_id);
      });
    }
    const { data, error } = await supabase_client.from('notice').delete().eq('id', id);
    return new Promise((resolve, reject) => {
      if (error) {
        reject(`공지사항 삭제 오류 :  ${error.message}`);
      } else {
        toast.success('성공적으로 삭제하였습니다');
        resolve(data);
      }
    });
  };
  const client = useQueryClient();
  return useMutation(handleDeleteNotice, {
    onSuccess: () => {
      client.removeQueries(gatherKeys.notice);
    },
  });
};
export const useNotice = () => {
  return { useCreateNotice, useGetNotice, useUpdateNotice, useDeleteNotice };
};
