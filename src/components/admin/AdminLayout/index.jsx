import React from 'react';
import { SideNav } from '../SideNav';
import { AdminLayout_container } from './style';

export const AdminLayout = ({ children }) => {
  return (
    <AdminLayout_container>
      <SideNav />
      {children}
    </AdminLayout_container>
  );
};
