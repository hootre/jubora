'use client';
import Create from 'components/admin/Create/CreateBanner';
import { GetTemplateAll } from 'components/admin/Read';

export default function admin() {
  return (
    <>
      <Create />
      <GetTemplateAll />
    </>
  );
}
