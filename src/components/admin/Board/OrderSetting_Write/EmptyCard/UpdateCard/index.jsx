import { order_setting_for } from 'assets/data';
import { Item_category } from 'components/home/Order/Order_writer_Item/Item_category';
import { Item_orderSetting } from 'components/home/Order/Order_writer_Item/Item_orderSetting';
import React, { useEffect } from 'react';
import { UpdateCard_container } from './style';
import { useFormContext } from 'react-hook-form';
import { v4 } from 'uuid';

export const UpdateCard = ({ data = null }) => {
  // react hooks form
  const { watch, setValue, register } = useFormContext();

  // 데이터가 있을 시 기본 데이터
  useEffect(() => {
    order_setting_for.map((itemName, index) => {
      if (data !== null && data[itemName] !== null) {
        setValue(`title_${itemName}`, data[itemName].title);
        setValue(`${itemName}_${index}`, [...data[itemName].list]);
        data[itemName].list.map((item, idx) => {
          setValue(`list_${item}`, item);
          if (typeof data[itemName].preview[idx].image === 'string') {
            setValue(`image_${item}`, data[itemName].preview[idx].image);
            setValue(`image_preview_${item}`, data[itemName].preview[idx].image);
            setValue(`public_id_${item}`, data[itemName].preview[idx].public_id);
          }
          setValue(`description_${item}`, data[itemName].preview[idx].description);
        });
      }
    });
  }, []);
  return (
    <UpdateCard_container className="option_container">
      <div className="orderSetting_box">
        {order_setting_for.map((itemName, idx) => {
          return data !== null ? (
            <div key={idx}>
              <div className="update_box">
                <div className="update_title_box">
                  <h2>제목</h2>
                  <div>
                    <input
                      type="text"
                      className="C_basic_input"
                      placeholder="제목을 입력하세요"
                      {...register(`title_${itemName}`)}
                    />
                  </div>
                </div>
                <div className="update_item_box">
                  <h2>내용</h2>
                  <Item_orderSetting valueName={itemName} index={idx} />
                </div>
              </div>
            </div>
          ) : (
            <div key={idx}>
              <div className="update_box">
                <div className="update_title_box">
                  <h2>제목</h2>
                  <div>
                    <input
                      type="text"
                      className="C_basic_input"
                      placeholder="제목을 입력하세요"
                      {...register(`title_${itemName}`)}
                    />
                  </div>
                </div>
                <div className="update_item_box">
                  <h2>내용</h2>
                  <Item_orderSetting valueName={itemName} index={idx} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </UpdateCard_container>
  );
};
