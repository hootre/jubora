import React, { memo } from 'react';
import { useFormContext } from 'react-hook-form';
import { TextField } from '@mui/material';
import DaumPost from 'utils/kakaoMap/kakaoMap';
import PublicOrderContainer from '../style';

const ItemAddress = memo(
  ({ title, address1 = 'address1', address2 = 'address2', address3 = 'address3' }) => {
    // react hooks form
    const { register, setValue } = useFormContext();
    const checkKeyDown = (e) => {
      if (e.key === 'Enter') e.preventDefault();
    };
    return (
      <PublicOrderContainer>
        <h2>{title}</h2>
        <div className="address_content">
          <div className="address_btn_box">
            <DaumPost setValue={setValue} />
            <TextField
              variant="outlined"
              type="text"
              onKeyDown={(e) => checkKeyDown(e)}
              size="small"
              {...register(address1)}
            />
          </div>
          <div>
            <TextField
              className="address_input"
              variant="outlined"
              type="text"
              onKeyDown={(e) => checkKeyDown(e)}
              size="small"
              {...register(address2)}
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
              {...register(address3)}
            />
          </div>
        </div>
      </PublicOrderContainer>
    );
  }
);
export default ItemAddress;
