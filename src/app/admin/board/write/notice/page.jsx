import dynamic from 'next/dynamic';

const NoticeWrite = dynamic(() => import('components/admin/Board/NoticeWrite'), { ssr: false });

const page = () => <NoticeWrite />;
export default page;
