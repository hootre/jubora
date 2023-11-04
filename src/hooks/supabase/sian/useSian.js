import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import supabase_client from 'lib/supabase_client';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { gatherKeys } from 'utils/gatherKeys';
import { cloudFolderList } from 'utils/imageUpload/cloudFolderList';
import { deleteImage, uploadImage } from 'utils/imageUpload/uploader';

// Order Id에 맞는 sian list
const useGetOnlySian = (order_id) => {
  const handleGetOnlySian = async () => {
    const { data, error } = await supabase_client.from('sian').select('*').eq('order_id', order_id);

    return new Promise((resolve, reject) => {
      if (error) {
        reject(`시안확인 리스트 가져오기 오류 :  ${error.message}`);
      } else {
        resolve(data);
      }
    });
  };
  return useQuery([`sian_${order_id}`], handleGetOnlySian);
};
// 빈 시안 생성
//  생성
const useCreateEmptySian = (order_id) => {
  const handleCreateEmptySian = async () => {
    const { data, error } = await supabase_client.from('sian').insert({ order_id });
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
  return useMutation(handleCreateEmptySian, {
    onSuccess: async () => {
      await client.invalidateQueries([`sian_${order_id}`]);
    },
  });
};
//  생성
const useCreateSian = () => {
  const handleCreateSian = async ({ order_id, main_img, admin_text, user_text }) => {
    let fileData = null;
    if (main_img.length) {
      fileData = await uploadImage(main_img[0], cloudFolderList.board);
    }

    const { data, error } = await supabase_client.from('sian').insert({
      order_id,
      main_img: fileData?.url,
      public_id: fileData?.public_id,
      admin_text,
      user_text,
    });
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
// 수정
const useUpdateSian = () => {
  const handleUpdateSian = async ({ id, admin_text, user_text, main_img }) => {
    if (typeof main_img === 'object') {
      const { url, public_id } = await uploadImage(main_img, cloudFolderList.order);
      const { data, error } = await supabase_client
        .from('sian')
        .update({
          admin_text,
          user_text,
          main_img: url,
          public_id,
        })
        .eq('id', id);
      return new Promise((resolve, reject) => {
        if (error) {
          reject(`시안확인 수정 오류 :  ${error.message}`);
        } else {
          toast.success('성공적으로 수정하였습니다');
          resolve(data);
        }
      });
    } else {
      const { data, error } = await supabase_client
        .from('sian')
        .update({
          admin_text,
          user_text,
        })
        .eq('id', id);
      return new Promise((resolve, reject) => {
        if (error) {
          reject(`시안확인 수정 오류 :  ${error.message}`);
        } else {
          toast.success('성공적으로 수정하였습니다');
          resolve(data);
        }
      });
    }
  };

  const client = useQueryClient();
  return useMutation(handleUpdateSian, {
    onSuccess: async () => {
      await client.invalidateQueries(gatherKeys.sian);
    },
  });
};
// 삭제
const useDeleteSian = (order_id) => {
  const handleDeleteSian = async (id) => {
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
  const router = useRouter();
  const client = useQueryClient();
  return useMutation(handleDeleteSian, {
    onSuccess: () => {
      client.removeQueries([`sian_${order_id}`]);
      router.push('/admin/board/write/sian');
    },
  });
};
export const useSian = () => {
  return { useGetOnlySian, useCreateSian, useCreateEmptySian, useUpdateSian, useDeleteSian };
};
