import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import supabaseClient from 'lib/supabaseClient';
import { toast } from 'react-hot-toast';
import gatherKeys from 'utils/gatherKeys';
import cloudFolderList from 'utils/imageUpload/cloudFolderList';
import { uploadImage, deleteImage } from 'utils/imageUpload/uploader';

// 특정 id 제품 상세
const useGetOnlyOrder = (id) => {
  const handleGetOnlyOrder = async () => {
    const { data, error } = await supabaseClient.from('order').select('*').eq('id', id).single();

    return new Promise((resolve, reject) => {
      if (error) {
        reject(new Error(`특정 주문내역 :  ${error.message}`));
      } else {
        resolve(data);
      }
    });
  };
  return useQuery([`order_${id}`], handleGetOnlyOrder);
};
// 해당 user.id 제품
const useGetUserOrder = (email) => {
  const handleGetUserOrder = async () => {
    const { data, error } = await supabaseClient
      .from('order')
      .select('*')
      .eq('writerUserEmail', email);

    return new Promise((resolve, reject) => {
      if (error) {
        reject(new Error(`해당 유저 주문내역 :  ${error.message}`));
      } else {
        resolve(data);
      }
    });
  };
  return useQuery([`order_${email}`], handleGetUserOrder);
};
// ORDER 생성
const useCreateOrder = (email) => {
  const handleCreateOrder = async ({
    writerUserEmail,
    state,
    title,
    name,
    password,
    phone,
    row,
    col,
    count,
    address1,
    address2,
    address3,
    contents,
    categoryType,
    templateType,
    image,
    price,
    file,
    item1,
    item2,
    item3,
    item4,
    item5,
    item6,
    item7,
    zonecode,
  }) => {
    let fileData = null;
    if (file.length) {
      fileData = await uploadImage(file[0], cloudFolderList.order);
    }
    const { data, error } = await supabaseClient.from('order').insert({
      writerUserEmail,
      state,
      title,
      name,
      phone,
      row,
      col,
      count,
      address1,
      address2,
      address3,
      contents,
      categoryType,
      templateType,
      password,
      image,
      price,
      file: fileData?.url,
      publicId: fileData?.publicId,
      item1,
      item2,
      item3,
      item4,
      item5,
      item6,
      item7,
      zonecode,
    });
    return new Promise((resolve, reject) => {
      if (error) {
        reject(new Error(`Order 생성 오류 :  ${error.message}`));
      } else {
        toast.success('성공적으로 생성하였습니다');
        resolve(data);
      }
    });
  };

  const client = useQueryClient();
  return useMutation(handleCreateOrder, {
    onSuccess: async () => {
      await client.invalidateQueries([`order_${email}`]);
    },
  });
};
// ORDER 목록
const useGetOrder = () => {
  const handleGetOrder = async () => {
    const { data, error } = await supabaseClient
      .from('order')
      .select('id,publicId,writerUserEmail,price,state,title,name, createdAt');
    return new Promise((resolve, reject) => {
      if (error) {
        reject(new Error(`주문목록 불러오기 오류 :  ${error.message}`));
      } else {
        resolve(data);
      }
    });
  };
  return useQuery(gatherKeys.order, handleGetOrder);
};

// ORDER state -> 출력 승인
const useUpdateOrderState = (id) => {
  const handleUpdateOrderState = async () => {
    const { data, error } = await supabaseClient
      .from('order')
      .update({
        state: '출력승인',
      })
      .eq('id', id);
    return new Promise((resolve, reject) => {
      if (error) {
        reject(new Error(`주문 상태수정 오류 :  ${error.message}`));
      } else {
        toast.success('성공적으로 수정하였습니다');
        resolve(data);
      }
    });
  };

  const client = useQueryClient();
  return useMutation(handleUpdateOrderState, {
    onSuccess: async () => {
      await client.invalidateQueries([`order_${id}`]);
    },
  });
};

// ORDER 수정
const useUpdateOrder = () => {
  const handleUpdateOrder = async ({
    id,
    writerUserEmail,
    state,
    title,
    name,
    password,
    phone,
    row,
    col,
    count,
    address1,
    address2,
    address3,
    contents,
    categoryType,
    templateType,
    image,
    price,
    item1,
    item2,
    item3,
    item4,
    item5,
    item6,
    item7,
  }) => {
    const { data, error } = await supabaseClient
      .from('order')
      .update({
        writerUserEmail,
        state,
        title,
        name,
        phone,
        row,
        col,
        count,
        address1,
        address2,
        address3,
        contents,
        categoryType,
        templateType,
        password,
        image,
        price,
        item1,
        item2,
        item3,
        item4,
        item5,
        item6,
        item7,
      })
      .eq('id', id);
    return new Promise((resolve, reject) => {
      if (error) {
        reject(new Error(`주문 수정 오류 :  ${error.message}`));
      } else {
        toast.success('성공적으로 수정하였습니다');
        resolve(data);
      }
    });
  };

  const client = useQueryClient();
  return useMutation(handleUpdateOrder, {
    onSuccess: async (data, variables) => {
      await client.invalidateQueries([`order_${variables.id}`]);
    },
  });
};
// ORDER DELETE
const useDeleteOrder = () => {
  const handleDeleteOrder = async (id, publicId) => {
    if (publicId) {
      await deleteImage(publicId).then(async (res) => {
        if (res.ok) {
          const { error: sianError } = await supabaseClient.from('sian').delete().eq('orderId', id);
          if (!sianError) {
            const { error } = await supabaseClient.from('order').delete().eq('id', id);

            return new Promise((resolve, reject) => {
              if (error) {
                reject(new Error(`주문 삭제 오류 :  ${error.message}`));
              } else {
                toast.success('성공적으로 삭제하였습니다');
                resolve('성공');
              }
            });
          }
          toast.error('이미지 삭제 실패');
        }
        return false;
      });
    } else {
      const { error: sianError } = await supabaseClient.from('sian').delete().eq('orderId', id);
      if (!sianError) {
        const { error } = await supabaseClient.from('order').delete().eq('id', id);
        return new Promise((resolve, reject) => {
          if (error) {
            toast.error('주문 삭제 오류');
            reject(new Error(`주문 삭제 오류 :  ${error.message}`));
          } else {
            toast.success('성공적으로 삭제하였습니다');
            resolve('성공');
          }
        });
      }
    }
    return false;
  };
  const client = useQueryClient();
  return useMutation(handleDeleteOrder, {
    onSuccess: () => {
      client.removeQueries(gatherKeys.order);
    },
  });
};
const useOrder = () => ({
  useGetOnlyOrder,
  useGetUserOrder,
  useCreateOrder,
  useGetOrder,
  useUpdateOrderState,
  useUpdateOrder,
  useDeleteOrder,
});

export default useOrder;
