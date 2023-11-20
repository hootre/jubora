import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import supabaseClient from 'lib/supabaseClient';
import { toast } from 'react-hot-toast';
import gatherKeys from 'utils/gatherKeys';
import { deleteImage } from 'utils/imageUpload/uploader';
import { orderSettingFor } from '../../../../public/data';

//  생성
const useCreateTemplatesTag = () => {
  const handleCreateTemplatesTag = async ({ title, tagList, fromNav }) => {
    const list = { list: tagList };
    const { data, error: templateTagErr } = await supabaseClient.from('templatesTag').insert({
      title,
      tagList: list,
      fromNav,
    });
    const { error: orderSettingErr } = await supabaseClient.from('orderSetting').insert({
      categoryName: title,
    });
    return new Promise((resolve, reject) => {
      if (templateTagErr || orderSettingErr) {
        toast.error(`제품 태그 생성 오류`);
        reject(new Error(`제품 태그 생성 오류`));
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
      await client.invalidateQueries(gatherKeys.orderSetting);
    },
  });
};
// 목록
const useGetTemplatesTag = () => {
  const handleGetTemplatesTag = async () => {
    const { data, error } = await supabaseClient.from('templatesTag').select('*');
    return new Promise((resolve, reject) => {
      if (error) {
        toast.error(`CODE : ${error.code}`);
        reject(new Error(`제품 태그 불러오기 오류 :  ${error.message}`));
      } else {
        const resultData = data.sort((a, b) => a.id - b.id);
        resolve(resultData);
      }
    });
  };
  return useQuery(gatherKeys.templatesTag, handleGetTemplatesTag);
};
// 수정
const useUpdateTemplatesTag = () => {
  const handleUpdateTemplatesTag = async ({ id, title, tagList, fromNav }) => {
    const list = { list: tagList };
    const { data, error } = await supabaseClient
      .from('templatesTag')
      .update({
        title,
        tagList: list,
        fromNav,
      })
      .eq('id', id);

    return new Promise((resolve, reject) => {
      if (error) {
        toast.error(`CODE : ${error.code}`);
        reject(new Error(`제품 태그 수정 오류 :  ${error.message}`));
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

// 삭제
const useDeleteTemplatesTag = () => {
  const handleDeleteTemplatesTag = async ({ id, categoryName }) => {
    const { data: orderSettingData, error: readErr } = await supabaseClient
      .from('orderSetting')
      .select('*')
      .eq('categoryName', categoryName)
      .single();
    if (!readErr) {
      orderSettingFor.map((itemName) => {
        if (orderSettingData[itemName]) {
          orderSettingData[itemName].preview.map((item) => {
            if (item.publicId) {
              deleteImage(item.publicId);
            }
            return false;
          });
        }
        return false;
      });
      const { error: orderSettingErr } = await supabaseClient
        .from('orderSetting')
        .delete()
        .eq('categoryName', categoryName);
      const { error: templatesTagErr } = await supabaseClient
        .from('templatesTag')
        .delete()
        .eq('id', id);
      return new Promise((resolve, reject) => {
        if (orderSettingErr || templatesTagErr) {
          reject(new Error(`Order Setting 삭제 오류`));
        } else {
          toast.success('성공적으로 삭제하였습니다');
          resolve('삭제성공');
        }
      });
    }
    return false;
  };
  const client = useQueryClient();
  return useMutation(handleDeleteTemplatesTag, {
    onSuccess: () => {
      client.removeQueries(gatherKeys.templatesTag);
      client.removeQueries(gatherKeys.orderSetting);
    },
  });
};
const useTemplatesTag = () => ({
  useCreateTemplatesTag,
  useGetTemplatesTag,
  useUpdateTemplatesTag,
  useDeleteTemplatesTag,
});
export default useTemplatesTag;
