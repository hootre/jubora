import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Public_order_container } from '../style';
import { TextField } from '@mui/material';
import { memo } from 'react';

export const Item_content = memo(() => {
  // react hooks form
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <Public_order_container className="contents">
      <h2>주문내용</h2>
      <TextField
        className="textarea"
        id="outlined-multiline-static"
        label="주문내용"
        multiline
        rows={4}
        {...register('contents')}
      />
    </Public_order_container>
  );
});
