import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import supabaseClient from 'lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import gatherKeys from 'utils/gatherKeys';
import { deleteImage, uploadImage } from 'utils/imageUpload/uploader';

// 생성
const useCreateMainSettingImage = () => {
  const handleCreateMainSettingImage = async ({ image, position }) => {
    const { url, publicId } = await uploadImage(image);
    const { data, error } = await supabaseClient.from('mainSettingImage').insert({
      image: url,
      publicId,
      position,
    });

    return new Promise((resolve, reject) => {
      if (error) {
        deleteImage(publicId);
        toast.error(`CODE : ${error.code}`);
        reject(new Error(`메인 구성 이미지 생성 오류 :  ${error.message}`));
      } else {
        toast.success('성공적으로 생성하였습니다');
        resolve(data);
      }
    });
  };

  const client = useQueryClient();
  return useMutation(handleCreateMainSettingImage, {
    onSuccess: async () => {
      await client.invalidateQueries(gatherKeys.mainSettingImage);
    },
  });
};
// 목록
const useGetMainSettingImage = () => {
  const handleGetMainSettingImage = async () => {
    const { data, error } = await supabaseClient.from('mainSettingImage').select('*');
    return new Promise((resolve, reject) => {
      if (error) {
        reject(new Error(`메인 구성 이미지 불러오기 오류 :  ${error.message}`));
      } else {
        resolve(data.sort((a, b) => a.id - b.id));
      }
    });
  };
  return useQuery(gatherKeys.mainSettingImage, handleGetMainSettingImage);
};
// 수정
const useUpdateMainSettingImage = () => {
  const handleUpdateMainSettingImage = async ({ id, image, position, prevPublicId }) => {
    if (prevPublicId) {
      await deleteImage(prevPublicId);
    }
    if (typeof image !== 'string') {
      const { url, publicId } = await uploadImage(image[0]);

      if (url.length > 0) {
        const { data, error } = await supabaseClient
          .from('mainSettingImage')
          .update({
            image: url,
            position,
            publicId,
          })
          .eq('id', id);
        return new Promise((resolve, reject) => {
          if (error) {
            deleteImage(publicId);
            toast.error(`CODE : ${error.code}`);
            reject(new Error(`메인 구성 이미지 수정 오류 :  ${error.message}`));
          } else {
            toast.success('성공적으로 수정하였습니다');
            resolve(data);
          }
        });
      }
      toast.error(`이미지 업로드 실패`);
    }
    return false;
  };
  const client = useQueryClient();
  const router = useRouter();
  return useMutation(handleUpdateMainSettingImage, {
    onSuccess: async () => {
      await client.invalidateQueries(gatherKeys.mainSettingImage);
      router.refresh();
    },
  });
};
// 삭제
const useDeleteMainSettingImage = () => {
  const handleDeleteMainSettingImage = async ({ id, publicId }) => {
    deleteImage(publicId);
    const { data, error } = await supabaseClient.from('mainSettingImage').delete().eq('id', id);
    return new Promise((resolve, reject) => {
      if (error) {
        reject(new Error(`메인 구성 이미지 수정 오류 :  ${error.message}`));
      } else {
        toast.success('성공적으로 삭제하였습니다');
        resolve(data);
      }
    });
  };
  const client = useQueryClient();
  return useMutation(handleDeleteMainSettingImage, {
    onSuccess: () => {
      client.removeQueries(gatherKeys.mainSettingImage);
    },
  });
};
const useMainSettingImage = () => ({
  useCreateMainSettingImage,
  useGetMainSettingImage,
  useUpdateMainSettingImage,
  useDeleteMainSettingImage,
});
export default useMainSettingImage;
