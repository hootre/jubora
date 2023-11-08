import React, { memo } from 'react';
import { useFormContext } from 'react-hook-form';
import { TextField } from '@mui/material';
import PublicOrderContainer from '../style';

const ItemContent = memo(({ title, valueName }) => {
  // react hooks form
  const { register } = useFormContext();
  return (
    <PublicOrderContainer>
      <h2>{title}</h2>
      <TextField
        className="textarea"
        id="outlined-multiline-static"
        label="주문내용"
        multiline
        rows={4}
        {...register(valueName)}
      />
    </PublicOrderContainer>
  );
});
export default ItemContent;
