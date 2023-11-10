import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import supabaseClient from 'lib/supabaseClient';
import { toast } from 'react-hot-toast';
import gatherKeys from 'utils/gatherKeys';
import { deleteImage, uploadImage } from 'utils/imageUpload/uploader';

//  생성
const useCreateMainSlides = () => {
  const handleCreateMainSlides = async ({ img, title1, title2, content1, content2, subtitle }) => {
    const { url, public_id: publicId } = await uploadImage(img, 'jubora_board');

    const { data, error } = await supabaseClient.from('mainSlides').insert({
      img: url,
      publicId,
      title1,
      title2,
      content1,
      content2,
      subtitle,
    });

    return new Promise((resolve, reject) => {
      if (error) {
        deleteImage(publicId);
        toast.error(`CODE : ${error.code}`);
        reject(new Error(`메인 슬라이드 생성 오류 :  ${error.message}`));
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
// 목록
const useGetMainSlides = () => {
  const handleGetMainSlides = async () => {
    const { data, error } = await supabaseClient.from('mainSlides').select('*');
    return new Promise((resolve, reject) => {
      if (error) {
        reject(new Error(`메인 슬라이드 불러오기 오류 :  ${error.message}`));
      } else {
        resolve(data);
      }
    });
  };
  return useQuery(gatherKeys.mainSlides, handleGetMainSlides);
};
// 수정
const useUpdateMainSlides = () => {
  const handleUpdateMainSlides = async ({
    id,
    img,
    prevPublicId,
    title1,
    title2,
    content1,
    content2,
    subtitle,
  }) => {
    deleteImage(prevPublicId);
    const { url, public_id: publicId } = await uploadImage(img);
    const { data, error } = await supabaseClient
      .from('mainSlides')
      .update({
        img: url,
        publicId,
        title1,
        title2,
        content1,
        content2,
        subtitle,
      })
      .eq('id', id);

    return new Promise((resolve, reject) => {
      if (error) {
        deleteImage(publicId);
        toast.error(`CODE : ${error.code}`);
        reject(new Error(`메인 슬라이드 수정 오류 :  ${error.message}`));
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
// 삭제
const useDeleteMainSlides = () => {
  const handleDeleteMainSlides = async ({ id, images }) => {
    if (images?.ids.length > 0) {
      images.ids.map(async (publicId) => {
        await deleteImage(publicId);
      });
    }
    const { data, error } = await supabaseClient.from('mainSlides').delete().eq('id', id);
    return new Promise((resolve, reject) => {
      if (error) {
        reject(new Error(`메인 슬라이드 수정 오류 :  ${error.message}`));
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
const useMainSlides = () => ({
  useCreateMainSlides,
  useGetMainSlides,
  useUpdateMainSlides,
  useDeleteMainSlides,
});
export default useMainSlides;
