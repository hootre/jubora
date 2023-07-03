import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteImage, uploadImage } from 'hooks/imageUpload/uploader';
import supabase_client from 'lib/supabase-browser';
import { toast } from 'react-hot-toast';
import { gatherKeys } from 'utils/gatherKeys';

// 카테고리 목록
const useGetCategory = () => {
  const handleGetCategory = async () => {
    const { data, error } = await supabase_client.from('templates_category_list').select('*');
    if (error) {
      console.error(`category get error : ${error.message}`);
      return;
    }
    return data;
  };
  return useQuery(gatherKeys.categoryList, handleGetCategory);
};
// 특정 제품 목록
const useGetTemplates = (category) => {
  const handleGetTemplates = async () => {
    const { data, error } = await supabase_client
      .from('products')
      .select('*')
      .eq('category', category);

    if (error) {
      console.error(`get category template ${error.message}`);
      return;
    }
    if (data) {
      return data;
    }
  };
  return useQuery([category], handleGetTemplates);
};

// Templates CREATE
const useCreateTemplates = () => {
  const handleCreateTemplate = async ({ file, title, category, type, tag }) => {
    await uploadImage(file).then(async ({ url, public_id }) => {
      if (!url) {
        console.error(`Cloudinary UPLOAD ERROR`);
      }
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
    });
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
  const handleDeleteTemplate = async ({ id, category, public_id }) => {
    await deleteImage(public_id).then(async () => {
      const { data, error } = await supabase_client.from(category).delete().eq('id', id);

      if (error) {
        toast.error(error.message);
        console.error(`Templates DELETE ERROR : ${error.message}`);
        return;
      } else {
        toast.success('Templates DELETE SUCCESS');
      }
      return data;
    });
  };
  const client = useQueryClient();
  return useMutation(handleDeleteTemplate, {
    onSuccess: () => {
      client.removeQueries(gatherKeys.template);
    },
  });
};
export const useTemplates = () => {
  return {
    useGetCategory,
    useGetTemplates,
    useCreateTemplates,
    useGetALLTemplates,
    useUpdateTemplates,
    useDeleteTemplates,
  };
};
