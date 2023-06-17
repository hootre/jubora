'use client';
import { SearchBox } from './styles';
import { GoSearch } from 'react-icons/go';
import { Category } from './Category';
import { categoryList } from 'assets/data';
import { usePathname } from 'next/navigation';
import { useTemplatesActions } from 'store';
import { useIsCurrentFilter } from 'store';

export const Search = () => {
  const category = usePathname().substring(1);
  const isCurrentFilter = useIsCurrentFilter();
  const { setIsCurrentFilter } = useTemplatesActions();
  console.log('search');
  console.log(category);
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
          <Category list={categoryList} category={category} queryName={'category'} />
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
