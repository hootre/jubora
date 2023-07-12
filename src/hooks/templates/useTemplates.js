import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteImage, uploadImage } from 'utils/imageUpload/uploader';
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
// 카테고리 제품 목록
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
// 특정 id 제품 상세
const useGetOnlyTemplates = (id) => {
  const handleGetOnlyTemplates = async () => {
    const { data, error } = await supabase_client
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error(`get only template ${error.message}`);
      return;
    }
    if (data) {
      return data;
    }
  };
  return useQuery([`templates_${id}`], handleGetOnlyTemplates);
};
// 메인 제품목록 6개
const useGetSixTemplates = (category) => {
  const handleGetSixTemplates = async () => {
    const { data, error } = await supabase_client
      .from('products')
      .select('*')
      .eq('category', category);
    if (error) {
      console.error(`get six category template ${error.message}`);
      return;
    }
    if (data) {
      return data;
    }
  };
  return useQuery([`six_${category}`], handleGetSixTemplates);
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
    useGetOnlyTemplates,
    useGetSixTemplates,
    useCreateTemplates,
    useGetALLTemplates,
    useUpdateTemplates,
    useDeleteTemplates,
  };
};
