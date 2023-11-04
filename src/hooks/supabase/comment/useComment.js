import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import supabase_client from 'lib/supabase_client';
import { toast } from 'react-hot-toast';
import { gatherKeys } from 'utils/gatherKeys';
import { deleteImage, uploadImage } from 'utils/imageUpload/uploader';
import { cloudFolderList } from 'utils/imageUpload/cloudFolderList';

// Comment 생성
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
    return new Promise((resolve, reject) => {
      if (error) {
        reject(`댓글 작성 오류 :  ${error.message}`);
      } else {
        toast.success('성공적으로 작성하였습니다');
        resolve(data);
      }
    });
  };

  const client = useQueryClient();
  return useMutation(handleCreateComment, {
    onSuccess: (data, variables) => {
      client.invalidateQueries([`comment_${variables.from_table_id}`]);
    },
  });
};
// Comment 목록
const useGetComment = (from_table, from_table_id) => {
  const handleGetComment = async () => {
    const { data, error } = await supabase_client
      .from('comment')
      .select('*')
      .eq('from_table', from_table)
      .eq('from_table_id', from_table_id);

    return new Promise((resolve, reject) => {
      if (error) {
        reject(`Comment 가져오기 오류 :  ${error.message}`);
      } else {
        resolve(data);
      }
    });
  };
  return useQuery([`comment_${from_table_id}`], handleGetComment);
};
// Comment 수정
const useUpdateComment = () => {
  const handleUpdateComment = async ({
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
    await uploadImage(file, cloudFolderList.Comment).then(async ({ url, public_id }) => {
      if (!url) {
        console.error(`Cloudinary UPLOAD ERROR`);
      }
      const { data, error } = await supabase_client.from('Comment').insert({
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
        console.error(`Comment UPDATA ERROR : ${error.message}`);
        return;
      } else {
        toast.success('Comment UPDATA SUCCESS');
      }
      return data;
    });
  };

  const client = useQueryClient();
  return useMutation(handleUpdateComment, {
    onSuccess: () => {
      client.invalidateQueries(gatherKeys.Comment);
    },
  });
};
// Templates DELETE
const useDeleteComment = () => {
  const handleDeleteComment = async ({ id, from_table_id }) => {
    const { data, error } = await supabase_client.from('comment').delete().eq('id', id);
    return new Promise((resolve, reject) => {
      if (error) {
        reject(`댓글 삭제 오류 :  ${error.message}`);
      } else {
        toast.success('성공적으로 삭제하였습니다');
        resolve(data);
      }
    });
  };
  const client = useQueryClient();
  return useMutation(handleDeleteComment, {
    onSuccess: (data, variables) => {
      client.invalidateQueries([`comment_${variables.from_table_id}`]);
    },
  });
};
export const useComment = () => {
  return {
    useCreateComment,
    useGetComment,
    useDeleteComment,
  };
};
