import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import supabase_client from 'lib/supabase_client';
import { toast } from 'react-hot-toast';
import { gatherKeys } from 'utils/gatherKeys';

// 원하는 제품 태그 가져오기
const useGetOnlyProductsTag = (title) => {
  const handleGetOnlyProductsTag = async () => {
    const { data, error } = await supabase_client
      .from('productsTag')
      .select('*')
      .eq('title', title)
      .single();
    return new Promise((resolve, reject) => {
      if (error) {
        reject(`제품 태그 불러오기 실패 :  ${error.message}`);
      } else {
        resolve(data);
      }
    });
  };
  return useQuery([`productsTag_${title}`], handleGetOnlyProductsTag);
};

// 제품 태그 목록 가져오기
const useGetProductsTag = () => {
  const handleGetProductsTag = async () => {
    const { data, error } = await supabase_client.from('productsTag').select('*');
    return new Promise((resolve, reject) => {
      if (error) {
        reject(`제품 태그 불러오기 실패 :  ${error.message}`);
      } else {
        resolve(data);
      }
    });
  };
  return useQuery(gatherKeys.productsTag, handleGetProductsTag);
};
// 제품 태그 생성
const useCreateProductsTag = () => {
  const handleCreateProductsTag = async ({ title, tagList, from_nav }) => {
    const { data, error } = await supabase_client
      .from('productsTag')
      .insert({ title, tagList, from_nav });
    return new Promise((resolve, reject) => {
      if (error) {
        reject(`제품 태그 생성오류 :  ${error.message}`);
      } else {
        toast.success('성공적으로 생성하였습니다');
        resolve(data);
      }
    });
  };
  const client = useQueryClient();
  return useMutation(handleCreateProductsTag, {
    onSuccess: async () => {
      await client.invalidateQueries(gatherKeys.productsTag);
    },
  });
};
// 제품 태그 수정
const useUpdateProductsTag = () => {
  const handleUpdateProductsTag = async ({ id, title, tagList, from_nav }) => {
    const { data, error } = await supabase_client
      .from('productsTag')
      .update({ id, title, tagList, from_nav })
      .eq('id', id);
    return new Promise((resolve, reject) => {
      if (error) {
        reject(`제품 태그 수정오류 :  ${error.message}`);
      } else {
        toast.success('성공적으로 수정하였습니다');
        resolve(data);
      }
    });
  };
  const client = useQueryClient();
  return useMutation(handleUpdateProductsTag, {
    onSuccess: async () => {
      await client.invalidateQueries(gatherKeys.productsTag);
    },
  });
};
// 제품 태그 삭제
const useDeleteProductsTag = () => {
  const handleDeleteProductsTag = async ({ id }) => {
    const { data, error } = await supabase_client.from('productsTag').delete().eq('id', id);
    return new Promise((resolve, reject) => {
      if (error) {
        reject(`제품 태그 삭제오류 :  ${error.message}`);
      } else {
        toast.success('성공적으로 삭제하였습니다');
        resolve(data);
      }
    });
  };
  const client = useQueryClient();
  return useMutation(handleDeleteProductsTag, {
    onSuccess: async () => {
      await client.invalidateQueries(gatherKeys.productsTag);
    },
  });
};
export const useProductsTag = () => {
  return {
    useGetOnlyProductsTag,
    useGetProductsTag,
    useCreateProductsTag,
    useUpdateProductsTag,
    useDeleteProductsTag,
  };
};
