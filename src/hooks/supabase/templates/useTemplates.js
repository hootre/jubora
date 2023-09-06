import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteImage, uploadImage } from 'utils/imageUpload/uploader';
import supabase_client from 'lib/supabase_client';
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
  return useQuery([`templates_${id}`], handleGetOnlyTemplate);
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
// 제품목록 6개만 가져오기
const useGetSixTemplates = () => {
  const handleGetSixTemplates = async () => {
    const { data, error } = await supabase_client.from('templates').select('*').range(0, 6);
    return new Promise((resolve, reject) => {
      if (error) {
        reject(`제품목록 6개 불러오기 오류 :  ${error.message}`);
      } else {
        resolve(data);
      }
    });
  };
  return useQuery(gatherKeys.templates_six, handleGetSixTemplates);
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
  return useQuery(gatherKeys.templates, handleGetTemplates);
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
    const { data, error } = await supabase_client.from('templates').select('*');
    if (error) {
      toast.error(error.message);
      console.error(`templates REDE ERROR : ${error.message}`);
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
      const { data, error } = await supabase_client.from('templates').update({
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
    if (public_id) {
      await deleteImage(public_id).then(async (res) => {
        if (res.ok) {
          const { error } = await supabase_client.from('templates').delete().eq('id', id);

          return new Promise((resolve, reject) => {
            if (error) {
              toast.error('제품 삭제 오류');
              reject(`제품 삭제 오류 :  ${error.message}`);
            } else {
              console.log(error);
              toast.success('성공적으로 삭제하였습니다');
              resolve('성공');
            }
          });
        } else {
          toast.error('제품 이미지 삭제 실패');
        }
      });
    } else {
      const { error } = await supabase_client.from('templates').delete().eq('id', id);

      return new Promise((resolve, reject) => {
        if (error) {
          toast.error('제품 삭제 오류');
          reject(`제품 삭제 오류 :  ${error.message}`);
        } else {
          console.log(error);
          toast.success('성공적으로 삭제하였습니다');
          resolve('성공');
        }
      });
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
    useGetSixTemplates,
    useGetTemplates,
    useCreateTemplate,
    useDeleteTemplates,
  };
};
