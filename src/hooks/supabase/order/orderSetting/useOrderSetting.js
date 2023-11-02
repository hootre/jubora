import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { order_setting_for } from 'assets/data';
import supabase_client from 'lib/supabase_client';
import { cloneDeep } from 'lodash';
import { toast } from 'react-hot-toast';
import { gatherKeys } from 'utils/gatherKeys';
import { cloudFolderList } from 'utils/imageUpload/cloudFolderList';
import { deleteImage, uploadImage } from 'utils/imageUpload/uploader';

// 특정 type 제품 상세
const useGetOnlyOrderSetting = (category_name) => {
  const handleGetOnlyOrderSetting = async () => {
    const { data, error } = await supabase_client
      .from('orderSetting')
      .select('*')
      .eq('category_name', category_name)
      .single();

    return new Promise((resolve, reject) => {
      if (error) {
        reject(`OrderSetting single 가져오기 오류 :  ${error.message}`);
      } else {
        resolve(data);
      }
    });
  };
  return useQuery(
    [
      `OrderSetting_
  ${category_name}`,
    ],
    handleGetOnlyOrderSetting
  );
};
// 원하는 항목 불러오기
const useGetWantOrderSetting = (wantList) => {
  const handleGetWantOrderSetting = async () => {
    const { data, error } = await supabase_client.from('orderSetting').select(wantList.join());
    return new Promise((resolve, reject) => {
      if (error) {
        reject(`원하는 항목 불러오기 오류 :  ${error.message}`);
      } else {
        resolve(data);
      }
    });
  };
  return useQuery([`${wantList}`], handleGetWantOrderSetting);
};

// ORDER 생성
const useCreateOrderSetting = () => {
  const handleCreateOrderSetting = async (orderSetting_data) => {
    order_setting_for.map((itemName) => {
      if (orderSetting_data[itemName].preview.length > 0) {
        orderSetting_data[itemName].preview.map(async (image, idx) => {
          const { url, public_id } = await uploadImage(image, cloudFolderList.board);
          orderSetting_data[itemName].preview[idx] = { url: url, public_id: public_id };
        });
      }
    });
    const { data, error } = await supabase_client.from('orderSetting').insert({
      category_name: orderSetting_data.category_name,
      item_1: orderSetting_data.item_1,
      item_2: orderSetting_data.item_2,
      item_3: orderSetting_data.item_3,
      item_4: orderSetting_data.item_4,
      item_5: orderSetting_data.item_5,
      item_6: orderSetting_data.item_6,
      item_7: orderSetting_data.item_7,
    });

    return new Promise((resolve, reject) => {
      if (error) {
        reject(`Order Setting 생성 오류 :  ${error.message}`);
      } else {
        toast.success('성공적으로 생성하였습니다');
        resolve(data);
      }
    });
  };

  const client = useQueryClient();
  return useMutation(handleCreateOrderSetting, {
    onSuccess: async () => {
      await client.invalidateQueries(gatherKeys.orderSetting);
    },
  });
};
// ORDER 목록
const useGetOrderSetting = () => {
  const handleGetOrderSetting = async () => {
    const { data, error } = await supabase_client.from('orderSetting').select('*');
    return new Promise((resolve, reject) => {
      if (error) {
        reject(`Order Setting 불러오기 오류 :  ${error.message}`);
      } else {
        resolve(data);
      }
    });
  };
  return useQuery(gatherKeys.orderSetting, handleGetOrderSetting);
};
// ORDER 수정
const useUpdateOrderSetting = () => {
  const handleUpdateOrderSetting = async (orderSetting_data) => {
    const resultData = cloneDeep(orderSetting_data);
    if (typeof resultData.id !== 'number') {
      return;
    }
    if (resultData.delete_images?.length > 0) {
      resultData.delete_images.map(async (image) => {
        await deleteImage(image);
      });
    }
    await new Promise((resolve, reject) => {
      let upload_images = [];
      let await_images = [];
      order_setting_for.map((itemName, idx) => {
        resultData[itemName].preview.map(async (item, idx) => {
          if (typeof item.image === 'object') {
            upload_images.push(idx);
          }
          if (typeof item.image === 'object') {
            if (typeof item.public_id === 'string') {
              await deleteImage(item.public_id);
            }
            const { url, public_id } = await uploadImage(item.image, cloudFolderList.board);
            resultData[itemName].preview[idx].image = url;
            resultData[itemName].preview[idx].public_id = public_id;
            await_images.push(idx);
          }
        });
      });
      let timer = setInterval(() => {
        if (upload_images.length === await_images.length) {
          clearInterval(timer);
          resolve('완료!');
        }
      }, 100);
    });

    const { data, error } = await supabase_client
      .from('orderSetting')
      .update({
        item_1: resultData['item_1'],
        item_2: resultData['item_2'],
        item_3: resultData['item_3'],
        item_4: resultData['item_4'],
        item_5: resultData['item_5'],
        item_6: resultData['item_6'],
        item_7: resultData['item_7'],
      })
      .eq('id', resultData.id);
    return new Promise((resolve, reject) => {
      if (error) {
        reject(`Order Setting 수정 오류 :  ${error.message}`);
      } else {
        toast.success('성공적으로 수정하였습니다');
        resolve(data);
      }
    });
  };

  const client = useQueryClient();
  return useMutation(handleUpdateOrderSetting, {
    onSuccess: async () => {
      await client.invalidateQueries(gatherKeys.orderSetting);
    },
  });
};
// Templates DELETE
const useDeleteOrderSetting = () => {
  const handleDeleteOrderSetting = async ({ id }) => {
    const { data, error } = await supabase_client.from('orderSetting').delete().eq('id', id);
    return new Promise((resolve, reject) => {
      if (error) {
        reject(`Order Setting 수정 오류 :  ${error.message}`);
      } else {
        toast.success('성공적으로 삭제하였습니다');
        resolve(data);
      }
    });
  };
  const client = useQueryClient();
  return useMutation(handleDeleteOrderSetting, {
    onSuccess: () => {
      client.removeQueries(gatherKeys.orderSetting);
    },
  });
};
export const useOrderSetting = () => {
  return {
    useGetOnlyOrderSetting,
    useGetWantOrderSetting,
    useCreateOrderSetting,
    useGetOrderSetting,
    useUpdateOrderSetting,
    useDeleteOrderSetting,
  };
};
