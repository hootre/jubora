import { orderSettingFor } from 'assets/data';
import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import ItemOrderSetting from 'components/home/Order/OrderWriterItem/ItemOrderSetting';
import UpdateCardContainer from './style';

export default function UpdateCard({ data = null }) {
  // react hooks form
  const { setValue, register } = useFormContext();

  // 데이터가 있을 시 기본 데이터
  useEffect(() => {
    orderSettingFor.map((itemName, index) => {
      if (data !== null && data[itemName] !== null) {
        setValue(`title_${itemName}`, data[itemName].title);
        setValue(`${itemName}_${index}`, [...data[itemName].list]);
        data[itemName].list.map((item, idx) => {
          setValue(`list_${item}`, item);
          if (typeof data[itemName].preview[idx].image === 'string') {
            setValue(`image_${item}`, data[itemName].preview[idx].image);
            setValue(`image_preview_${item}`, data[itemName].preview[idx].image);
            setValue(`publicId_${item}`, data[itemName].preview[idx].publicId);
          }
          setValue(`description_${item}`, data[itemName].preview[idx].description);
          setValue(`add_price_${item}`, data[itemName].preview[idx].add_price);
          return false;
        });
      }
      return false;
    });
  }, []);
  return (
    <UpdateCardContainer className="optionContainer">
      <div className="orderSetting_box">
        {orderSettingFor.map((itemName, idx) =>
          data !== null ? (
            <div key={itemName}>
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
                  <ItemOrderSetting valueName={itemName} index={idx} />
                </div>
              </div>
            </div>
          ) : (
            <div key={itemName}>
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
                  <ItemOrderSetting valueName={itemName} index={idx} />
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </UpdateCardContainer>
  );
}
