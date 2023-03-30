import { SearchBox } from './styles';
import { GoSearch } from 'react-icons/go';
import { Category } from './Category';
import { categoryList } from 'assets/data';
import { useRecoilState } from 'recoil';
import { curCategoryState } from 'states';

export const Search = () => {
  const [category, setCategory] = useRecoilState(curCategoryState);
  const hendleCategoryNum = (num) => {
    setCategory(num);
  };
  return (
    <SearchBox>
      <div className="filterBtn">
        <div>
          <button className="openFilter">
            <img src="https://weenidy.com/assets/icons/icn-fillter-navy-d.png" alt="" />
          </button>
        </div>
      </div>
      <div className="searchBox">
        <div className="search">
          <Category categoryList={categoryList} state={category} hendle={hendleCategoryNum} />
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
