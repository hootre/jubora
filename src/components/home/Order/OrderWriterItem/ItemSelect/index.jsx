import React, { useEffect, memo } from 'react';
import { useFormContext } from 'react-hook-form';
import PublicOrderContainer from '../style';

const ItemSelect = memo(({ title, valueName, list }) => {
  // react hooks form
  const { register, setValue } = useFormContext();
  useEffect(() => {
    setValue(valueName, list[0]);
  }, []);
  return (
    <PublicOrderContainer className="contents">
      <h2>{title}</h2>
      <div className="C_basic_flex">
        <select className="C_basic_input" name="category" required {...register(valueName)}>
          {list.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    </PublicOrderContainer>
  );
});
export default ItemSelect;
