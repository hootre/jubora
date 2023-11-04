'use client';
import { SideCategory } from 'components/home/Templates/SideCategory';
import { Showcase } from 'components/home/Templates/Showcase';
import { TagList } from 'components/home/Templates/TagList';
import { TemplatesList_container } from './styles.jsx';

export const TemplatesList = ({ bannerState }) => {
  return (
    <TemplatesList_container className="C_container">
      <section className="main_img_container">
        <div className="img_box"></div>
      </section>
      <section className="templats_container">
        <SideCategory />
        <main>
          <TagList />
          <Showcase bannerState={bannerState} />
        </main>
      </section>
    </TemplatesList_container>
  );
};
