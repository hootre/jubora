import { SearchInput } from 'components/Templates/Search/SearchInput';
import { Category } from './Category';
import './Search.scss';
export const Search = ({ categoryList }) => {
  return (
    <section className="search_container">
      <div className="search_box">
        <div className="search">
          <Category categoryList={categoryList} />
          <SearchInput />
        </div>
      </div>
    </section>
  );
};
