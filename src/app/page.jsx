import { Slide } from 'components/Main/Slide';
import { Notice } from 'components/Main/Notice';
import { noticeList, slides } from 'assets/data';
import { TemplatesContents } from 'components/Main/TemplatesContents';

export default function Home() {
  return (
    <>
      <Slide slides={slides} />
      <TemplatesContents />
      <Notice noticeList={noticeList} />
    </>
  );
}
