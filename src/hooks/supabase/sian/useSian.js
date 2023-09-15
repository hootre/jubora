import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import supabase_client from 'lib/supabase_client';
import { toast } from 'react-hot-toast';
import { gatherKeys } from 'utils/gatherKeys';
import { deleteImage, uploadImage } from 'utils/imageUpload/uploader';

// 특정 id 제품 상세
const useGetOnlySian = (id) => {
  const handleGetOnlySian = async () => {
    const { data, error } = await supabase_client.from('sian').select('*').eq('id', id).single();

    return new Promise((resolve, reject) => {
      if (error) {
        reject(`Sian Detail 오류 :  ${error.message}`);
      } else {
        resolve(data);
      }
    });
  };
  return useQuery([`sian_${id}`], handleGetOnlySian);
};
//  생성
const useCreateSian = () => {
  const handleCreateSian = async ({ name, title, contents, images, type, images }) => {
    if (images.ids.length > 0) {
      images.ids.map(async (public_id) => {
        await deleteImage(public_id);
      });
    }
    const { data, error } = await supabase_client
      .from('sian')
      .insert({ name, title, contents, images, type });
    return new Promise((resolve, reject) => {
      if (error) {
        reject(`시안확인 생성오류 :  ${error.message}`);
      } else {
        toast.success('성공적으로 생성하였습니다');
        resolve(data);
      }
    });
  };
  const client = useQueryClient();
  return useMutation(handleCreateSian, {
    onSuccess: async () => {
      await client.invalidateQueries(gatherKeys.sian);
    },
  });
};
// 목록
const useGetSian = () => {
  const handleGetSian = async () => {
    const { data, error } = await supabase_client.from('sian').select('*');
    return new Promise((resolve, reject) => {
      if (error) {
        reject(`메인 슬라이드 불러오기 오류 :  ${error.message}`);
      } else {
        resolve(data);
      }
    });
  };
  return useQuery(gatherKeys.sian, handleGetSian);
};
// 수정
const useUpdateSian = () => {
  const handleUpdateSian = async ({ id, name, title, contents, images, type }) => {
    const { data, error } = await supabase_client
      .from('sian')
      .update({ name, title, contents, images, type })
      .eq('id', id);

    return new Promise((resolve, reject) => {
      if (error) {
        reject(`시안확인 수정 오류 :  ${error.message}`);
      } else {
        toast.success('성공적으로 수정하였습니다');
        resolve(data);
      }
    });
  };

  const client = useQueryClient();
  return useMutation(handleUpdateSian, {
    onSuccess: async () => {
      await client.invalidateQueries(gatherKeys.sian);
    },
  });
};
// 삭제
const useDeleteSian = () => {
  const handleDeleteSian = async ({ id, images }) => {
    if (images.ids.length > 0) {
      images.ids.map(async (public_id) => {
        await deleteImage(public_id);
      });
    }
    const { data, error } = await supabase_client.from('sian').delete().eq('id', id);
    return new Promise((resolve, reject) => {
      if (error) {
        reject(`시안확인 삭제 오류 :  ${error.message}`);
      } else {
        toast.success('성공적으로 삭제하였습니다');
        resolve(data);
      }
    });
  };
  const client = useQueryClient();
  return useMutation(handleDeleteSian, {
    onSuccess: () => {
      client.removeQueries(gatherKeys.sian);
    },
  });
};
export const useSian = () => {
  return { useGetOnlySian, useCreateSian, useGetSian, useUpdateSian, useDeleteSian };
};
