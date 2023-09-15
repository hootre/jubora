'use client';
import { Write_contaier } from './styles';
import { useState } from 'react';
import { FormControl, MenuItem, Select } from '@mui/material';
import Notice_Write from '../../../home/Center/Notice/Notice_Write';
import Question_Write from '../../../home/Center/Question/Question_Write';
import { useUser } from 'hooks/supabase/auth/useUser';

export const Admin_Write = () => {
  // 어드민 유저정보 확인
  const { useGetUserInfo } = useUser();
  const {
    data: { name },
    isLoading,
  } = useGetUserInfo();
  if (isLoading) {
    return <h1>Loading</h1>;
  }
  // 게시판 select
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
        <Notice_Write name={name} />
      ) : table === 'question' ? (
        <Question_Write name={name} />
      ) : table === 'orderAnswer' ? (
        <h1>ㅠㅠ</h1>
      ) : (
        <h1>Error</h1>
      )}
    </Write_contaier>
  );
};
