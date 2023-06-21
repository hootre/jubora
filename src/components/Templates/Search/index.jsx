'use client';
import { SearchBox } from './styles';
import { GoSearch } from 'react-icons/go';
import { Category } from './Category';
import { useTemplatesActions } from 'store';
import { useIsCurrentFilter } from 'store';

export const Search = ({ categoryList }) => {
  const isCurrentFilter = useIsCurrentFilter();
  const { setIsCurrentFilter } = useTemplatesActions();
  return (
    <SearchBox>
      <div className={isCurrentFilter ? 'filterBtn open' : 'filterBtn'}>
        <div>
          <button className="openFilter" onClick={setIsCurrentFilter}>
            <img src="https://weenidy.com/assets/icons/icn-fillter-navy-d.png" alt="" />
          </button>
        </div>
      </div>
      <div className="searchBox">
        <div className="search">
          <Category categoryList={categoryList} />
          <div className="searchInputBox">
            <div className="searchInput">
              <GoSearch className="icon" />
              <input type="text" placeholder="검색" />
            </div>
          </div>
        </div>
      </div>
    </SearchBox>
  );
};
