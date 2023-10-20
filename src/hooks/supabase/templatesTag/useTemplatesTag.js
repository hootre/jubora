import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import supabase_client from 'lib/supabase_client';
import { toast } from 'react-hot-toast';
import { gatherKeys } from 'utils/gatherKeys';

//  생성
const useCreateTemplatesTag = () => {
  const handleCreateTemplatesTag = async ({ title, tagList }) => {
    const list = { list: tagList };
    const { data, error } = await supabase_client.from('templatesTag').insert({
      title,
      tagList: list,
    });
    return new Promise(async (resolve, reject) => {
      if (error) {
        toast.error(`CODE : ${error.code}`);
        reject(`제품 태그 생성 오류 :  ${error.message}`);
      } else {
        toast.success('성공적으로 생성하였습니다');
        resolve(data);
      }
    });
  };

  const client = useQueryClient();
  return useMutation(handleCreateTemplatesTag, {
    onSuccess: async () => {
      await client.invalidateQueries(gatherKeys.templatesTag);
    },
  });
};
// 목록
const useGetTemplatesTag = () => {
  const handleGetTemplatesTag = async () => {
    const { data, error } = await supabase_client.from('templatesTag').select('*');
    return new Promise((resolve, reject) => {
      if (error) {
        toast.error(`CODE : ${error.code}`);
        reject(`제품 태그 불러오기 오류 :  ${error.message}`);
      } else {
        resolve(data.sort((a, b) => b.id - a.id));
      }
    });
  };
  return useQuery(gatherKeys.templatesTag, handleGetTemplatesTag);
};
// 수정
const useUpdateTemplatesTag = () => {
  const handleUpdateTemplatesTag = async ({ id, title, tagList }) => {
    const list = { list: tagList };
    const { data, error } = await supabase_client
      .from('templatesTag')
      .update({
        title,
        tagList: list,
      })
      .eq('id', id);

    return new Promise((resolve, reject) => {
      if (error) {
        toast.error(`CODE : ${error.code}`);
        reject(`제품 태그 수정 오류 :  ${error.message}`);
      } else {
        toast.success('성공적으로 수정하였습니다');
        resolve(data);
      }
    });
  };

  const client = useQueryClient();
  return useMutation(handleUpdateTemplatesTag, {
    onSuccess: async () => {
      await client.invalidateQueries(gatherKeys.templatesTag);
    },
  });
};
//삭제
const useDeleteTemplatesTag = () => {
  const handleDeleteTemplatesTag = async (id) => {
    const { data, error } = await supabase_client.from('templatesTag').delete().eq('id', id);
    return new Promise((resolve, reject) => {
      if (error) {
        toast.error(`CODE : ${error.code}`);
        reject(`제품 태그 삭제 오류 :  ${error.message}`);
      } else {
        toast.success('성공적으로 삭제하였습니다');
        resolve(data);
      }
    });
  };
  const client = useQueryClient();
  return useMutation(handleDeleteTemplatesTag, {
    onSuccess: () => {
      client.removeQueries(gatherKeys.templatesTag);
    },
  });
};
export const useTemplatesTag = () => {
  return {
    useCreateTemplatesTag,
    useGetTemplatesTag,
    useUpdateTemplatesTag,
    useDeleteTemplatesTag,
  };
};
