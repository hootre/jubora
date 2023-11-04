'use client';
import React from 'react';
import { CardList_container } from './style';
import { Card } from './Card';

export const CardList = () => {
  return (
    <CardList_container className="C_container">
      <Card />
      <Card />
      <Card />
      <Card />
    </CardList_container>
  );
};
