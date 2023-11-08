import React from 'react';
import SideNav from './SideNav';
import AdminLayoutContainer from './style';
import TopHeader from './TopHeader';

export default function AdminLayout({ children }) {
  return (
    <AdminLayoutContainer>
      <TopHeader />
      <main>
        <SideNav />
        {children}
      </main>
    </AdminLayoutContainer>
  );
}
