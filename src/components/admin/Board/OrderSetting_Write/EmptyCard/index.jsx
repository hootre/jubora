'use client';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { EmptyCard_container } from './style';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FormProvider, useForm } from 'react-hook-form';
import { getByteSize } from 'utils/getByteSize';
import toast from 'react-hot-toast';
import { order_setting_for } from 'assets/data';
import { Item_buttonNav } from 'components/home/Order/Order_writer_Item/Item_buttonNav';
import { UpdateCard } from './UpdateCard';
export const EmptyCard = ({
  title,
  order_setting,
  isOrderSetting,
  createData,
  updataData,
  deleteData,
}) => {
  // 수정하기 State
  const [update, setUpdate] = useState();
  const toggleUpdate = () => {
    setUpdate((prev) => !prev);
  };
  // form 데이터 관리
  const methods = useForm();
  const [isUploading, setIsUploading] = useState(false);
  const {
    setValue,
    handleSubmit,
    watch,
    reset,
    register,
    formState: { isValid, errors },
  } = methods;
  // 기본 값 할당

  useEffect(() => {
    if (isOrderSetting) {
      setValue('id', order_setting.id);
      setValue('category_name', title);
    }
  }, [isOrderSetting]);
  const onSubmit = async (data) => {
    order_setting_for.map((item, idx) => {
      if (watch(`${item}_${idx}`) != undefined) {
        let item_list = [],
          item_preview = [],
          item_title = watch(`title_${item}`);
        watch(`${item}_${idx}`).map((id) => {
          item_list.push(watch(`list_${id}`));
          item_preview.push({
            image: watch(`image_${id}`),
            title: watch(`list_${id}`),
            description: watch(`description_${id}`),
          });
        });
        setValue(item, {
          list: item_list,
          preview: item_preview,
          title: item_title,
        });
      }
    });

    console.log({
      id: order_setting?.id,
      category_name: title,
      item_1: watch('item_1'),
      item_2: watch('item_2'),
      item_3: watch('item_3'),
      item_4: watch('item_4'),
      item_5: watch('item_5'),
      item_6: watch('item_6'),
      item_7: watch('item_7'),
    });

    // setIsUploading(true);
    // updataData(data, {
    //   onSettled: () => {
    //     setIsUploading(false);
    //   },
    // });
  };
  // useEffect(() => {
  //   if (typeof image !== 'string' && image?.length > 0) {
  //     if (watch('image')?.[0].size > 10485760) {
  //       setValue('image', '');
  //       toast.error('이미지 사이즈가 10mb보다 큽니다');
  //     } else {
  //       const file = image[0];
  //       setImagePreview(URL.createObjectURL(file));
  //     }
  //   }
  // }, [image]);

  return (
    <EmptyCard_container>
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
                <div className="btn_box">
                  {update ? (
                    <>
                      <div className="update_order" onClick={handleSubmit(onSubmit)}>
                        수정완료
                      </div>
                      <div className="modify_btn" onClick={toggleUpdate}>
                        수정취소
                      </div>
                    </>
                  ) : (
                    <>
                      <div
                        className={isUploading || !isValid ? `upload_btn uploading` : `upload_btn`}
                        disabled={isUploading}
                        onClick={handleSubmit(onSubmit)}
                      >
                        {isUploading ? '업로드중...' : '등록하기'}
                      </div>
                      <div className="modify_btn" onClick={toggleUpdate}>
                        수정하기
                      </div>
                      <div className="delete_btn" onClick={() => deleteData(order_setting.id)}>
                        삭제하기
                      </div>
                    </>
                  )}
                </div>
                {isOrderSetting ? (
                  <div className="option_container">
                    <div className="orderSetting_box">
                      {order_setting_for.map((itemName, idx) =>
                        isOrderSetting && order_setting[itemName] !== null ? (
                          <Item_buttonNav
                            key={idx}
                            itemName={itemName}
                            order_setting={order_setting}
                          />
                        ) : (
                          <div key={idx} className="orderBasic">
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
                  <UpdateCard />
                )}
              </form>
            </div>
          </AccordionDetails>
        </Accordion>
      </FormProvider>
    </EmptyCard_container>
  );
};
