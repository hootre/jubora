import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Public_order_container } from '../style';
import { memo } from 'react';

export const Item_upload = memo(({ title, valueName }) => {
  // react hooks form
  const { register, setValue, watch } = useFormContext();
  const deleteData = (name) => {
    setValue(name, '');
  };
  return (
    <Public_order_container className="file_box">
      <h2>{title}</h2>
      <label htmlFor="file" className="from_item_btn active">
        첨부파일 등록
      </label>
      <input id="file" type="file" accept="image/*" name="file" {...register(valueName)} />
      {watch(valueName)?.[0]?.name && (
        <div className="file_text">
          <span className="file_name">{watch(valueName)[0].name}</span>
          <div className="delete_btn" onClick={() => deleteData(valueName)}>
            삭제
          </div>
        </div>
      )}
    </Public_order_container>
  );
});
