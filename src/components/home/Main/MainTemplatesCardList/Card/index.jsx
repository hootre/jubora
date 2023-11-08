'use client';

import React from 'react';
import CardContainer from './style';

export default function Card({ item }) {
  return (
    <CardContainer>
      <img src={item.image} alt="" />
      <div className="title_box">
        <h1>{item.title}</h1>
        <span>{item.subtitle}</span>
      </div>
      <div className="subTitle">{item.description}</div>
    </CardContainer>
  );
}
