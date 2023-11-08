import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import supabaseClient from 'lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import gatherKeys from 'utils/gatherKeys';
import cloudFolderList from 'utils/imageUpload/cloudFolderList';
import { uploadImage } from 'utils/imageUpload/uploader';

// Order Id에 맞는 sian list
const useGetOnlySian = (orderId) => {
  const handleGetOnlySian = async () => {
    const { data, error } = await supabaseClient.from('sian').select('*').eq('orderId', orderId);

    return new Promise((resolve, reject) => {
      if (error) {
        reject(new Error(`시안확인 리스트 가져오기 오류 :  ${error.message}`));
      } else {
        resolve(data);
      }
    });
  };
  return useQuery([`sian_${orderId}`], handleGetOnlySian);
};
// 빈 시안 생성
//  생성
const useCreateEmptySian = (orderId) => {
  const handleCreateEmptySian = async () => {
    const { data, error } = await supabaseClient.from('sian').insert({ orderId });
    return new Promise((resolve, reject) => {
      if (error) {
        reject(new Error(`시안확인 생성오류 :  ${error.message}`));
      } else {
        toast.success('성공적으로 생성하였습니다');
        resolve(data);
      }
    });
  };
  const client = useQueryClient();
  return useMutation(handleCreateEmptySian, {
    onSuccess: async () => {
      await client.invalidateQueries([`sian_${orderId}`]);
    },
  });
};
//  생성
const useCreateSian = () => {
  const handleCreateSian = async ({ orderId, mainImg, adminText, userText }) => {
    let fileData = null;
    if (mainImg.length) {
      fileData = await uploadImage(mainImg[0], cloudFolderList.board);
    }

    const { data, error } = await supabaseClient.from('sian').insert({
      orderId,
      mainImg: fileData?.url,
      publicId: fileData?.publicId,
      adminText,
      userText,
    });
    return new Promise((resolve, reject) => {
      if (error) {
        reject(new Error(`시안확인 생성오류 :  ${error.message}`));
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
  const handleUpdateSian = async ({ id, adminText, userText, mainImg }) => {
    if (typeof mainImg === 'object') {
      const { url, publicId } = await uploadImage(mainImg, cloudFolderList.order);
      const { data, error } = await supabaseClient
        .from('sian')
        .update({
          adminText,
          userText,
          mainImg: url,
          publicId,
        })
        .eq('id', id);
      return new Promise((resolve, reject) => {
        if (error) {
          reject(new Error(`시안확인 수정 오류 :  ${error.message}`));
        } else {
          toast.success('성공적으로 수정하였습니다');
          resolve(data);
        }
      });
    }
    const { data, error } = await supabaseClient
      .from('sian')
      .update({
        adminText,
        userText,
      })
      .eq('id', id);
    return new Promise((resolve, reject) => {
      if (error) {
        reject(new Error(`시안확인 수정 오류 :  ${error.message}`));
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
const useDeleteSian = (orderId) => {
  const handleDeleteSian = async (id) => {
    const { data, error } = await supabaseClient.from('sian').delete().eq('id', id);
    return new Promise((resolve, reject) => {
      if (error) {
        reject(new Error(`시안확인 삭제 오류 :  ${error.message}`));
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
      client.removeQueries([`sian_${orderId}`]);
      router.push('/admin/board/write/sian');
    },
  });
};
const useSian = () => ({
  useGetOnlySian,
  useCreateSian,
  useCreateEmptySian,
  useUpdateSian,
  useDeleteSian,
});
export default useSian;
