import React, { memo } from 'react';
import { useFormContext } from 'react-hook-form';
import PublicOrderContainer from '../style';

const ItemUpload = memo(({ title, valueName }) => {
  // react hooks form
  const { register, setValue, watch } = useFormContext();
  const deleteData = (name) => {
    setValue(name, '');
  };
  return (
    <PublicOrderContainer className="file_box">
      <h2>{title}</h2>
      <label htmlFor={`file_${valueName}`} className="from_item_btn active">
        첨부파일 등록
      </label>
      <input
        id={`file_${valueName}`}
        type="file"
        accept="image/*"
        name="file"
        {...register(valueName)}
      />
      {watch(valueName)?.[0]?.name && (
        <div className="file_text">
          <span className="file_name">{watch(valueName)[0].name}</span>
          <button type="button" className="delete_btn" onClick={() => deleteData(valueName)}>
            삭제
          </button>
        </div>
      )}
    </PublicOrderContainer>
  );
});
export default ItemUpload;
