import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Public_order_container } from '../style';
import { memo } from 'react';
import { usePathname } from 'next/navigation';

export const Item_buttonNav = memo(({ itemName, order_setting }) => {
  // react hooks form
  const {
    formState: { errors },
    watch,
    setValue,
    register,
  } = useFormContext();

  const [etc, setEtc] = useState(false);
  const onChangeText = (e) => {
    setValue(itemName, {
      title: order_setting[itemName].title,
      content: e.target.value,
    });
  };
  const handleEtc = () => {
    setValue(itemName, '');
    setEtc((prev) => !prev);
  };
  const handleBtn = (e) => {
    setValue(itemName, {
      title: order_setting[itemName].title,
      content: e.target.value,
    });
    setEtc(false);
  };
  return (
    <Public_order_container className="name_box">
      <h2>{order_setting[itemName].title}</h2>
      {/* {item === 'item_1' && <Link href={`${pathname}?bannerType=${item}`}></Link>} */}
      <div className="type_btn_box">
        <div className="btn_box">
          {order_setting[itemName].list.map((text, index) => (
            <button
              key={index}
              className={
                watch(itemName)?.content === text ? 'from_item_btn active' : `from_item_btn`
              }
              type="button"
              value={text}
              onClick={(e) => handleBtn(e)}
            >
              {text}
            </button>
          ))}
          <button
            className={etc ? 'from_item_btn active' : `from_item_btn`}
            type="button"
            onClick={handleEtc}
          >
            기타
          </button>
        </div>
        {etc && (
          <div className="etc_box">
            <h3>기타</h3>
            <input
              type="text"
              className="C_basic_input"
              value={watch(itemName)?.content}
              onChange={(e) => onChangeText(e)}
            />
          </div>
        )}
      </div>
    </Public_order_container>
  );
});
