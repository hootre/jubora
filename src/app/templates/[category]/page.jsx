'use client';
import { SideCategory } from 'components/Templates/SideCategory';
import { Showcase } from 'components/Templates/Showcase';
import { TagList } from 'components/Templates/TagList';
import './styles.jsx';
import { Templates_category_container } from './styles.jsx';

const templates = ({ params: { category } }) => {
  return (
    <Templates_category_container className="container">
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
    </Templates_category_container>
  );
};
export default templates;
