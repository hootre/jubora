import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Public_order_container } from '../style';
import { TextField } from '@mui/material';
import DaumPost from 'utils/kakaoMap/kakaoMap';
import { memo } from 'react';

export const Item_address = memo(() => {
  // react hooks form
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext();
  const checkKeyDown = (e) => {
    if (e.key === 'Enter') e.preventDefault();
  };
  return (
    <Public_order_container>
      <h2>수령주소</h2>
      <div className="address_content">
        <div className="address_btn_box">
          <DaumPost setValue={setValue} />
          <TextField
            variant="outlined"
            type="text"
            onKeyDown={(e) => checkKeyDown(e)}
            size="small"
            {...register('address_1')}
          />
        </div>
        <div>
          <TextField
            className="address_input"
            variant="outlined"
            type="text"
            onKeyDown={(e) => checkKeyDown(e)}
            size="small"
            {...register('address_2')}
          />
        </div>
        <div>
          <TextField
            className="address_input"
            variant="outlined"
            type="text"
            size="small"
            placeholder="상세주소"
            onKeyDown={(e) => checkKeyDown(e)}
            {...register('address_3')}
          />
        </div>
      </div>
    </Public_order_container>
  );
});
