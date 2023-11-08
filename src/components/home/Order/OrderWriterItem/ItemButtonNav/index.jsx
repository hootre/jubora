import React, { useState, memo } from 'react';
import { useFormContext } from 'react-hook-form';

import { useTemplatesActions } from 'store';
import { orderSettingFor } from 'assets/data';
import PublicOrderContainer from '../style';

const ItemButtonNav = memo(({ itemName, orderSetting }) => {
  // react hooks form
  const { watch, setValue } = useFormContext();

  // zsutand
  const { setOrderPreview } = useTemplatesActions();
  const [etc, setEtc] = useState(false);
  const onChangeText = (e) => {
    setValue(itemName, {
      title: orderSetting[itemName].title,
      content: e.target.value,
    });
  };
  const sumPrice = () => {
    let sumAddPrice = 0;
    orderSettingFor.map((item) => {
      if (watch(item)?.add_price) {
        sumAddPrice += watch(item).add_price;
      }
      return false;
    });
    setValue('price', watch('product_price') + sumAddPrice);
  };
  const handleEtc = () => {
    setValue(itemName, '');
    setEtc((prev) => !prev);
    sumPrice();
  };
  const handleMouseOver = (index) => {
    const preview = orderSetting[itemName].preview[index];
    setOrderPreview(preview);
  };
  const handleBtn = (e, index) => {
    setValue(itemName, {
      title: orderSetting[itemName].title,
      content: e.target.value,
      add_price: orderSetting[itemName].preview[index].add_price,
    });
    setEtc(false);
    sumPrice();
  };
  return (
    <PublicOrderContainer className="name_box">
      <h2>{orderSetting[itemName]?.title}</h2>
      {/* {item === 'item1' && <Link href={`${pathname}?bannerType=${item}`}></Link>} */}
      <div className="type_btn_box">
        <div className="btn_box">
          {orderSetting[itemName]?.list.map((text, index) => (
            <button
              key={text}
              className={
                watch(itemName)?.content === text ? 'from_item_btn active' : `from_item_btn`
              }
              type="button"
              value={text}
              onClick={(e) => handleBtn(e, index)}
              onMouseOver={() => handleMouseOver(index)}
              onFocus={() => handleMouseOver(index)}
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
    </PublicOrderContainer>
  );
});
export default ItemButtonNav;
