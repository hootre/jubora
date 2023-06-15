'use client';
import { Slide } from 'components/Main/Slide';
import { Notice } from 'components/Main/Notice';
import { noticeList, slides } from 'assets/data';
import { TemplatesContents } from 'components/Main/TemplatesContents';
import styled from 'styled-components';

const MainBox = styled.main`
  min-height: calc(100vh - 249px);
  .mainShowcase {
    padding: 50px 0;
  }
`;

export default function Home() {
  console.log('main');
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
