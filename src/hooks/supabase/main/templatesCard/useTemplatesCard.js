import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import supabase_client from 'lib/supabase_client';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { gatherKeys } from 'utils/gatherKeys';
import { deleteImage, uploadImage } from 'utils/imageUpload/uploader';

// 생성
const useCreateMainTemplatesCard = () => {
  const handleCreateMainTemplatesCard = async ({ image, title, subtitle, description }) => {
    const { url, public_id } = await uploadImage(image)
      .then((data) => data)
      .catch((error) => console.log(`이미지 업로드 오류 :  ${error.message}`));

    const { data, error } = await supabase_client.from('mainTemplatesCard ').insert({
      image: url,
      public_id,
      title,
      subtitle,
      description,
    });

    return new Promise(async (resolve, reject) => {
      if (error) {
        await deleteImage(public_id);
        toast.error(`CODE : ${error.code}`);
        reject(`메인 제품 연결 카드 생성 오류 :  ${error.message}`);
      } else {
        toast.success('성공적으로 생성하였습니다');
        resolve(data);
      }
    });
  };

  const client = useQueryClient();
  return useMutation(handleCreateMainTemplatesCard, {
    onSuccess: async () => {
      await client.invalidateQueries(gatherKeys.mainTemplatesCard);
    },
  });
};
// 목록
const useGetMainTemplatesCard = () => {
  const handleGetMainTemplatesCard = async () => {
    const { data, error } = await supabase_client.from('mainTemplatesCard ').select('*');
    return new Promise((resolve, reject) => {
      if (error) {
        reject(`메인 제품 연결 카드 불러오기 오류 :  ${error.message}`);
      } else {
        resolve(data.sort((a, b) => a.id - b.id));
      }
    });
  };
  return useQuery(gatherKeys.mainTemplatesCard, handleGetMainTemplatesCard);
};
// 수정
const useUpdateMainTemplatesCard = () => {
  const handleUpdateMainTemplatesCard = async ({
    id,
    image,
    title,
    subtitle,
    description,
    prev_public_id,
  }) => {
    if (prev_public_id) {
      await deleteImage(prev_public_id);
    }
    if (typeof image !== 'string') {
      const { url, public_id } = await uploadImage(image[0]);
      if (url.length > 0) {
        const { data, error } = await supabase_client
          .from('mainTemplatesCard ')
          .update({
            image: url,
            title,
            subtitle,
            description,
            public_id,
          })
          .eq('id', id);
        return new Promise(async (resolve, reject) => {
          if (error) {
            await deleteImage(public_id);
            toast.error(`CODE : ${error.code}`);
            reject(`메인 제품 연결 카드 수정 오류 :  ${error.message}`);
          } else {
            toast.success('성공적으로 수정하였습니다');
            resolve(data);
          }
        });
      } else {
        toast.error(`이미지 업로드 실패`);
      }
    } else {
      const { data, error } = await supabase_client
        .from('mainTemplatesCard ')
        .update({
          title,
          subtitle,
          description,
        })
        .eq('id', id);
      return new Promise((resolve, reject) => {
        if (error) {
          toast.error(`CODE : ${error.code}`);
          reject(`메인 제품 연결 카드 수정 오류 :  ${error.message}`);
        } else {
          toast.success('성공적으로 수정하였습니다');
          resolve(data);
        }
      });
    }
  };

  const client = useQueryClient();
  const router = useRouter();
  return useMutation(handleUpdateMainTemplatesCard, {
    onSuccess: async () => {
      await client.invalidateQueries(gatherKeys.mainTemplatesCard);
      router.refresh();
    },
  });
};
// 삭제
const useDeleteMainTemplatesCard = () => {
  const handleDeleteMainTemplatesCard = async ({ id, public_id }) => {
    await deleteImage(public_id);
    const { data, error } = await supabase_client.from('mainTemplatesCard ').delete().eq('id', id);
    return new Promise((resolve, reject) => {
      if (error) {
        reject(`메인 제품 연결 카드 삭제 오류 :  ${error.message}`);
      } else {
        toast.success('성공적으로 삭제하였습니다');
        resolve(data);
      }
    });
  };
  const client = useQueryClient();
  return useMutation(handleDeleteMainTemplatesCard, {
    onSuccess: () => {
      client.removeQueries(gatherKeys.mainTemplatesCard);
    },
  });
};
export const useMainTemplatesCard = () => {
  return {
    useCreateMainTemplatesCard,
    useGetMainTemplatesCard,
    useUpdateMainTemplatesCard,
    useDeleteMainTemplatesCard,
  };
};
