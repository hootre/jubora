import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import BoardPasswordCheck from 'hooks/custom/usePasswordCheck';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import PasswordConfirmContainer from './style';

export default function PasswordConfirm({ table, id }) {
  // form 데이터 관리
  const { handleSubmit, register, setFocus } = useForm();
  const router = useRouter();
  const onSubmit = async ({ password }) => {
    const data = await BoardPasswordCheck(table, id, password);
    if (data?.id) {
      router.push(`/${table}/${id}`);
    } else {
      toast.error('password 틀려요');
    }
  };
  useEffect(() => {
    setFocus('password');
  }, [setFocus]);
  return (
    <PasswordConfirmContainer>
      <h1>비밀번호 입력</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="password" maxLength={4} {...register('password')} />
        <button type="button" className="C_basic_button">
          확인
        </button>
      </form>
    </PasswordConfirmContainer>
  );
}
