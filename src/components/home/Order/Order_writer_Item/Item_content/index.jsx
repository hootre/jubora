import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Public_order_container } from '../style';
import { TextField } from '@mui/material';
import { memo } from 'react';

export const Item_content = memo(({ title, valueName }) => {
  // react hooks form
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <Public_order_container>
      <h2>{title}</h2>
      <TextField
        className="textarea"
        id="outlined-multiline-static"
        label="주문내용"
        multiline
        rows={4}
        {...register(valueName)}
      />
    </Public_order_container>
  );
});
