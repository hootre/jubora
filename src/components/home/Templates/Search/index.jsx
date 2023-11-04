import { SearchInput } from 'components/home/Templates/Search/SearchInput';

import { Search_container } from './style';
import { SortDropdown } from 'components/common/SortDropdown';
export const Search = () => {
  return (
    <Search_container>
      <div className="search_box">
        <div className="search">
          <SortDropdown />
          <SearchInput />
        </div>
      </div>
    </Search_container>
  );
};
