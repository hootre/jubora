import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import supabase_client from 'lib/supabase_client';
import { toast } from 'react-hot-toast';
import { gatherKeys } from 'utils/gatherKeys';
import { cloudFolderList } from 'utils/imageUpload/cloudFolderList';
import { uploadImage, deleteImage } from 'utils/imageUpload/uploader';

// 특정 id 제품 상세
const useGetOnlyOrder = (id) => {
  const handleGetOnlyOrder = async () => {
    const { data, error } = await supabase_client.from('order').select('*').eq('id', id).single();

    return new Promise((resolve, reject) => {
      if (error) {
        reject(`특정 주문내역 :  ${error.message}`);
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
    const { data, error } = await supabase_client
      .from('order')
      .select('*')
      .eq('writer_user_email', email);

    return new Promise((resolve, reject) => {
      if (error) {
        reject(`해당 유저 주문내역 :  ${error.message}`);
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
    writer_user_email,
    state,
    title,
    name,
    password,
    phone,
    row,
    col,
    count,
    address_1,
    address_2,
    address_3,
    contents,
    category_type,
    template_type,
    image,
    price,
    file,
    item_1,
    item_2,
    item_3,
    item_4,
    item_5,
    item_6,
    item_7,
  }) => {
    let fileData = null;
    if (file.length) {
      fileData = await uploadImage(file[0], cloudFolderList.order);
    }
    const { data, error } = await supabase_client.from('order').insert({
      writer_user_email,
      state,
      title,
      name,
      phone,
      row,
      col,
      count,
      address_1,
      address_2,
      address_3,
      contents,
      category_type,
      template_type,
      password,
      image,
      price,
      file: fileData?.url,
      public_id: fileData?.public_id,
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
        reject(`Order 생성 오류 :  ${error.message}`);
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
    const { data, error } = await supabase_client
      .from('order')
      .select('id,public_id,writer_user_email,price,state,title,name, created_at');
    if (error) {
      toast.error(error.message);
      console.error(`ORDER REDE ERROR : ${error.message}`);
      return [];
    }
    return data;
  };
  return useQuery(gatherKeys.order, handleGetOrder);
};
// ORDER 수정
const useUpdateOrder = (id) => {
  const handleUpdateOrder = async ({
    id,
    writer_user_email,
    state,
    title,
    name,
    password,
    phone,
    row,
    col,
    count,
    address_1,
    address_2,
    address_3,
    contents,
    category_type,
    template_type,
    image,
    price,
    item_1,
    item_2,
    item_3,
    item_4,
    item_5,
    item_6,
    item_7,
  }) => {
    const { data, error } = await supabase_client
      .from('order')
      .update({
        writer_user_email,
        state,
        title,
        name,
        phone,
        row,
        col,
        count,
        address_1,
        address_2,
        address_3,
        contents,
        category_type,
        template_type,
        password,
        image,
        price,
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
        reject(`주문 수정 오류 :  ${error.message}`);
      } else {
        toast.success('성공적으로 수정하였습니다');
        resolve(data);
      }
    });
  };

  const client = useQueryClient();
  return useMutation(handleUpdateOrder, {
    onSuccess: async () => {
      await client.invalidateQueries([`order_${id}`]);
    },
  });
};
// ORDER DELETE
const useDeleteOrder = () => {
  const handleDeleteOrder = async (id, public_id) => {
    if (public_id) {
      await deleteImage(public_id).then(async (res) => {
        if (res.ok) {
          const { error: sianError } = await supabase_client
            .from('sian')
            .delete()
            .eq('order_id', id);
          if (!sianError) {
            const { error } = await supabase_client.from('order').delete().eq('id', id);

            return new Promise((resolve, reject) => {
              if (error) {
                reject(`주문 삭제 오류 :  ${error.message}`);
              } else {
                toast.success('성공적으로 삭제하였습니다');
                resolve('성공');
              }
            });
          } else {
            toast.error('이미지 삭제 실패');
          }
        }
      });
    } else {
      const { error: sianError } = await supabase_client.from('sian').delete().eq('order_id', id);
      if (!sianError) {
        const { error } = await supabase_client.from('order').delete().eq('id', id);
        return new Promise((resolve, reject) => {
          if (error) {
            toast.error('주문 삭제 오류');
            reject(`주문 삭제 오류 :  ${error.message}`);
          } else {
            console.log(error);
            toast.success('성공적으로 삭제하였습니다');
            resolve('성공');
          }
        });
      }
    }
  };
  const client = useQueryClient();
  return useMutation(handleDeleteOrder, {
    onSuccess: () => {
      client.removeQueries(gatherKeys.order);
    },
  });
};
export const useOrder = () => {
  return {
    useGetOnlyOrder,
    useGetUserOrder,
    useCreateOrder,
    useGetOrder,
    useUpdateOrder,
    useDeleteOrder,
  };
};
