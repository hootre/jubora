import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import supabaseClient from 'lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import gatherKeys from 'utils/gatherKeys';
import { deleteImage } from 'utils/imageUpload/uploader';

// 특정 이메일 제품 상세
const useGetEmailPayment = (email) => {
  const handleGetEmailPayment = async () => {
    const { data, error } = await supabaseClient
      .from('payment')
      .select('*')
      .eq('buyerEmail', email);

    return new Promise((resolve, reject) => {
      if (error) {
        reject(new Error(`주문내역 불러오기 오류 :  ${error.message}`));
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
    const { data, error } = await supabaseClient.from('payment').select('*').eq('id', id).single();

    return new Promise((resolve, reject) => {
      if (error) {
        reject(new Error(`주문내역 단독 불러오기 오류 :  ${error.message}`));
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
    buyerEmail,
    buyerName,
    address,
    merchantUid,
    impUid,
  }) => {
    const { data, error } = await supabaseClient.from('payment').insert({
      pg,
      name,
      amount,
      buyerEmail,
      buyerName,
      address,
      merchantUid,
      impUid,
    });
    return new Promise((resolve, reject) => {
      if (error) {
        reject(new Error(`결제내역 생성오류 :  ${error.message}`));
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
    const { data, error } = await supabaseClient.from('payment').select('*');
    return new Promise((resolve, reject) => {
      if (error) {
        reject(new Error(`주문내역 불러오기 오류 :  ${error.message}`));
      } else {
        resolve(data);
      }
    });
  };
  return useQuery(gatherKeys.payment, handleGetPayment);
};

// 수정
const useUpdatePayment = () => {
  const handleUpdatePayment = async ({ id, title, contents, images, type }) => {
    const { data, error } = await supabaseClient
      .from('payment')
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
  return useMutation(handleUpdatePayment, {
    onSuccess: (data, variables) => {
      client.invalidateQueries([`payment${variables.id}`]);
      client.invalidateQueries([`payment`]);
    },
  });
};
// 삭제
const useDeletePayment = () => {
  const handleDeletePayment = async ({ id, images }) => {
    if (images?.ids.length > 0) {
      images.ids.map(async (publicId) => {
        await deleteImage(publicId);
      });
    }
    const { error: sianError } = await supabaseClient
      .from('comment')
      .delete()
      .eq('fromTable', 'payment')
      .eq('fromTableId', id);
    if (!sianError) {
      const { data, error } = await supabaseClient.from('payment').delete().eq('id', id);
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
  return useMutation(handleDeletePayment, {
    onSuccess: () => {
      client.removeQueries(gatherKeys.payment);
      router.push('/admin/board/write/payment');
    },
  });
};
const usePayment = () => ({
  useGetEmailPayment,
  useGetOnlyPayment,
  useCreatePayment,
  useGetPayment,
  useUpdatePayment,
  useDeletePayment,
});
export default usePayment;
