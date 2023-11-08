import React, { memo } from 'react';
import { useFormContext } from 'react-hook-form';
import PublicOrderContainer from '../style';

const ItemSelectTwo = memo(({ title, valueName1, valueName2, list1, list2 }) => {
  // react hooks form
  const { register, watch } = useFormContext();
  return (
    <PublicOrderContainer className="contents">
      <h2>{title}</h2>
      <div className="C_basic_flex">
        <select
          className="C_basic_input"
          name="category"
          required
          {...register(valueName1)}
          value={watch(valueName1) ?? '선택'}
        >
          {list1.map((item) => (
            <option key={item.title} value={item.title}>
              {item.title}
            </option>
          ))}
        </select>
        <select
          className="C_basic_input"
          name="category"
          required
          {...register(valueName2)}
          value={watch(valueName2) ?? '선택'}
        >
          {list2.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    </PublicOrderContainer>
  );
});
export default ItemSelectTwo;
