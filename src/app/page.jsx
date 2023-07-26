'use client';
import CreateBanner from 'components/admin/Create/CreateBanner';
import { Read } from 'components/admin/Read';
// import { Slide } from 'components/Main/Slide';
// import { Notice } from 'components/Main/Notice';
// import { noticeList, slides } from 'assets/data';
// import { TemplatesContents } from 'components/Main/TemplatesContents';
// import { CardList } from 'components/common/CardList';

export default function Home() {
  return (
    <>
      <CreateBanner />
      <Read />
      {/* <Slide slides={slides} />
      <TemplatesContents />
      <img src="https://nuriad.co.kr/data/bbsData/16376642931.jpg" alt="" />
      <CardList />
      <img src="https://nuriad.co.kr/data/bbsData/16376639661.jpg" alt="" />
      <Notice noticeList={noticeList} /> */}
    </>
  );
}
