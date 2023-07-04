import { SearchInput } from 'components/Templates/Search/SearchInput';
import { Category } from './Category';
import { Search_container } from './style';
export const Search = () => {
  return (
    <Search_container>
      <div className="search_box">
        <div className="search">
          <Category />
          <SearchInput />
        </div>
      </div>
    </Search_container>
  );
};
