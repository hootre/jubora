import React from 'react';
import SmallCardContainer from './styles';

export default function SmallCard({ title, lastText, value, icon }) {
  return (
    <SmallCardContainer>
      <div>
        <h2>{title}</h2>
        <h1>
          {value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          {lastText}
        </h1>
        <div className="percent_box">
          <span className="percent">+11%</span>
          <span className="text">저번달보다 올랐습니다</span>
        </div>
        <div className="logo">{icon}</div>
      </div>
    </SmallCardContainer>
  );
}
