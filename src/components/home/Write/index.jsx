'use client';
import QnA_Write from '../Center/QnA/QnA_Write';
import { Write_contaier } from './styles';
import { useState } from 'react';

export const Write = ({ name }) => {
  // 게시판 select
  const [table, setTable] = useState('notice');
  const handleChange = (event) => {
    setTable(event.target.value);
  };
  return (
    <Write_contaier className="C_container">
      <QnA_Write name={name} />
    </Write_contaier>
  );
};
