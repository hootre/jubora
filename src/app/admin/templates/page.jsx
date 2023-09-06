'use client';
import CreateBanner from 'components/admin/Create/CreateBanner';
import CreateOrderPreview from 'components/admin/Create/CreateOrderPreview';
import { Read_Template } from 'components/admin/Read/Read_Template';

const page = () => {
  return (
    <section>
      <CreateBanner />
      <CreateOrderPreview />
      <Read_Template />
    </section>
  );
};
export default page;
