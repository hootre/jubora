import toast from 'react-hot-toast';
import { Slide } from 'components/Main/Slide';
import { Notice } from 'components/Main/Notice';
import { noticeList, slides } from 'assets/data';
import { MainBox } from './styles';
import { TemplatesContents } from 'components/Main/TemplatesContents';

export default function Home() {
  return (
    <MainBox>
      <Slide slides={slides} />
      <div className="mainShowcase">
        <TemplatesContents />
      </div>
      <Notice noticeList={noticeList} />
    </MainBox>
  );
}
