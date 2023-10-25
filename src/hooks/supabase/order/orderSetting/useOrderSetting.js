import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import supabase_client from 'lib/supabase_client';
import { toast } from 'react-hot-toast';
import { gatherKeys } from 'utils/gatherKeys';

// 특정 type 제품 상세
const useGetOnlyOrderSetting = (type) => {
  const handleGetOnlyOrderSetting = async () => {
    const { data, error } = await supabase_client
      .from('orderSetting')
      .select('*')
      .eq('type', type)
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
  ${type}`,
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
  const handleCreateOrderSetting = async ({
    category_name,
    item_1,
    item_2,
    item_3,
    item_4,
    item_5,
    item_6,
    item_7,
  }) => {
    const { data, error } = await supabase_client.from('orderSetting').insert({
      category_name,
      item_1,
      item_2,
      item_3,
      item_4,
      item_5,
      item_6,
      item_7,
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
  const handleUpdateOrderSetting = async ({
    id,
    category_name,
    item_1,
    item_2,
    item_3,
    item_4,
    item_5,
    item_6,
    item_7,
  }) => {
    const { data, error } = await supabase_client
      .from('orderSetting')
      .update({
        category_name,
        item_1,
        item_2,
        item_3,
        item_4,
        item_5,
        item_6,
        item_7,
      })
      .eq('id', id);

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
