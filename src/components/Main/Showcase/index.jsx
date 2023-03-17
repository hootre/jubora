import React, { useState } from 'react';
import { ShowcaseBox } from './styles';

export const Showcase = ({ showCaseList }) => {
  const navList = ['전체', '현수막', '배너', '스티커', '명함', '전단지', '봉투', '교회용품'];

  const [activeTab, setActiveTab] = useState(0);
  const onClickTab = idx => {
    setActiveTab(idx);
  };
  return (
    <ShowcaseBox>
      <div className="nav">
        <nav>
          <ul>
            {navList &&
              navList.map((item, idx) => {
                return (
                  <li key={idx}>
                    <a href="#" className={activeTab === idx ? 'active' : ''} onClick={() => onClickTab(idx)}>
                      {item}
                    </a>
                    {activeTab === idx ? <span className="back"></span> : ''}
                  </li>
                );
              })}
          </ul>
        </nav>
      </div>
      <div className="showcase">
        <ul>
          {showCaseList &&
            showCaseList
              .filter(v => v[1] == activeTab)
              .map((item, idx) => {
                return (
                  <li key={idx} className={item[1]}>
                    <div>
                      <img src={item[0]} alt="현수막이미지" />
                    </div>
                  </li>
                );
              })}
        </ul>
      </div>
    </ShowcaseBox>
  );
};
