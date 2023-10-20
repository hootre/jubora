import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import supabase_client from 'lib/supabase_client';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { gatherKeys } from 'utils/gatherKeys';
import { deleteImage, uploadImage } from 'utils/imageUpload/uploader';

// 생성
const useCreateMainSettingImage = () => {
  const handleCreateMainSettingImage = async ({ image, position }) => {
    const { url, public_id } = await uploadImage(image)
      .then((data) => data)
      .catch((error) => console.log(`메인 구성 이미지 업로드 오류 :  ${error.message}`));

    const { data, error } = await supabase_client.from('mainSettingImage').insert({
      image: url,
      public_id,
      position,
    });

    return new Promise(async (resolve, reject) => {
      if (error) {
        await deleteImage(public_id);
        toast.error(`CODE : ${error.code}`);
        reject(`메인 구성 이미지 생성 오류 :  ${error.message}`);
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
    const { data, error } = await supabase_client.from('mainSettingImage').select('*');
    return new Promise((resolve, reject) => {
      if (error) {
        reject(`메인 구성 이미지 불러오기 오류 :  ${error.message}`);
      } else {
        resolve(data.sort((a, b) => a.id - b.id));
      }
    });
  };
  return useQuery(gatherKeys.mainSettingImage, handleGetMainSettingImage);
};
// 수정
const useUpdateMainSettingImage = () => {
  const handleUpdateMainSettingImage = async ({ id, image, position, prev_public_id }) => {
    if (prev_public_id) {
      await deleteImage(prev_public_id);
    }
    if (typeof image !== 'string') {
      const { url, public_id } = await uploadImage(image[0]);

      if (url.length > 0) {
        const { data, error } = await supabase_client
          .from('mainSettingImage')
          .update({
            image: url,
            position,
            public_id,
          })
          .eq('id', id);
        return new Promise(async (resolve, reject) => {
          if (error) {
            await deleteImage(public_id);
            toast.error(`CODE : ${error.code}`);
            reject(`메인 구성 이미지 수정 오류 :  ${error.message}`);
          } else {
            toast.success('성공적으로 수정하였습니다');
            resolve(data);
          }
        });
      } else {
        toast.error(`이미지 업로드 실패`);
      }
    }
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
  const handleDeleteMainSettingImage = async ({ id, public_id }) => {
    await deleteImage(public_id);
    const { data, error } = await supabase_client.from('mainSettingImage').delete().eq('id', id);
    return new Promise((resolve, reject) => {
      if (error) {
        reject(`메인 구성 이미지 수정 오류 :  ${error.message}`);
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
export const useMainSettingImage = () => {
  return {
    useCreateMainSettingImage,
    useGetMainSettingImage,
    useUpdateMainSettingImage,
    useDeleteMainSettingImage,
  };
};
