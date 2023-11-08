import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { orderSettingFor } from 'assets/data';
import supabaseClient from 'lib/supabaseClient';
import { cloneDeep } from 'lodash';
import { toast } from 'react-hot-toast';
import gatherKeys from 'utils/gatherKeys';
import cloudFolderList from 'utils/imageUpload/cloudFolderList';
import { deleteImage, uploadImage } from 'utils/imageUpload/uploader';

// 특정 type 제품 상세
const useGetOnlyOrderSetting = (categoryName) => {
  const handleGetOnlyOrderSetting = async () => {
    const { data, error } = await supabaseClient
      .from('orderSetting')
      .select('*')
      .eq('categoryName', categoryName)
      .single();

    return new Promise((resolve, reject) => {
      if (error) {
        reject(new Error(`OrderSetting single 가져오기 오류 :  ${error.message}`));
      } else {
        resolve(data);
      }
    });
  };
  return useQuery(
    [
      `OrderSetting_
  ${categoryName}`,
    ],
    handleGetOnlyOrderSetting
  );
};
// 원하는 항목 불러오기
const useGetWantOrderSetting = (wantList) => {
  const handleGetWantOrderSetting = async () => {
    const { data, error } = await supabaseClient.from('orderSetting').select(wantList.join());
    return new Promise((resolve, reject) => {
      if (error) {
        reject(new Error(`원하는 항목 불러오기 오류 :  ${error.message}`));
      } else {
        resolve(data);
      }
    });
  };
  return useQuery([`${wantList}`], handleGetWantOrderSetting);
};

// ORDER 생성
const useCreateOrderSetting = () => {
  const handleCreateOrderSetting = async (orderSettingData) => {
    const cloneData = cloneDeep(orderSettingData);
    orderSettingFor.map((itemName) => {
      if (cloneData[itemName].preview.length > 0) {
        cloneData[itemName].preview.map(async (image, idx) => {
          const { url, publicId } = await uploadImage(image, cloudFolderList.board);
          cloneData[itemName].preview[idx] = { url, publicId };
        });
      }
      return false;
    });
    const { data, error } = await supabaseClient.from('orderSetting').insert({
      categoryName: cloneData.categoryName,
      item1: cloneData.item1,
      item2: cloneData.item2,
      item3: cloneData.item3,
      item4: cloneData.item4,
      item5: cloneData.item5,
      item6: cloneData.item6,
      item7: cloneData.item7,
    });

    return new Promise((resolve, reject) => {
      if (error) {
        reject(new Error(`Order Setting 생성 오류 :  ${error.message}`));
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
    const { data, error } = await supabaseClient.from('orderSetting').select('*');
    return new Promise((resolve, reject) => {
      if (error) {
        reject(new Error(`Order Setting 불러오기 오류 :  ${error.message}`));
      } else {
        resolve(data);
      }
    });
  };
  return useQuery(gatherKeys.orderSetting, handleGetOrderSetting);
};
// ORDER 수정
const useUpdateOrderSetting = () => {
  const handleUpdateOrderSetting = async (orderSettingData) => {
    const awaitImages = [];
    const uploadImages = [];
    const cloneData = cloneDeep(orderSettingData);
    if (cloneData.delete_images?.length > 0) {
      cloneData.delete_images.map((image) => deleteImage(image));
    }
    await new Promise((resolve, reject) => {
      try {
        orderSettingFor.map((itemName) => {
          if (cloneData[itemName]) {
            cloneData[itemName].preview.map(async (item, idx) => {
              if (typeof item.image === 'object') {
                uploadImages.push(idx);
              }
              if (typeof item.image === 'object') {
                if (typeof item.publicId === 'string') {
                  deleteImage(item.publicId);
                }
                const { url, publicId } = await uploadImage(item.image, cloudFolderList.board);
                cloneData[itemName].preview[idx].image = url;
                cloneData[itemName].preview[idx].publicId = publicId;
                awaitImages.push(publicId);
              }
            });
          }
          return false;
        });
        const timer = setInterval(() => {
          if (uploadImages.length === awaitImages.length) {
            clearInterval(timer);
            resolve('완료!');
          }
        }, 100);
      } catch (e) {
        const timer = setInterval(() => {
          if (uploadImages.length === awaitImages.length) {
            awaitImages.map((publicId) => deleteImage(publicId));
            clearInterval(timer);
            reject(new Error(`오류 : ${e.message}`));
          }
        }, 100);
      }
    });

    const { data, error } = await supabaseClient
      .from('orderSetting')
      .update({
        item1: cloneData.item1,
        item2: cloneData.item2,
        item3: cloneData.item3,
        item4: cloneData.item4,
        item5: cloneData.item5,
        item6: cloneData.item6,
        item7: cloneData.item7,
      })
      .eq('id', cloneData.id);
    return new Promise((resolve, reject) => {
      if (error) {
        reject(new Error(`Order Setting 불러오기 오류 :  ${error.message}`));
      } else {
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

const useOrderSetting = () => ({
  useGetOnlyOrderSetting,
  useGetWantOrderSetting,
  useCreateOrderSetting,
  useGetOrderSetting,
  useUpdateOrderSetting,
});

export default useOrderSetting;
