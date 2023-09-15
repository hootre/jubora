'use client';
import { Write_contaier } from './styles';
import { useState } from 'react';
import { FormControl, MenuItem, Select } from '@mui/material';
import Notice_Write from '../Center/Notice/Notice_Write';
import Question_Write from '../Center/Question/Question_Write';
import QnA_Write from '../Center/QnA/QnA_Write';

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
