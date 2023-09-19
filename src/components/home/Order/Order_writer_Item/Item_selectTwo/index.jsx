import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Public_order_container } from '../style';
import { memo } from 'react';

export const Item_selectTwo = memo(({ title, valueName_1, valueName_2, list_1, list_2 }) => {
  // react hooks form
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext();
  return (
    <Public_order_container className="contents">
      <h2>{title}</h2>
      <div className="C_basic_flex">
        <select
          className="C_basic_input"
          name="category"
          required
          {...register(valueName_1)}
          value={watch(valueName_1) ?? '선택'}
        >
          {list_1.map((item, idx) => (
            <option key={idx} value={item.title}>
              {item.title}
            </option>
          ))}
        </select>
        <select
          className="C_basic_input"
          name="category"
          required
          {...register(valueName_2)}
          value={watch(valueName_2) ?? '선택'}
        >
          {list_2.map((item, idx) => (
            <option key={idx} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    </Public_order_container>
  );
});
