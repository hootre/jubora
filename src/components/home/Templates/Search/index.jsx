import SearchInput from 'components/home/Templates/Search/SearchInput';
import SortDropdown from 'components/common/SortDropdown';
import SearchContainer from './style';

export default function Search() {
  return (
    <SearchContainer>
      <div className="search_box">
        <div className="search">
          <SortDropdown />
          <SearchInput />
        </div>
      </div>
    </SearchContainer>
  );
}
