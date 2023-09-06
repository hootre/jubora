import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Public_order_container } from '../style';
import { TextField } from '@mui/material';
import DaumPost from 'utils/kakaoMap/kakaoMap';
import { toast } from 'react-hot-toast';
import PriceCalculate from 'utils/PriceCalculate';
import { memo } from 'react';
import { useCallback } from 'react';

export const Item_size = memo(({ title, row, col, count }) => {
  // react hooks form
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext();
  const handleKeydown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSizeOnChange();
    }
  };
  // Size 체크
  const handleSizeOnChange = useCallback(() => {
    if (Number(watch(row)) < 70) {
      setValue(row, 70);
      toast.error('최소단위는 70cm 이상입니다');
    } else if (Number(watch(row)) > 2500) {
      setValue(row, 2500);
      toast.error('최대단위는 2500cm 이상입니다');
    }
    if (Number(watch(row)) % 5 !== 0) {
      setValue(row, Math.round(Number(watch(row)) / 10) * 10);
      toast.error('5cm 단위로 적어주세요');
    }
    if (Number(watch(col)) < 70) {
      setValue(col, 70);
      toast.error('최소단위는 70cm 이상입니다');
    } else if (Number(watch(col)) > 2500) {
      setValue(col, 2500);
      toast.error('최대단위는 2500cm 이상입니다');
    }
    if (Number(watch(col)) % 5 !== 0) {
      setValue(col, Math.round(Number(watch(col)) / 10) * 10);
      toast.error('5cm 단위로 적어주세요');
    }
    if (Number(watch(count)) > 10) {
      setValue(count, 10);
      toast.error('10개 이상은 문의 부탁드립니다.');
    } else if (Number(watch(count)) < 1) {
      setValue(count, 1);
      toast.error('1개 이상을 선택해주세요');
    }
    setValue('price', PriceCalculate(Number(watch(row)), Number(watch(col)), Number(watch(count))));
  }, []);
  return (
    <Public_order_container>
      <h2>{title}</h2>
      <div className="size_box">
        <div className="row">
          <TextField
            variant="outlined"
            type="text"
            size="small"
            required
            placeholder="가로"
            defaultValue={180}
            onKeyDown={handleKeydown}
            error={errors.row}
            helperText={errors.row && '1~999'}
            {...register(row, {
              onBlur: handleSizeOnChange,
              pattern: /^[0-9]{2,3}$/,
            })}
          />
          cm
        </div>
        <span>x</span>
        <div className="col">
          <TextField
            variant="outlined"
            type="text"
            size="small"
            required
            placeholder="세로"
            defaultValue={70}
            onKeyDown={handleKeydown}
            error={errors.col}
            helperText={errors.col && '1~999'}
            {...register(col, {
              onBlur: handleSizeOnChange,
              pattern: /^[0-9]{2,3}$/,
            })}
          />
          cm
        </div>
        <div className="count">
          <TextField
            type="text"
            variant="outlined"
            size="small"
            required
            defaultValue={1}
            onKeyDown={handleKeydown}
            error={errors.count}
            helperText={errors.count && '1~99'}
            {...register(count, {
              onBlur: handleSizeOnChange,
              pattern: /^[0-9]{1,2}$/,
            })}
          />
          개
        </div>
      </div>
    </Public_order_container>
  );
});
