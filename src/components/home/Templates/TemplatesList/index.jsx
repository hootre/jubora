'use client';

import SideCategory from 'components/home/Templates/SideCategory';
import Showcase from 'components/home/Templates/Showcase';
import TagList from 'components/home/Templates/TagList';
import TemplatesListContainer from './styles';

export default function TemplatesList({ bannerState }) {
  return (
    <TemplatesListContainer className="CContainer">
      <section className="mainImgContainer">
        <div className="img_box" />
      </section>
      <section className="templatsContainer">
        <SideCategory />
        <main>
          <TagList />
          <Showcase bannerState={bannerState} />
        </main>
      </section>
    </TemplatesListContainer>
  );
}
