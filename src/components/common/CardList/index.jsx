'use client';

import React from 'react';
import CardListContainer from './style';
import Card from './Card';

export default function CardList() {
  return (
    <CardListContainer className="CContainer">
      <Card />
      <Card />
      <Card />
      <Card />
    </CardListContainer>
  );
}
