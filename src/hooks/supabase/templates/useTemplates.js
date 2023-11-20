'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteImage, uploadImage } from 'utils/imageUpload/uploader';
import supabaseClient from 'lib/supabaseClient';
import { toast } from 'react-hot-toast';
import gatherKeys from 'utils/gatherKeys';
import cloudFolderList from 'utils/imageUpload/cloudFolderList';

// 특정 id 제품 상세
const useGetOnlyTemplate = (id) => {
  const handleGetOnlyTemplate = async () => {
    const { data, error } = await supabaseClient
      .from('templates')
      .select('*')
      .eq('id', id)
      .single();
    return new Promise((resolve, reject) => {
      if (error) {
        reject(new Error(`제품 상제 불러오기 오류 :  ${error.message}`));
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
    let countViews = views;
    const { data, error } = await supabaseClient
      .from('templates')
      .update({ views: (countViews += 1) })
      .eq('id', id);
    return new Promise((resolve, reject) => {
      if (error) {
        reject(new Error(`조회수증가 오류 :  ${error.message}`));
      } else {
        resolve(data);
      }
    });
  };
  const client = useQueryClient();
  return useMutation(handleUpdateView, {
    onSuccess: async () => {
      await client.invalidateQueries([`templates_${id}`]);
    },
  });
};
// 특정 category 목록
const useGetCategoryTemplate = (bannerState) => {
  const handleGetCategoryTemplate = async () => {
    const { data, error } = await supabaseClient
      .from('templates')
      .select('*')
      .eq('bannerState', bannerState);
    return new Promise((resolve, reject) => {
      if (error) {
        reject(new Error(`제품 상제 불러오기 오류 :  ${error.message}`));
      } else {
        resolve(data.sort((a, b) => b.id - a.id));
      }
    });
  };
  return useQuery(gatherKeys.templates, handleGetCategoryTemplate);
};
// 제품 페이지네이션을 위한 로드
const useGetTemplatesPage = (bannerState, pageNum) => {
  const handleGetTemplatesPage = async () => {
    const { data, error } = await supabaseClient
      .from('templates')
      .select('*')
      .eq('bannerState', bannerState)
      .range((pageNum - 1) * 50, pageNum * 50);
    return new Promise((resolve, reject) => {
      if (error) {
        reject(new Error(`해당 페이지 제품 불러오기 오류 :  ${error.message}`));
      } else {
        resolve(data.sort((a, b) => b.id - a.id));
      }
    });
  };
  return useQuery([`${gatherKeys.templatesPage}_${bannerState}`], handleGetTemplatesPage);
};
// 제품목록 6개만 가져오기
const useGetSixTemplates = () => {
  const handleGetSixTemplates = async () => {
    const { data, error } = await supabaseClient
      .from('templates')
      .select('*')
      .eq('bannerState', 'banner')
      .range(0, 6);
    return new Promise((resolve, reject) => {
      if (error) {
        reject(new Error(`제품목록 6개 불러오기 오류 :  ${error.message}`));
      } else {
        resolve(data.sort((a, b) => b.id - a.id));
      }
    });
  };
  return useQuery(gatherKeys.templatesSix, handleGetSixTemplates);
};
// 해당하는 카테고리 개수 가져오기
const useGetCategoryCount = (bannerState) => {
  const handleGetCategoryCount = async () => {
    const { data, error } = await supabaseClient
      .from('templates')
      .select('id')
      .eq('bannerState', bannerState);
    return new Promise((resolve, reject) => {
      if (error) {
        reject(new Error(`제품목록 불러오기 오류 :  ${error.message}`));
      } else {
        resolve(data.sort((a, b) => b.id - a.id));
      }
    });
  };
  return useQuery(gatherKeys.templatesCount, handleGetCategoryCount);
};
// 제품목록 가져오기
const useGetTemplates = () => {
  const handleGetTemplates = async () => {
    const { data, error } = await supabaseClient.from('templates').select('*');
    return new Promise((resolve, reject) => {
      if (error) {
        reject(new Error(`제품목록 불러오기 오류 :  ${error.message}`));
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
    imgRow,
    imgCol,
    imgSquare,
    category,
  }) => {
    const randomText = Math.random().toString(16).substring(2, 8);
    const title = `${categoryName}_${randomText}`;
    const categoryList = { list: [...category] };
    if (bannerState === 'banner') {
      const { url: imgUrlRow, public_id: publicIdRow } = await uploadImage(
        imgRow[0],
        cloudFolderList.templates
      );
      const { url: imgUrlCol, public_id: publicIdCol } = await uploadImage(
        imgCol[0],
        cloudFolderList.templates
      );
      const { url: imgUrlSquare, public_id: publicIdSquare } = await uploadImage(
        imgSquare[0],
        cloudFolderList.templates
      );

      const { data, error } = await supabaseClient.from('templates').insert({
        bannerState,
        categoryName,
        imgRow: imgUrlRow,
        imgCol: imgUrlCol,
        imgSquare: imgUrlSquare,
        publicIdRow,
        publicIdCol,
        publicIdSquare,
        title,
        category: categoryList,
        views: 0,
        sales: 0,
      });

      return new Promise((resolve, reject) => {
        // code 23502 title ㅜnull
        if (error) {
          deleteImage(publicIdRow);
          deleteImage(publicIdCol);
          deleteImage(publicIdSquare);
          toast.error(`CODE : ${error.code}`);
          reject(new Error(`생성 오류 :  ${error.message}`));
        } else {
          toast.success('성공적으로 생성하였습니다');
          resolve(data);
        }
      });
    }
    const { url: imgUrlRow, public_id: publicIdRow } = await uploadImage(
      imgRow[0],
      cloudFolderList.templates
    );
    const { data, error } = await supabaseClient.from('templates').insert({
      bannerState,
      categoryName,
      imgRow: imgUrlRow,
      publicIdRow,
      title,
      category: categoryList,
      views: 0,
      sales: 0,
    });

    return new Promise((resolve, reject) => {
      if (error) {
        deleteImage(publicIdRow);
        reject(new Error(`생성 오류 :  ${error.message}`));
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
// Templates UPDATE
// const useUpdateTemplates = () => {
//   const handleUpdateTemplate = async ({ file, title, category, type, tag, publicId }) => {
//     await deleteImage(publicId).then();
//     await uploadImage(file, cloudFolderList.templates).then(async ({ url, publicId }) => {
//       if (!url) {
//         throw new Error(`Cloudinary UPLOAD ERROR`);
//       }
//       const { data, error } = await supabaseClient.from('templates').update({
//         title,
//         type,
//         tag,
//         file: url,
//         type,
//         publicId,
//         category,
//       });
//       if (error) {
//         toast.error(error.message);
//         throw new Error(`Templates UPDATE ERROR : ${error.message}`);
//       }
//       toast.success('Templates UPDATE SUCCESS');

//       return data;
//     });
//   };

//   const client = useQueryClient();
//   return useMutation(handleUpdateTemplate, {
//     onSuccess: async () => {
//       await client.invalidateQueries(gatherKeys.templates);
//       await client.invalidateQueries(gatherKeys.templatesSix);
//     },
//   });
// };
// Templates DELETE
const useDeleteTemplates = () => {
  const handleDeleteTemplate = async ({ id, images }) => {
    const imgList = images.filter((item) => !!item);
    if (imgList.length > 0) {
      imgList.map(async (publicId) => {
        await deleteImage(publicId);
      });
    }
    const { error } = await supabaseClient.from('templates').delete().eq('id', id);

    return new Promise((resolve, reject) => {
      if (error) {
        toast.error('제품 삭제 오류');
        reject(new Error(`제품 삭제 오류 :  ${error.message}`));
      } else {
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
const useTemplates = () => ({
  useGetOnlyTemplate,
  useGetCategoryTemplate,
  useGetTemplatesPage,
  useUpdateView,
  useGetCategoryCount,
  useGetSixTemplates,
  useGetTemplates,
  useCreateTemplate,
  useDeleteTemplates,
});
export default useTemplates;
