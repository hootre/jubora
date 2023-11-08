'use client';

import MainLoading from 'components/Loading/MainLoading';
import AdminUserPage from 'components/admin/AdminUserPage';
import User from 'hooks/supabase/auth/useUser';

const page = () => {
  const { GetUserList, AdminDelete, UpdateUserRole } = User();
  const { mutate: deleteUser } = AdminDelete();
  const { mutate: updateRole } = UpdateUserRole();
  const { data, isLoading } = GetUserList();
  if (isLoading) {
    return <MainLoading />;
  }
  return <AdminUserPage data={data} handleDelete={deleteUser} updateRole={updateRole} />;
};
export default page;
