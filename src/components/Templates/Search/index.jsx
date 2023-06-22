'use client';
import { GoSearch } from 'react-icons/go';
import { Category } from './Category';
import { useTemplatesActions } from 'store';
import { useIsCurrentFilter } from 'store';
import './Search.scss';
export const Search = ({ categoryList }) => {
  const isCurrentFilter = useIsCurrentFilter();
  const { setIsCurrentFilter } = useTemplatesActions();
  return (
    <section className="search_container">
      <div className={isCurrentFilter ? 'filter_btn open' : 'filter_btn'}>
        <div>
          <button className="open_filter" onClick={setIsCurrentFilter}>
            <img src="https://weenidy.com/assets/icons/icn-fillter-navy-d.png" alt="" />
          </button>
        </div>
      </div>
      <div className="search_box">
        <div className="search">
          <Category categoryList={categoryList} />
          <div className="search_input_box">
            <div className="search_input">
              <GoSearch className="icon" />
              <input type="text" placeholder="검색" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
