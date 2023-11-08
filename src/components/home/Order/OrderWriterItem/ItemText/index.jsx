import React from 'react';
import { useFormContext } from 'react-hook-form';
import { TextField } from '@mui/material';
import PublicOrderContainer from '../style';

export default function ItemText({ title, valueName, disabled }) {
  // react hooks form
  const { register } = useFormContext();
  const checkKeyDown = (e) => {
    if (e.key === 'Enter') e.preventDefault();
  };
  return (
    <PublicOrderContainer className="name_box">
      <h2>{title}</h2>

      <TextField
        variant="outlined"
        type={valueName === 'password' ? 'password' : 'text'}
        size="small"
        disabled={disabled}
        placeholder={title}
        onKeyDown={(e) => checkKeyDown(e)}
        {...register(valueName)}
      />
      {valueName === 'password' && (
        <span className="password_text">※변경을 원하시면 적어주세요</span>
      )}
    </PublicOrderContainer>
  );
}
