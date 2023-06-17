import { useQuery } from '@tanstack/react-query';
import { uploadImage } from 'hooks/imageUpload/uploader';
import supabase_client from 'lib/supabase-browser';
import { toast } from 'react-hot-toast';
import { gatherKeys } from 'utils/gatherKeys';

// Templates 불러오기
const useGetTemplates = async () => {
  const getTemplates = async () => {
    const { data } = await supabase_client.from('templates_category_list').select('category_table');
    if (data) {
      const text = `category_table,${data.map((item) => {
        return `${item.category_table}(*)`;
      })}`;
      console.log(text);

      const { data: templatesList, error } = await supabase_client
        .from('templates_category_list')
        .select(text);
      if (error) {
        throw console.log(`Templates 불러오기 : ${error.message}`);
      }
      console.log(templatesList);
      return templatesList;
    }
    if (!data) {
      return [];
    }
  };
  return useQuery(gatherKeys.template_all, () => getTemplates());
};
// Templates 생성
const createTemplates = async ({ file, title, category, type, tag }) => {
  await uploadImage(file) //
    .then(async ({ url, public_id }) => {
      if (!url) {
        throw console.log(`Cloudinary 업로드 오류`);
      }
      const { data, error } = await supabase_client.from(category).insert({
        title,
        type,
        tag,
        image: url,
        type,
        public_id,
        category,
      });
      if (error) {
        switch (error.message) {
          default:
            toast.error(error.message);
            throw console.log(`Templates 생성 오류 : ${error.message}`);
        }
      } else {
        toast.success('Templates 등록 완료');
      }
      return data;
    });
};
// Templates 삭제
const deleteTemplates = async (templateId) => {
  await uploadImage(file) //
    .then(async ({ url, public_id }) => {
      const { data, error } = await supabase_client.from(category).insert({
        title,
        type,
        tag,
        image: url,
        type,
        public_id,
      });
      if (error) {
        switch (error.message) {
          default:
            toast.error(error.message);
            throw console.log(`Templates 생성 오류 : ${error.message}`);
        }
      } else {
        toast.success('Templates 등록 완료');
      }
      return data;
    });
};
export const Templates = () => {
  return { useGetTemplates, createTemplates, deleteTemplates };
};
