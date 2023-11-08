import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import supabaseClient from 'lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import gatherKeys from 'utils/gatherKeys';
import { deleteImage } from 'utils/imageUpload/uploader';

// 특정 id 제품 상세
const useGetOnlyNotice = (id) => {
  const handleGetOnlyNotice = async () => {
    const { data, error } = await supabaseClient.from('notice').select('*').eq('id', id).single();

    return new Promise((resolve, reject) => {
      if (error) {
        reject(new Error(`Notice Detail 오류 :  ${error.message}`));
      } else {
        resolve(data);
      }
    });
  };
  return useQuery([`notice_${id}`], handleGetOnlyNotice);
};
//  생성
const useCreateNotice = () => {
  const handleCreateNotice = async ({ name, title, contents, images, type }) => {
    const { data, error } = await supabaseClient
      .from('notice')
      .insert({ name, title, contents, images, type });
    return new Promise((resolve, reject) => {
      if (error) {
        reject(new Error(`공지사항 생성오류 :  ${error.message}`));
      } else {
        toast.success('성공적으로 생성하였습니다');
        resolve(data);
      }
    });
  };
  const client = useQueryClient();
  return useMutation(handleCreateNotice, {
    onSuccess: async () => {
      await client.invalidateQueries(gatherKeys.notice);
    },
  });
};
// 목록
const useGetNotice = () => {
  const handleGetNotice = async () => {
    const { data, error } = await supabaseClient.from('notice').select('*');
    return new Promise((resolve, reject) => {
      if (error) {
        reject(new Error(`공지사항 불러오기 오류 :  ${error.message}`));
      } else {
        resolve(data);
      }
    });
  };
  return useQuery(gatherKeys.notice, handleGetNotice);
};
// 메인슬라이드 최신 4개 게시글
const useGetMainNotice4 = () => {
  const handleGetMainNotice4 = async () => {
    const { data, error } = await supabaseClient.from('notice').select('*').range(0, 4);
    return new Promise((resolve, reject) => {
      if (error) {
        reject(new Error(`메인 슬라이드 불러오기 오류 :  ${error.message}`));
      } else {
        resolve(data);
      }
    });
  };
  return useQuery(['handleGetMainNotice_4'], handleGetMainNotice4);
};

// 수정
const useUpdateNotice = () => {
  const handleUpdateNotice = async ({ id, title, contents, images, type }) => {
    const { data, error } = await supabaseClient
      .from('notice')
      .update({ title, contents, images, type })
      .eq('id', id);

    return new Promise((resolve, reject) => {
      if (error) {
        reject(new Error(`공지사항 수정 오류 :  ${error.message}`));
      } else {
        toast.success('성공적으로 수정하였습니다');
        resolve(data);
      }
    });
  };

  const client = useQueryClient();
  return useMutation(handleUpdateNotice, {
    onSuccess: (data, variables) => {
      client.invalidateQueries([`notice_${variables.id}`]);
      client.invalidateQueries([`notice`]);
    },
  });
};
// 삭제
const useDeleteNotice = () => {
  const handleDeleteNotice = async ({ id, images }) => {
    if (images?.ids.length > 0) {
      images.ids.map(async (publicId) => {
        await deleteImage(publicId);
      });
    }
    const { error: sianError } = await supabaseClient
      .from('comment')
      .delete()
      .eq('fromTable', 'notice')
      .eq('fromTableId', id);
    if (!sianError) {
      const { data, error } = await supabaseClient.from('notice').delete().eq('id', id);
      return new Promise((resolve, reject) => {
        if (error) {
          reject(new Error(`공지사항 삭제 오류 :  ${error.message}`));
        } else {
          toast.success('성공적으로 삭제하였습니다');
          resolve(data);
        }
      });
    }
    throw new Error('댓글 삭제 오류');
  };
  const router = useRouter();
  const client = useQueryClient();
  return useMutation(handleDeleteNotice, {
    onSuccess: () => {
      client.removeQueries(gatherKeys.notice);
      router.push('/admin/board/write/notice');
    },
  });
};
const useNotice = () => ({
  useGetOnlyNotice,
  useCreateNotice,
  useGetNotice,
  useGetMainNotice4,
  useUpdateNotice,
  useDeleteNotice,
});
export default useNotice;
