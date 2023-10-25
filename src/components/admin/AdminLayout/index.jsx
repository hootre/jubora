import React from 'react';
import { SideNav } from './SideNav';
import { AdminLayout_container } from './style';
import { TopHeader } from './TopHeader';

export const AdminLayout = ({ children }) => {
  return (
    <AdminLayout_container>
      <TopHeader />
      <main>
        <SideNav />
        {children}
      </main>
    </AdminLayout_container>
  );
};
