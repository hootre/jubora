import { SearchBox } from './styles';
import { GoSearch } from 'react-icons/go';
import { Category } from './Category';
import { categoryList } from 'assets/data';
import { useRecoilState } from 'recoil';
import { curCategoryState, isCurFilterState } from 'states';
import { useRouter } from 'next/router';

export const Search = () => {
  const router = useRouter();
  const { category } = router.query;
  const [isCurFilter, setIsCurFilter] = useRecoilState(isCurFilterState);

  const hendleFilterState = () => {
    setIsCurFilter((prev) => !prev);
  };

  return (
    <SearchBox>
      <div className={isCurFilter ? 'filterBtn open' : 'filterBtn'}>
        <div>
          <button className="openFilter" onClick={hendleFilterState}>
            <img src="https://weenidy.com/assets/icons/icn-fillter-navy-d.png" alt="" />
          </button>
        </div>
      </div>
      <div className="searchBox">
        <div className="search">
          <Category list={categoryList} router={router} state={category} queryName={'category'} />
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
