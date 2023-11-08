import { TextField } from '@mui/material';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import AdminWritePulbicContainer from '../style';

export default function TitleAdminWrite({ title, valueName }) {
  // react hooks form
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const checkKeyDown = (e) => {
    if (e.key === 'Enter') e.preventDefault();
  };
  return (
    <AdminWritePulbicContainer className="box title">
      <h1>{title}</h1>
      <TextField
        variant="outlined"
        type="text"
        size="small"
        fullWidth
        placeholder="제목"
        onKeyDown={(e) => checkKeyDown(e)}
        {...register(valueName, {
          required: '제목은 필수입니다.',
        })}
      />
      <p className={`point_text ${errors.title && 'active'}`}>{errors.title?.message} </p>
    </AdminWritePulbicContainer>
  );
}
