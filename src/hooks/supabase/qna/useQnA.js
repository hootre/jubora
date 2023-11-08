import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import supabaseClient from 'lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import gatherKeys from 'utils/gatherKeys';
import { deleteImage } from 'utils/imageUpload/uploader';

// 특정 id 제품 상세
const useGetOnlyQnA = (id) => {
  const handleGetOnlyQnA = async () => {
    const { data, error } = await supabaseClient.from('qna').select('*').eq('id', id).single();

    return new Promise((resolve, reject) => {
      if (error) {
        reject(new Error(`QnA Detail 오류 :  ${error.message}`));
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
    const { data, error } = await supabaseClient
      .from('qna')
      .insert({ name, title, contents, images, type });
    return new Promise((resolve, reject) => {
      if (error) {
        reject(new Error(`묻고답하기 생성오류 :  ${error.message}`));
      } else {
        toast.success('성공적으로 생성하였습니다');
        resolve(data);
      }
    });
  };
  const router = useRouter();
  const client = useQueryClient();
  return useMutation(handleCreateQnA, {
    onSuccess: () => {
      router.push('/home/center/qna');
      client.invalidateQueries(gatherKeys.qna);
    },
  });
};
// 목록
const useGetQnA = () => {
  const handleGetQnA = async () => {
    const { data, error } = await supabaseClient.from('qna').select('*');
    return new Promise((resolve, reject) => {
      if (error) {
        reject(new Error(`메인 슬라이드 불러오기 오류 :  ${error.message}`));
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
    const { data, error } = await supabaseClient
      .from('qna')
      .update({ name, title, contents, images, type })
      .eq('id', id);

    return new Promise((resolve, reject) => {
      if (error) {
        reject(new Error(`묻고답하기 수정 오류 :  ${error.message}`));
      } else {
        toast.success('성공적으로 수정하였습니다');
        resolve(data);
      }
    });
  };

  const client = useQueryClient();
  return useMutation(handleUpdateQnA, {
    onSuccess: async (data, variables) => {
      client.invalidateQueries(gatherKeys.qna);
      client.invalidateQueries([`qna_${variables.id}`]);
    },
  });
};
// 삭제
const useDeleteQnA = () => {
  const handleDeleteQnA = async ({ id, images }) => {
    const { data, error } = await supabaseClient.from('qna').delete().eq('id', id);
    return new Promise((resolve, reject) => {
      if (error) {
        reject(new Error(`묻고답하기 삭제 오류 :  ${error.message}`));
      } else {
        if (images.ids.length > 0) {
          images.ids.map((publicId) => deleteImage(publicId));
        }
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
const useQnA = () => ({
  useGetOnlyQnA,
  useCreateQnA,
  useGetQnA,
  useUpdateQnA,
  useDeleteQnA,
});
export default useQnA;
