import { Slide } from 'components/Main/Slide';
import { Notice } from 'components/Main/Notice';
import { noticeList, slides } from 'assets/data';
import { TemplatesContents } from 'components/Main/TemplatesContents';
import { Suspense } from 'react';

export default function Home() {
  return (
    <>
      <Suspense fallback={<div style={{ height: '600px', width: '100%' }} />}>
        <Slide slides={slides} />
      </Suspense>
      <Suspense fallback={<div style={{ height: '600px', width: '100%' }} />}>
        <TemplatesContents />
      </Suspense>
      <Suspense fallback={<div style={{ height: '600px', width: '100%' }} />}>
        <Notice noticeList={noticeList} />
      </Suspense>
    </>
  );
}
