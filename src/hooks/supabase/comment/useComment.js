import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import supabase_client from 'lib/supabase_client';
import { toast } from 'react-hot-toast';
import { gatherKeys } from 'utils/gatherKeys';
import { deleteImage, uploadImage } from 'utils/imageUpload/uploader';
import { cloudFolderList } from 'utils/imageUpload/cloudFolderList';

// ORDER 생성
const useCreateComment = () => {
  const handleCreateComment = async ({
    from_table,
    from_table_id,
    from_comment,
    writer,
    contents,
  }) => {
    const { data, error } = await supabase_client.from('comment').insert({
      from_table,
      from_table_id,
      from_comment,
      writer,
      contents,
    });
    if (error) {
      toast.error(error.message);
      console.error(`Comment CREATE ERROR : ${error.message}`);
      return;
    } else {
      toast.success('Comment CREATE SUCCESS');
    }
    return data;
  };

  const client = useQueryClient();
  return useMutation(handleCreateComment, {
    onSuccess: async () => {
      await client.invalidateQueries(gatherKeys.comment);
    },
  });
};
// ORDER 목록
const useGetComment = (from_table, from_table_id) => {
  const handleGetComment = async () => {
    console.log(from_table);
    const { data, error } = await supabase_client
      .from('comment')
      .select('*')
      .eq('from_table', from_table)
      .eq('from_table_id', from_table_id);

    if (error) {
      console.error(`comment REDE ERROR : ${error.message}`);
      return [];
    }
    return data;
  };
  return useQuery([`comment_${from_table_id}`], handleGetComment);
};
// ORDER 수정
const useUpdateOrder = () => {
  const handleUpdateOrder = async ({
    isUser,
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
    await deleteImage(public_id);
    await uploadImage(file, cloudFolderList.order).then(async ({ url, public_id }) => {
      if (!url) {
        console.error(`Cloudinary UPLOAD ERROR`);
      }
      const { data, error } = await supabase_client.from('order').insert({
        isUser,
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
    await deleteImage(public_id).then(async () => {
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
export const useComment = () => {
  return {
    useCreateComment,
    useGetComment,
  };
};
