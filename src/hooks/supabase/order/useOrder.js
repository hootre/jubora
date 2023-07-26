import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import supabase_client from 'lib/supabase-browser';
import { toast } from 'react-hot-toast';
import { gatherKeys } from 'utils/gatherKeys';
import { deleteFile, uploadFile } from 'utils/fileUpload/fileUpload';
import { redirect } from 'next/navigation';

// 특정 id 제품 상세
const useGetOnlyOrder = (id) => {
  const handleGetOnlyOrder = async () => {
    const { data, error } = await supabase_client.from('order').select('*').eq('id', id).single();

    if (error) {
      console.error(`get only order ${error.message}`);
      return;
    }
    if (data) {
      return data;
    }
  };
  return useQuery([`order_${id}`], handleGetOnlyOrder);
};

// ORDER 생성
const useCreateOrder = () => {
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
    in_out_type,
    corner_type,
    image,
    price,
    file,
  }) => {
    let fileData = null;

    if (file.length) {
      fileData = await uploadFile(file[0]);
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
      in_out_type,
      corner_type,
      password,
      image,
      price,
      file: fileData?.url,
      public_id: fileData?.public_id,
    });
    if (error) {
      toast.error(error.message);
      console.error(`ORDER CREATE ERROR : ${error.message}`);
      return;
    } else {
      toast.success('ORDER CREATE SUCCESS');
    }
    return data;
  };

  const client = useQueryClient();
  return useMutation(handleCreateOrder, {
    onSuccess: async () => {
      await client.invalidateQueries(gatherKeys.order);
    },
  });
};
// ORDER 목록
const useGetOrder = () => {
  const handleGetOrder = async () => {
    const { data, error } = await supabase_client
      .from('order')
      .select('id,writer_user_email,title,name, created_at');
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
const useUpdateOrder = () => {
  const handleUpdateOrder = async ({
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
    in_out_type,
    corner_type,
    image,
    price,
    file,
  }) => {
    await deleteFile(public_id);
    await uploadFile(file).then(async ({ url, public_id }) => {
      if (!url) {
        console.error(`Cloudinary UPLOAD ERROR`);
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
        in_out_type,
        corner_type,
        password,
        image,
        price,
        file: url,
        public_id: public_id,
      });
      if (error) {
        toast.error(error.message);
        console.error(`ORDER UPDATA ERROR : ${error.message}`);
        return;
      } else {
        toast.success('ORDER UPDATA SUCCESS');
      }
      return data;
    });
  };

  const client = useQueryClient();
  return useMutation(handleUpdateOrder, {
    onSuccess: async () => {
      await client.invalidateQueries(gatherKeys.order);
    },
  });
};
// Templates DELETE
const useDeleteOrder = () => {
  const handleDeleteOrder = async ({ id, public_id }) => {
    await deleteFile(public_id).then(async () => {
      const { data, error } = await supabase_client.from('order').delete().eq('id', id);

      if (error) {
        toast.error(error.message);
        console.error(`ORDER DELETE ERROR : ${error.message}`);
        return;
      } else {
        toast.success('ORDER DELETE SUCCESS');
      }
      return data;
    });
  };
  const client = useQueryClient();
  return useMutation(handleDeleteOrder, {
    onSuccess: () => {
      client.removeQueries(gatherKeys.template);
    },
  });
};
export const useOrder = () => {
  return {
    useGetOnlyOrder,
    useCreateOrder,
    useGetOrder,
    useUpdateOrder,
    useDeleteOrder,
  };
};
