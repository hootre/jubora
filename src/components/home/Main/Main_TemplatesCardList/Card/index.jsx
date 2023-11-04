'use client';
import React from 'react';
import { Card_container } from './style';

export const Card = ({ item }) => {
  return (
    <Card_container>
      <img src={item.image} alt="" />
      <div className="title_box">
        <h1>{item.title}</h1>
        <span>{item.subtitle}</span>
      </div>
      <div className="subTitle">{item.description}</div>
    </Card_container>
  );
};
