import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteImage, uploadImage } from 'utils/imageUpload/uploader';
import supabase_client from 'lib/supabase-browser';
import { toast } from 'react-hot-toast';
import { gatherKeys } from 'utils/gatherKeys';

// 특정 id 제품 상세
const useGetOnlyTemplate = (id) => {
  const handleGetOnlyTemplate = async () => {
    const { data, error } = await supabase_client
      .from('templates')
      .select('*')
      .eq('id', id)
      .single();
    return new Promise((resolve, reject) => {
      if (error) {
        reject(`제품 상제 불러오기 오류 :  ${error.message}`);
      } else {
        resolve(data);
      }
    });
  };
  return useQuery([`banner_${id}`], handleGetOnlyTemplate);
};
// 특정 category 목록
const useGetCategoryTemplate = (category) => {
  const handleGetCategoryTemplate = async () => {
    const { data, error } = await supabase_client
      .from('templates')
      .select('*')
      .eq('category', category);
    return new Promise((resolve, reject) => {
      if (error) {
        reject(`제품 상제 불러오기 오류 :  ${error.message}`);
      } else {
        resolve(data);
      }
    });
  };
  return useQuery([category], handleGetCategoryTemplate);
};
// 제품목록 가져오기
const useGetTemplates = () => {
  const handleGetTemplates = async () => {
    const { data, error } = await supabase_client.from('templates').select('*');
    return new Promise((resolve, reject) => {
      if (error) {
        reject(`제품목록 불러오기 오류 :  ${error.message}`);
      } else {
        resolve(data);
      }
    });
  };
  return useQuery(gatherKeys.banner, handleGetTemplates);
};
// 제품 생성
const useCreateTemplate = () => {
  const handleCreateTemplate = async ({
    category,
    img_row,
    img_col,
    img_square,
    title,
    tag,
    tag_detail,
  }) => {
    const { url: img_url_row, public_id: public_id_row } = await uploadImage(img_row)
      .then((data) => data)
      .catch((error) => console.log(`가로형 이미지 업로드 오류 :  ${error.message}`));

    const { url: img_url_col, public_id: public_id_col } = await uploadImage(img_col)
      .then((data) => data)
      .catch((error) => console.log(`세로형 이미지 업로드 오류 :  ${error.message}`));
    const { url: img_url_square, public_id: public_id_square } = await uploadImage(img_square)
      .then((data) => data)
      .catch((error) => console.log(`포스터형 이미지 업로드 오류 :  ${error.message}`));
    const { data, error } = await supabase_client.from('templates').insert({
      category,
      img_row: img_url_row,
      img_col: img_url_col,
      img_square: img_url_square,
      public_id_row,
      public_id_col,
      public_id_square,
      title,
      tag,
      tag_detail,
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
  return useMutation(handleCreateTemplate, {
    onSuccess: async () => {
      await client.invalidateQueries(gatherKeys.templates);
    },
  });
};
// Templates ALL REDE
const useGetALLTemplates = () => {
  const handleGetTemplates = async () => {
    const { data, error } = await supabase_client.from('products').select('*');
    if (error) {
      toast.error(error.message);
      console.error(`products REDE ERROR : ${error.message}`);
      return;
    }
    return data;
  };
  return useQuery(gatherKeys.template, handleGetTemplates);
};
// Templates UPDATE
const useUpdateTemplates = () => {
  const handleUpdateTemplate = async ({ file, title, category, type, tag, public_id }) => {
    await deleteImage(public_id).then();
    await uploadImage(file).then(async ({ url, public_id }) => {
      if (!url) {
        console.error(`Cloudinary UPLOAD ERROR`);
      }
      const { data, error } = await supabase_client.from('products').update({
        title,
        type,
        tag,
        file: url,
        type,
        public_id,
        category,
      });
      if (error) {
        toast.error(error.message);
        console.error(`Templates UPDATE ERROR : ${error.message}`);
        return;
      } else {
        toast.success('Templates UPDATE SUCCESS');
      }
      return data;
    });
  };

  const client = useQueryClient();
  return useMutation(handleUpdateTemplate, {
    onSuccess: async () => {
      await client.invalidateQueries(gatherKeys.template);
    },
  });
};
// Templates DELETE
const useDeleteTemplates = () => {
  const handleDeleteTemplate = async ({ id, public_id }) => {
    await deleteImage(public_id)
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
    const { data, error } = await supabase_client.from('products').delete().eq('id', id);

    if (error) {
      toast.error(error.message);
      console.error(`Templates DELETE ERROR : ${error.message}`);
      return false;
    } else {
      toast.success('Templates DELETE SUCCESS');
      return true;
    }
  };
  const client = useQueryClient();
  return useMutation(handleDeleteTemplate, {
    onSuccess: () => {
      client.invalidateQueries(gatherKeys.template);
    },
  });
};
export const useTemplates = () => {
  return {
    useGetOnlyTemplate,
    useGetCategoryTemplate,
    useGetTemplates,
    useCreateTemplate,
  };
};
