'use client';

import React, { useState } from 'react';

import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FormProvider, useForm } from 'react-hook-form';
import ItemButtonNav from 'components/home/Order/OrderWriterItem/ItemButtonNav';

import EmptyCardContainer from './style';
import UpdateCard from './UpdateCard';
import { orderSettingFor } from '../../../../../../public/data';

export default function EmptyCard({ title, orderSetting, isOrderSetting, updataData }) {
  // form 데이터 관리
  const methods = useForm();
  const [isUploading, setIsUploading] = useState(false);
  const {
    setValue,
    handleSubmit,
    watch,
    reset,
    formState: { isValid },
  } = methods;
  // 수정하기 State
  const [update, setUpdate] = useState();
  const toggleUpdate = () => {
    reset();
    setUpdate((prev) => !prev);
  };
  // 기본 값 할당

  const onSubmit = async (e) => {
    if (e.key === 'Enter') e.preventDefault();
    setIsUploading(true);
    orderSettingFor.map((item, idx) => {
      if (watch(`${item}_${idx}`) !== undefined) {
        const itemList = [];
        const itemPreview = [];
        const itemTitle = watch(`title_${item}`);
        watch(`${item}_${idx}`).map((text) => {
          itemList.push(watch(`list_${text}`));
          itemPreview.push({
            title: watch(`list_${text}`),
            image: watch(`image_${text}`),
            publicId: watch(`publicId_${text}`),
            description: watch(`description_${text}`),
            add_price: watch(`add_price_${text}`),
          });
          return false;
        });
        setValue(item, {
          list: itemList,
          preview: itemPreview,
          title: itemTitle,
        });
      }
      return false;
    });

    // console.log({
    //   id: orderSetting.id,
    //   item1: watch('item1'),
    //   item2: watch('item2'),
    //   item3: watch('item3'),
    //   item4: watch('item4'),
    //   item5: watch('item5'),
    //   item6: watch('item6'),
    //   item7: watch('item7'),
    //   delete_images: watch(`delete_images`),
    // });

    updataData(
      {
        id: orderSetting.id,
        item1: watch('item1'),
        item2: watch('item2'),
        item3: watch('item3'),
        item4: watch('item4'),
        item5: watch('item5'),
        item6: watch('item6'),
        item7: watch('item7'),
        delete_images: watch(`delete_images`),
      },
      {
        onSettled: () => {
          setUpdate(false);
          setIsUploading(false);
          reset();
        },
      }
    );
  };

  return (
    <EmptyCardContainer>
      <FormProvider {...methods}>
        <Accordion className="accordion">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>{`${title}`}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="accordion_content">
              <form>
                <div className="update_btn_box">
                  {update ? (
                    <>
                      <button
                        type="button"
                        className="update_order"
                        onClick={handleSubmit(onSubmit)}
                      >
                        수정완료
                      </button>
                      <button type="button" className="modify_btn" onClick={toggleUpdate}>
                        수정취소
                      </button>
                    </>
                  ) : (
                    <>
                      {isOrderSetting ? (
                        <button type="button" className="modify_btn" onClick={toggleUpdate}>
                          수정하기
                        </button>
                      ) : (
                        <button
                          type="submit"
                          className={
                            isUploading || !isValid ? `upload_btn uploading` : `upload_btn`
                          }
                          disabled={isUploading}
                          onClick={handleSubmit(onSubmit)}
                        >
                          {isUploading ? '업로드중...' : '등록하기'}
                        </button>
                      )}

                      {/* <div className="delete_btn" onClick={() => deleteData(orderSetting.id)}>
                        삭제하기
                      </div> */}
                    </>
                  )}
                </div>
                {isOrderSetting && !update ? (
                  <div className="optionContainer">
                    <div className="orderSetting_box">
                      {orderSettingFor.map((itemName) =>
                        orderSetting[itemName]?.title ? (
                          <ItemButtonNav
                            key={itemName}
                            itemName={itemName}
                            orderSetting={orderSetting}
                          />
                        ) : (
                          <div key={itemName} className="orderBasic">
                            <h2>{itemName}</h2>
                            <div>
                              <span>없음</span>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                ) : (
                  <UpdateCard data={orderSetting} />
                )}
              </form>
            </div>
          </AccordionDetails>
        </Accordion>
      </FormProvider>
    </EmptyCardContainer>
  );
}
