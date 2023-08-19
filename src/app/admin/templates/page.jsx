'use client';
import CreateBanner from 'components/admin/Create/CreateBanner';
import CreateOrderPreview from 'components/admin/Create/CreateOrderPreview';
import { Read_Template } from 'components/admin/Read/Read_Template';

export default function templates() {
  return (
    <section>
      <CreateBanner />
      <CreateOrderPreview />
      <Read_Template />
    </section>
  );
}
