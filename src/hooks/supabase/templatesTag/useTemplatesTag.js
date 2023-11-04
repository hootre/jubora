import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { order_setting_for } from 'assets/data';
import supabase_client from 'lib/supabase_client';
import { toast } from 'react-hot-toast';
import { gatherKeys } from 'utils/gatherKeys';
import { deleteImage } from 'utils/imageUpload/uploader';

//  생성
const useCreateTemplatesTag = () => {
  const handleCreateTemplatesTag = async ({ title, tagList, from_nav }) => {
    const list = { list: tagList };
    const { data, error: templateTagErr } = await supabase_client.from('templatesTag').insert({
      title,
      tagList: list,
      from_nav,
    });
    const { error: orderSettingErr } = await supabase_client.from('orderSetting').insert({
      category_name: title,
    });
    return new Promise(async (resolve, reject) => {
      if (templateTagErr || orderSettingErr) {
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
      await client.invalidateQueries(gatherKeys.orderSetting);
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
        resolve(data.sort((a, b) => b.from_nav - a.from_nav));
      }
    });
  };
  return useQuery(gatherKeys.templatesTag, handleGetTemplatesTag);
};
// 수정
const useUpdateTemplatesTag = () => {
  const handleUpdateTemplatesTag = async ({ id, title, tagList, from_nav }) => {
    const list = { list: tagList };
    const { data, error } = await supabase_client
      .from('templatesTag')
      .update({
        title,
        tagList: list,
        from_nav,
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
  const handleDeleteTemplatesTag = async ({ id, category_name }) => {
    const { data: orderSettingData, error: readErr } = await supabase_client
      .from('orderSetting')
      .select('*')
      .eq('category_name', category_name)
      .single();
    if (!readErr) {
      order_setting_for.map((itemName) => {
        if (orderSettingData[itemName]) {
          orderSettingData[itemName].preview.map((item) => {
            if (item.public_id) {
              deleteImage(item.public_id);
            }
          });
        }
      });
      const { error: orderSettingErr } = await supabase_client
        .from('orderSetting')
        .delete()
        .eq('category_name', category_name);
      const { error: templatesTagErr } = await supabase_client
        .from('templatesTag')
        .delete()
        .eq('id', id);
      return new Promise((resolve, reject) => {
        if (orderSettingErr || templatesTagErr) {
          reject(`Order Setting 삭제 오류 :  ${error.message}`);
        } else {
          toast.success('성공적으로 삭제하였습니다');
          resolve('삭제성공');
        }
      });
    }
  };
  const client = useQueryClient();
  return useMutation(handleDeleteTemplatesTag, {
    onSuccess: () => {
      client.removeQueries(gatherKeys.templatesTag);
      client.removeQueries(gatherKeys.orderSetting);
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
