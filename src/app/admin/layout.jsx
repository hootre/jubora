'use client';
import { AdminLayout_container } from 'components/admin/AdminLayout/style';
import { SideNav } from 'components/admin/SideNav';

export default async function AdminLayout({ children }) {
  return (
    <AdminLayout_container>
      <SideNav />
      {children}
    </AdminLayout_container>
  );
}
