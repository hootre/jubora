import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { Public_order_container } from '../style';
import { memo } from 'react';

export const Item_select = memo(({ title, valueName, list }) => {
  // react hooks form
  const {
    register,
    setValue,
    formState: { errors },
    watch,
  } = useFormContext();
  useEffect(() => {
    setValue(valueName, list[0]);
  }, []);
  return (
    <Public_order_container className="contents">
      <h2>{title}</h2>
      <div className="C_basic_flex">
        <select className="C_basic_input" name="category" required {...register(valueName)}>
          {list.map((item, idx) => (
            <option key={idx} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    </Public_order_container>
  );
});
