import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import supabase_client from 'lib/supabase_client';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { gatherKeys } from 'utils/gatherKeys';
import { deleteImage } from 'utils/imageUpload/uploader';

// 특정 이메일 제품 상세
const useGetEmailPayment = (email) => {
  const handleGetEmailPayment = async () => {
    const { data, error } = await supabase_client
      .from('payment')
      .select('*')
      .eq('buyer_email', email);

    return new Promise((resolve, reject) => {
      if (error) {
        reject(`주문내역 불러오기 오류 :  ${error.message}`);
      } else {
        resolve(data);
      }
    });
  };
  return useQuery([`payment_${email}`], handleGetEmailPayment);
};
// 특정 id 제품 상세
const useGetOnlyPayment = (id) => {
  const handleGetOnlyPayment = async () => {
    const { data, error } = await supabase_client.from('payment').select('*').eq('id', id).single();

    return new Promise((resolve, reject) => {
      if (error) {
        reject(`주문내역 단독 불러오기 오류 :  ${error.message}`);
      } else {
        resolve(data);
      }
    });
  };
  return useQuery([`payment_${id}`], handleGetOnlyPayment);
};
//  생성
const useCreatePayment = () => {
  const handleCreatePayment = async ({
    pg,
    name,
    amount,
    buyer_email,
    buyer_name,
    address,
    merchant_uid,
    imp_uid,
  }) => {
    const { data, error } = await supabase_client.from('payment').insert({
      pg,
      name,
      amount,
      buyer_email,
      buyer_name,
      address,
      merchant_uid,
      imp_uid,
    });
    return new Promise((resolve, reject) => {
      if (error) {
        reject(`결제내역 생성오류 :  ${error.message}`);
      } else {
        toast.success('결제되었습니다');
        resolve(data);
      }
    });
  };
  const client = useQueryClient();
  return useMutation(handleCreatePayment, {
    onSuccess: async () => {
      await client.invalidateQueries(gatherKeys.payment);
    },
  });
};
// 목록
const useGetPayment = () => {
  const handleGetPayment = async () => {
    const { data, error } = await supabase_client.from('payment').select('*');
    return new Promise((resolve, reject) => {
      if (error) {
        reject(`주문내역 불러오기 오류 :  ${error.message}`);
      } else {
        resolve(data);
      }
    });
  };
  return useQuery(gatherKeys.payment, handleGetPayment);
};
// 메인슬라이드 최신 4개 게시글
const useGetMainPayment_4 = () => {
  const handleGetMainPayment_4 = async () => {
    const { data, error } = await supabase_client.from('payment').select('*').range(0, 4);
    return new Promise((resolve, reject) => {
      if (error) {
        reject(`메인 슬라이드 불러오기 오류 :  ${error.message}`);
      } else {
        resolve(data);
      }
    });
  };
  return useQuery(['handleGetMainPayment_4'], handleGetMainPayment_4);
};

// 수정
const useUpdatePayment = (id) => {
  const handleUpdatePayment = async ({ id, title, contents, images, type }) => {
    const { data, error } = await supabase_client
      .from('payment')
      .update({ title, contents, images, type })
      .eq('id', id);

    return new Promise((resolve, reject) => {
      if (error) {
        reject(`공지사항 수정 오류 :  ${error.message}`);
      } else {
        toast.success('성공적으로 수정하였습니다');
        resolve(data);
      }
    });
  };

  const client = useQueryClient();
  return useMutation(handleUpdatePayment, {
    onSuccess: () => {
      client.invalidateQueries([`payment${id}`]);
      client.invalidateQueries([`payment`]);
    },
  });
};
// 삭제
const useDeletePayment = () => {
  const handleDeletePayment = async ({ id, images }) => {
    if (images?.ids.length > 0) {
      images.ids.map(async (public_id) => {
        await deleteImage(public_id);
      });
    }
    const { error: sianError } = await supabase_client
      .from('comment')
      .delete()
      .eq('from_table', 'payment')
      .eq('from_table_id', id);
    if (!sianError) {
      const { data, error } = await supabase_client.from('payment').delete().eq('id', id);
      return new Promise((resolve, reject) => {
        if (error) {
          reject(`공지사항 삭제 오류 :  ${error.message}`);
        } else {
          toast.success('성공적으로 삭제하였습니다');
          resolve(data);
        }
      });
    } else {
      throw new Error('댓글 삭제 오류');
    }
  };
  const router = useRouter();
  const client = useQueryClient();
  return useMutation(handleDeletePayment, {
    onSuccess: () => {
      client.removeQueries(gatherKeys.payment);
      router.push('/admin/board/write/payment');
    },
  });
};
export const usePayment = () => {
  return {
    useGetEmailPayment,
    useGetOnlyPayment,
    useCreatePayment,
    useGetPayment,
    useGetMainPayment_4,
    useUpdatePayment,
    useDeletePayment,
  };
};
