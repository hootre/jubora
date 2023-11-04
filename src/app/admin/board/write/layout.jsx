'use client';
import { AdminLayout } from 'components/admin/AdminLayout';
import { Admin_Write } from 'components/admin/Board/Admin_Write';
export default function layout({ children }) {
  return <Admin_Write>{children}</Admin_Write>;
}
