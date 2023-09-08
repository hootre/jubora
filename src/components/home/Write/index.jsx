'use client';
import React from 'react';
import { Write_contaier } from './styles';
import { useState } from 'react';
import { Notice_Write } from '../Notice/Notice_Write';
import { FormControl, MenuItem, Select } from '@mui/material';
export const Write = () => {
  const [table, setTable] = useState('notice');
  const handleChange = (event) => {
    setTable(event.target.value);
  };
  return (
    <Write_contaier className="C_container">
      <div className="table_select_box">
        <h1>게시판 선택</h1>
        <FormControl sx={{ minWidth: 150 }} size="small">
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            defaultValue={'notice'}
            value={table}
            onChange={handleChange}
          >
            <MenuItem value="notice">공지사항</MenuItem>
            <MenuItem value="question">자주묻는 질문</MenuItem>
            <MenuItem value="orderAnswer">시안확인답변</MenuItem>
          </Select>
        </FormControl>
      </div>
      {table === 'notice' ? (
        <Notice_Write />
      ) : table === 'question' ? (
        <h1>ㅠㅠ</h1>
      ) : table === 'orderAnswer' ? (
        <h1>ㅠㅠ</h1>
      ) : (
        <h1>Error</h1>
      )}
    </Write_contaier>
  );
};
