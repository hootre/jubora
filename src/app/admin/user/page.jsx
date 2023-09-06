'use client';
import { AdminUserPage } from 'components/admin/AdminUserPage';
import { useUser } from 'hooks/supabase/auth/useUser';

const page = () => {
  const { useGetUserList, useAdminDelete } = useUser();

  const { mutate } = useAdminDelete();
  const { data, isLoading } = useGetUserList();

  return <AdminUserPage data={data} handleDelete={mutate} />;
};
export default page;
