import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteImage, uploadImage } from 'hooks/imageUpload/uploader';
import supabase_client from 'lib/supabase-browser';
import { toast } from 'react-hot-toast';
import { gatherKeys } from 'utils/gatherKeys';

// Templates CREATE
const useCreateTemplates = () => {
  const handleCreateTemplate = async ({ file, title, category, type, tag }) => {
    await uploadImage(file).then(async ({ url, public_id }) => {
      if (!url) {
        throw console.log(`Cloudinary UPLOAD ERROR`);
      }
      const { data, error } = await supabase_client.from(category).insert({
        title,
        type,
        tag,
        file: url,
        type,
        public_id,
        category,
      });
      if (error) {
        switch (error.message) {
          default:
            toast.error(error.message);
            throw console.log(`Templates CREATE ERROR : ${error.message}`);
        }
      } else {
        toast.success('Templates CREATE SUCCESS');
      }
      return data;
    });
  };

  const client = useQueryClient();
  return useMutation(handleCreateTemplate, {
    onSuccess: async () => {
      await client.invalidateQueries(gatherKeys.template_all);
    },
  });
};
// Templates REDE
const useGetTemplates = () => {
  const handleGetTemplates = async () => {
    const { data } = await supabase_client.from('templates_category_list').select('category_table');
    if (data) {
      const text = `${data.map((item) => {
        return `${item.category_table}(*)`;
      })}`;

      const { data: templatesList, error } = await supabase_client
        .from('templates_category_list')
        .select(text);
      if (error) {
        throw console.log(`Templates REDE ERROR : ${error.message}`);
      }
      const tableAllList = [];
      templatesList.map((table) => {
        Object.values(table).map((item) => {
          if (item.length != 0) {
            tableAllList.push(...item);
          }
        });
      });
      return tableAllList.sort((a, b) => b.id - a.id);
    }
    if (!data) {
      return [];
    }
  };
  return useQuery(gatherKeys.template_all, handleGetTemplates);
};
// Templates UPDATE
const useUpdateTemplates = () => {
  const handleUpdateTemplate = async ({ file, title, category, type, tag }) => {
    await uploadImage(file).then(async ({ url, public_id }) => {
      if (!url) {
        throw console.log(`Cloudinary UPLOAD ERROR`);
      }
      const { data, error } = await supabase_client.from(category).update({
        title,
        type,
        tag,
        file: url,
        type,
        public_id,
        category,
      });
      if (error) {
        switch (error.message) {
          default:
            toast.error(error.message);
            throw console.log(`Templates UPDATE ERROR : ${error.message}`);
        }
      } else {
        toast.success('Templates UPDATE SUCCESS');
      }
      return data;
    });
  };

  const client = useQueryClient();
  return useMutation(handleUpdateTemplate, {
    onSuccess: async () => {
      await client.invalidateQueries(gatherKeys.template_all);
    },
  });
};
// Templates DELETE
const useDeleteTemplates = () => {
  const handleDeleteTemplate = async ({ id, category, public_id }) => {
    await deleteImage(public_id).then(async () => {
      const { data, error } = await supabase_client.from(category).delete().eq('id', id);

      if (error) {
        switch (error.message) {
          default:
            toast.error(error.message);
            throw console.log(`Templates DELETE ERROR : ${error.message}`);
        }
      } else {
        toast.success('Templates DELETE SUCCESS');
      }
      return data;
    });
  };
  const client = useQueryClient();
  return useMutation(handleDeleteTemplate, {
    onSuccess: () => {
      client.removeQueries(gatherKeys.template_all);
    },
  });
};
export const Templates = () => {
  return { useCreateTemplates, useGetTemplates, useUpdateTemplates, useDeleteTemplates };
};
