import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteImage, uploadImage } from 'utils/imageUpload/uploader';
import supabase_client from 'lib/supabase_client';
import { toast } from 'react-hot-toast';
import { gatherKeys } from 'utils/gatherKeys';

// 제품목록 가져오기
const useGetProductsTag = () => {
  const handleGetuseGetProductsTag = async () => {
    const { data, error } = await supabase_client.from('products_tag').select('*');
    return new Promise((resolve, reject) => {
      if (error) {
        reject(`제품 TAG 불러오기 실패 :  ${error.message}`);
      } else {
        resolve(data);
      }
    });
  };
  return useQuery(gatherKeys.productsTag, handleGetuseGetProductsTag);
};
// 제품 생성
const useCreateBanner = () => {
  const handleCreateBanner = async ({ file, title, category, type, tag }) => {
    const { url: img_row, public_id: public_id_row } = await uploadImage(file).then(
      async ({ url, public_id }) => {
        if (!url) {
          console.error(`Cloudinary UPLOAD ERROR`);
        } else {
          return { url, public_id };
        }
      }
    );
    const { data, error } = await supabase_client.from('products').insert({
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
      console.error(`products CREATE ERROR : ${error.message}`);
      return;
    } else {
      toast.success('products CREATE SUCCESS');
    }
    return data;
  };

  const client = useQueryClient();
  return useMutation(handleCreateTemplate, {
    onSuccess: async () => {
      await client.invalidateQueries(gatherKeys.template);
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
export const useProductsTag = () => {
  return {
    useGetProductsTag,
  };
};
