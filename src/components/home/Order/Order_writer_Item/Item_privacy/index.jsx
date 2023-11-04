import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Public_order_container } from '../style';
import { TextField } from '@mui/material';
import { memo } from 'react';

export const Item_privacy = memo(({ user }) => {
  // react hooks form
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const checkKeyDown = (e) => {
    if (e.key === 'Enter') e.preventDefault();
  };
  return (
    <Public_order_container className="name_box">
      {!user?.id && (
        <>
          <h2>이름/회사명</h2>
          <TextField
            variant="outlined"
            type="text"
            size="small"
            required
            placeholder="이름/회사명"
            onKeyDown={(e) => checkKeyDown(e)}
            {...register('name')}
          />
          <h2>비밀번호</h2>
          <TextField
            variant="outlined"
            type="password"
            size="small"
            required
            placeholder="비밀번호"
            inputProps={{ maxLength: 4 }}
            onKeyDown={(e) => checkKeyDown(e)}
            {...register('password')}
          />
        </>
      )}
      <h2>전화번호</h2>
      <TextField
        variant="outlined"
        type="text"
        size="small"
        required
        placeholder="ex)01012345678"
        inputProps={{ maxLength: 11 }}
        onKeyDown={(e) => checkKeyDown(e)}
        error={errors.phone}
        helperText={errors.phone && '전화번호 형식에 맞춰주세요'}
        {...register('phone', {
          pattern: /^[0-9]{8,11}$/,
        })}
      />
    </Public_order_container>
  );
});
