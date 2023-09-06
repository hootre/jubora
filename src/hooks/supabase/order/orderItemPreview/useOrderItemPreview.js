import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import supabase_client from 'lib/supabase_client';
import { toast } from 'react-hot-toast';
import { gatherKeys } from 'utils/gatherKeys';
import { deleteImage, uploadImage } from 'utils/imageUpload/uploader';
// 특정 id 제품 상세
const useGetOnlyOrderItemPreview = (id) => {
  const handleGetOnlyOrderItemPreview = async () => {
    const { data, error } = await supabase_client
      .from('order_item_preview')
      .select('*')
      .eq('id', id)
      .single();

    return new Promise((resolve, reject) => {
      if (error) {
        reject(`OrderItemPreview single 가져오기 오류 :  ${error.message}`);
      } else {
        resolve(data);
      }
    });
  };
  return useQuery(
    [
      `orderItemPreview_
  ${id}`,
    ],
    handleGetOnlyOrderItemPreview
  );
};

// ORDER 생성
const useCreateOrderItemPreview = () => {
  const handleCreateOrderItemPreview = async ({ from_category, img, title, description }) => {
    const { url, public_id } = await uploadImage(img)
      .then((data) => data)
      .catch((error) => console.log(`주문 상세 이미지 업로드 오류 :  ${error.message}`));

    const { data, error } = await supabase_client.from('order').insert({
      from_category,
      url,
      public_id,
      title,
      description,
    });

    return new Promise((resolve, reject) => {
      if (error) {
        reject(`생성 오류 :  ${error.message}`);
      } else {
        toast.success('성공적으로 생성하였습니다');
        resolve(data);
      }
    });
  };

  const client = useQueryClient();
  return useMutation(handleCreateOrderItemPreview, {
    onSuccess: async () => {
      await client.invalidateQueries(gatherKeys.orderItemPreview);
    },
  });
};
// ORDER 목록
const useGetOrderItemPreview = () => {
  const handleGetOrderItemPreview = async () => {
    const { data, error } = await supabase_client.from('order_item_preview').select('*');
    return new Promise((resolve, reject) => {
      if (error) {
        reject(`주문상세보기 불러오기 오류 :  ${error.message}`);
      } else {
        resolve(data);
      }
    });
  };
  return useQuery(gatherKeys.orderItemPreview, handleGetOrderItemPreview);
};
// ORDER 수정
const useUpdateOrderItemPreview = () => {
  const handleUpdateOrderItemPreview = async ({
    id,
    from_category,
    img,
    title,
    description,
    prev_public_id,
  }) => {
    await deleteImage(prev_public_id);
    const { url, public_id } = await uploadImage(img)
      .then((data) => data)
      .catch((error) => console.log(`주문 상세 이미지 업로드 오류 :  ${error.message}`));
    const { data, error } = await supabase_client
      .from('order_item_preview')
      .update({
        from_category,
        url,
        public_id,
        title,
        description,
      })
      .eq('id', id);

    return new Promise((resolve, reject) => {
      if (error) {
        reject(`수정 오류 :  ${error.message}`);
      } else {
        toast.success('성공적으로 수정하였습니다');
        resolve(data);
      }
    });
  };

  const client = useQueryClient();
  return useMutation(handleUpdateOrderItemPreview, {
    onSuccess: async () => {
      await client.invalidateQueries(gatherKeys.orderItemPreview);
    },
  });
};
// Templates DELETE
const useDeleteOrderItemPreview = () => {
  const handleDeleteOrderItemPreview = async ({ id, prev_public_id }) => {
    await deleteImage(prev_public_id);
    const { data, error } = await supabase_client.from('order_item_view').delete().eq('id', id);
    return new Promise((resolve, reject) => {
      if (error) {
        reject(`수정 오류 :  ${error.message}`);
      } else {
        toast.success('성공적으로 삭제하였습니다');
        resolve(data);
      }
    });
  };
  const client = useQueryClient();
  return useMutation(handleDeleteOrderItemPreview, {
    onSuccess: () => {
      client.removeQueries(gatherKeys.orderItemPreview);
    },
  });
};
export const useOrderItemPreview = () => {
  return {
    useGetOnlyOrderItemPreview,
    useCreateOrderItemPreview,
    useGetOrderItemPreview,
    useUpdateOrderItemPreview,
    useDeleteOrderItemPreview,
  };
};
