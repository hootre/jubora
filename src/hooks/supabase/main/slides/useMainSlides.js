import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import supabase_client from 'lib/supabase-browser';
import { toast } from 'react-hot-toast';
import { gatherKeys } from 'utils/gatherKeys';
import { deleteImage, uploadImage } from 'utils/imageUpload/uploader';

//  생성
const useCreateMainSlides = () => {
  const handleCreateMainSlides = async ({
    img,
    title_1,
    title_2,
    content_1,
    content_2,
    subtitle,
  }) => {
    const { url, public_id } = await uploadImage(img)
      .then((data) => data)
      .catch((error) => console.log(`메인 슬라이드 이미지 업로드 오류 :  ${error.message}`));

    const { data, error } = await supabase_client.from('main_slides').insert({
      img: url,
      public_id,
      title_1,
      title_2,
      content_1,
      content_2,
      subtitle,
    });

    return new Promise((resolve, reject) => {
      if (error) {
        reject(`메인 슬라이드 생성 오류 :  ${error.message}`);
      } else {
        toast.success('성공적으로 생성하였습니다');
        resolve(data);
      }
    });
  };

  const client = useQueryClient();
  return useMutation(handleCreateMainSlides, {
    onSuccess: async () => {
      await client.invalidateQueries(gatherKeys.mainSlides);
    },
  });
};
// ORDER 목록
const useGetMainSlides = () => {
  const handleGetMainSlides = async () => {
    const { data, error } = await supabase_client.from('main_slides').select('*');
    return new Promise((resolve, reject) => {
      if (error) {
        reject(`메인 슬라이드 불러오기 오류 :  ${error.message}`);
      } else {
        resolve(data);
      }
    });
  };
  return useQuery(gatherKeys.mainSlides, handleGetMainSlides);
};
// ORDER 수정
const useUpdateMainSlides = () => {
  const handleUpdateMainSlides = async ({
    img,
    prev_public_id,
    title_1,
    title_2,
    content_1,
    content_2,
    subtitle,
  }) => {
    await deleteImage(prev_public_id);
    const { url, public_id } = await uploadImage(img)
      .then((data) => data)
      .catch((error) => console.log(`메인 슬라이드 이미지 업로드 오류 :  ${error.message}`));
    const { data, error } = await supabase_client
      .from('main_slides')
      .update({
        img: url,
        public_id,
        title_1,
        title_2,
        content_1,
        content_2,
        subtitle,
      })
      .eq('id', id);

    return new Promise((resolve, reject) => {
      if (error) {
        reject(`메인 슬라이드 수정 오류 :  ${error.message}`);
      } else {
        toast.success('성공적으로 수정하였습니다');
        resolve(data);
      }
    });
  };

  const client = useQueryClient();
  return useMutation(handleUpdateMainSlides, {
    onSuccess: async () => {
      await client.invalidateQueries(gatherKeys.mainSlides);
    },
  });
};
// Templates DELETE
const useDeleteMainSlides = () => {
  const handleDeleteMainSlides = async ({ id, prev_public_id }) => {
    await deleteImage(prev_public_id);
    const { data, error } = await supabase_client.from('main_slides').delete().eq('id', id);
    return new Promise((resolve, reject) => {
      if (error) {
        reject(`메인 슬라이드 수정 오류 :  ${error.message}`);
      } else {
        toast.success('성공적으로 삭제하였습니다');
        resolve(data);
      }
    });
  };
  const client = useQueryClient();
  return useMutation(handleDeleteMainSlides, {
    onSuccess: () => {
      client.removeQueries(gatherKeys.mainSlides);
    },
  });
};
export const useMainSlides = () => {
  return {
    useCreateMainSlides,
    useGetMainSlides,
    useUpdateMainSlides,
    useDeleteMainSlides,
  };
};
