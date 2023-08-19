import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Public_order_container } from '../style';
import { memo } from 'react';

export const Item_upload = memo(() => {
  // react hooks form
  const { register, watch } = useFormContext();
  return (
    <Public_order_container className="file_box">
      <h2>파일</h2>
      <label htmlFor="file" className="from_item_btn active">
        첨부파일 등록
      </label>
      <input id="file" type="file" accept="image/*" name="file" {...register('file')} />
      {watch('file')?.[0]?.name && (
        <div className="file_text">
          <span className="file_name">{watch('file')[0].name}</span>
        </div>
      )}
    </Public_order_container>
  );
});
