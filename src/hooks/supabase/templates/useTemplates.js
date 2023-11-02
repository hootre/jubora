import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteImage, uploadImage } from 'utils/imageUpload/uploader';
import supabase_client from 'lib/supabase_client';
import { toast } from 'react-hot-toast';
import { gatherKeys } from 'utils/gatherKeys';
import { cloudFolderList } from 'utils/imageUpload/cloudFolderList';

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
        resolve(data.sort((a, b) => b.id - a.id));
      }
    });
  };
  return useQuery([`templates_${id}`], handleGetOnlyTemplate);
};
// 특정 id 조회수 증가
const useUpdateView = (views, id) => {
  const handleUpdateView = async () => {
    const { data, error } = await supabase_server
      .from('templates')
      .update({ views: ++views })
      .eq('id', id);
    return new Promise((resolve, reject) => {
      if (error) {
        reject(`조회수증가 오류 :  ${error.message}`);
      } else {
        resolve(data);
      }
    });
  };
  return useMutation(handleUpdateView, {
    onSuccess: async () => {
      await client.invalidateQueries([`templates_${id}`]);
    },
  });
};
// 특정 category 목록
const useGetCategoryTemplate = (bannerState) => {
  const handleGetCategoryTemplate = async () => {
    const { data, error } = await supabase_client
      .from('templates')
      .select('*')
      .eq('bannerState', bannerState);
    return new Promise((resolve, reject) => {
      if (error) {
        reject(`제품 상제 불러오기 오류 :  ${error.message}`);
      } else {
        resolve(data.sort((a, b) => b.id - a.id));
      }
    });
  };
  return useQuery([category], handleGetCategoryTemplate);
};
// 제품 페이지네이션을 위한 로드
const useGetTemplatesPage = (bannerState, pageNum) => {
  const handleGetTemplatesPage = async () => {
    const { data, error } = await supabase_client
      .from('templates')
      .select('*')
      .eq('bannerState', bannerState)
      .range((pageNum - 1) * 50, pageNum * 50);
    return new Promise((resolve, reject) => {
      if (error) {
        reject(`해당 페이지 제품 불러오기 오류 :  ${error.message}`);
      } else {
        resolve(data.sort((a, b) => b.id - a.id));
      }
    });
  };
  return useQuery(gatherKeys.templates_page, handleGetTemplatesPage);
};
// 제품목록 6개만 가져오기
const useGetSixTemplates = () => {
  const handleGetSixTemplates = async () => {
    const { data, error } = await supabase_client
      .from('templates')
      .select('*')
      .eq('bannerState', 'banner')
      .range(0, 6);
    return new Promise((resolve, reject) => {
      if (error) {
        reject(`제품목록 6개 불러오기 오류 :  ${error.message}`);
      } else {
        resolve(data.sort((a, b) => b.id - a.id));
      }
    });
  };
  return useQuery(gatherKeys.templates_six, handleGetSixTemplates);
};
// 해당하는 카테고리 개수 가져오기
const useGetCategoryCount = (bannerState) => {
  const handleGetCategoryCount = async () => {
    const { data, error } = await supabase_client
      .from('templates')
      .select('id')
      .eq('bannerState', bannerState);
    return new Promise((resolve, reject) => {
      if (error) {
        reject(`제품목록 불러오기 오류 :  ${error.message}`);
      } else {
        resolve(data.sort((a, b) => b.id - a.id));
      }
    });
  };
  return useQuery(gatherKeys.templates_count, handleGetCategoryCount);
};
// 제품목록 가져오기
const useGetTemplates = () => {
  const handleGetTemplates = async () => {
    const { data, error } = await supabase_client.from('templates').select('*');
    return new Promise((resolve, reject) => {
      if (error) {
        reject(`제품목록 불러오기 오류 :  ${error.message}`);
      } else {
        resolve(data.sort((a, b) => b.id - a.id));
      }
    });
  };
  return useQuery(gatherKeys.templates, handleGetTemplates);
};

// 제품 생성
// category -> 태그 목록 bannerState -> 가로, 세로
const useCreateTemplate = () => {
  const handleCreateTemplate = async ({
    bannerState,
    categoryName,
    img_row,
    img_col,
    img_square,
    category,
  }) => {
    const randomText = Math.random().toString(16).substring(2, 8);
    const title = `${categoryName}_${randomText}`;
    const categoryList = { list: [...category] };
    if (bannerState === 'banner') {
      const { url: img_url_row, public_id: public_id_row } = await uploadImage(
        img_row[0],
        cloudFolderList.templates
      );
      const { url: img_url_col, public_id: public_id_col } = await uploadImage(
        img_col[0],
        cloudFolderList.templates
      );
      const { url: img_url_square, public_id: public_id_square } = await uploadImage(
        img_square[0],
        cloudFolderList.templates
      );
      const { data, error } = await supabase_client.from('templates').insert({
        bannerState,
        categoryName,
        img_row: img_url_row,
        img_col: img_url_col,
        img_square: img_url_square,
        public_id_row,
        public_id_col,
        public_id_square,
        title,
        category: categoryList,
        views: 0,
        sales: 0,
      });

      return new Promise(async (resolve, reject) => {
        // code 23502 title ㅜnull
        if (error) {
          await deleteImage(public_id_row);
          await deleteImage(public_id_col);
          await deleteImage(public_id_square);
          toast.error(`CODE : ${error.code}`);
          reject(`생성 오류 :  ${error.message}`);
        } else {
          toast.success('성공적으로 생성하였습니다');
          resolve(data);
        }
      });
    } else {
      const { url: img_url_row, public_id: public_id_row } = await uploadImage(
        img_row[0],
        cloudFolderList.templates
      );
      const { data, error } = await supabase_client.from('templates').insert({
        bannerState,
        categoryName,
        img_row: img_url_row,
        public_id_row,
        title,
        category: categoryList,
        views: 0,
        sales: 0,
      });

      return new Promise(async (resolve, reject) => {
        if (error) {
          await deleteImage(public_id_row);
          reject(`생성 오류 :  ${error.message}`);
        } else {
          toast.success('성공적으로 생성하였습니다');
          resolve(data);
        }
      });
    }
  };

  const client = useQueryClient();
  return useMutation(handleCreateTemplate, {
    onSuccess: async () => {
      await client.invalidateQueries(gatherKeys.templates);
    },
  });
};
// Templates UPDATE
const useUpdateTemplates = () => {
  const handleUpdateTemplate = async ({ file, title, category, type, tag, public_id }) => {
    await deleteImage(public_id).then();
    await uploadImage(file, cloudFolderList.templates).then(async ({ url, public_id }) => {
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
      await client.invalidateQueries(gatherKeys.templates);
      await client.invalidateQueries(gatherKeys.templates_six);
    },
  });
};
// Templates DELETE
const useDeleteTemplates = () => {
  const handleDeleteTemplate = async ({ id, images }) => {
    const imgList = images.filter((item) => !!item);
    if (imgList.length > 0) {
      imgList.map(async (public_id) => {
        await deleteImage(public_id);
      });
    }
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
  };
  const client = useQueryClient();
  return useMutation(handleDeleteTemplate, {
    onSuccess: () => {
      client.invalidateQueries(gatherKeys.templates);
    },
  });
};
export const useTemplates = () => {
  return {
    useGetOnlyTemplate,
    useGetCategoryTemplate,
    useGetTemplatesPage,
    useUpdateView,
    useGetCategoryCount,
    useGetSixTemplates,
    useGetTemplates,
    useCreateTemplate,
    useDeleteTemplates,
  };
};
