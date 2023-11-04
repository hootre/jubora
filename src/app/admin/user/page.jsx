'use client';
import { MainLoading } from 'components/Loading/MainLoading';
import { AdminUserPage } from 'components/admin/AdminUserPage';
import { useUser } from 'hooks/supabase/auth/useUser';

const page = () => {
  const { useGetUserList, useAdminDelete, useUpdateUserRole } = useUser();
  const { mutate: deleteUser } = useAdminDelete();

  const { mutate: updateRole } = useUpdateUserRole();
  const { data, isLoading } = useGetUserList();
  if (isLoading) {
    return <MainLoading />;
  }
  return <AdminUserPage data={data} handleDelete={deleteUser} updateRole={updateRole} />;
};
export default page;
