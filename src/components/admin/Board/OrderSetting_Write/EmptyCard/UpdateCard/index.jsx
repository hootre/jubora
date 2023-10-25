import { order_setting_for } from 'assets/data';
import { Item_category } from 'components/home/Order/Order_writer_Item/Item_category';
import { Item_orderSetting } from 'components/home/Order/Order_writer_Item/Item_orderSetting';
import React, { useEffect } from 'react';
import { UpdateCard_container } from './style';
import { useFormContext } from 'react-hook-form';

export const UpdateCard = () => {
  // react hooks form
  const { watch, setValue, register } = useFormContext();

  return (
    <UpdateCard_container className="option_container">
      <div className="orderSetting_box">
        {order_setting_for.map((item, idx) => (
          <>
            <h2 className="item_title">{item}</h2>
            <div className="update_box">
              <div className="update_title_box">
                <h2>제목</h2>
                <div>
                  <input
                    type="text"
                    className="C_basic_input"
                    placeholder="제목을 입력하세요"
                    {...register(`title_${item}`)}
                  />
                </div>
              </div>
              <div className="update_item_box">
                <h2>내용</h2>
                <Item_orderSetting key={idx} valueName={item} index={idx} />
              </div>
            </div>
          </>
        ))}
      </div>
    </UpdateCard_container>
  );
};
