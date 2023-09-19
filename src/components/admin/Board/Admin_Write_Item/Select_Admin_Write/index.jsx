import { FormControl, MenuItem, Select } from '@mui/material';
import React, { useEffect } from 'react';
import { Admin_Write_Pulbic_container } from '../style';
import { useFormContext } from 'react-hook-form';

export const Select_Admin_Write = ({ title, itemList, defaultValue, valueName }) => {
  // react hooks form
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();
  return (
    <Admin_Write_Pulbic_container className="box">
      <h1>{title}</h1>
      <FormControl sx={{ minWidth: 120 }} size="small">
        <p className={`point_text`}>{errors.type?.message} </p>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          defaultValue={defaultValue}
          {...register(valueName, {
            required: '분류 선택은 필수입니다.',
          })}
        >
          {itemList.map((item, idx) => (
            <MenuItem key={idx} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Admin_Write_Pulbic_container>
  );
};
