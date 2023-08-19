'use client';
import { SideCategory } from 'components/Templates/SideCategory';
import { Showcase } from 'components/Templates/Showcase';
import { TagList } from 'components/Templates/TagList';
import { TemplatesList_container } from './styles.jsx';

export const TemplatesList = ({ category }) => {
  return (
    <TemplatesList_container className="container">
      <section className="main_img_container">
        <div className="img_box"></div>
      </section>
      <section className="templats_container">
        <SideCategory />
        <main>
          <TagList />
          <Showcase category={category} />
        </main>
      </section>
    </TemplatesList_container>
  );
};
