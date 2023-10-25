'use client';
import { Item_category } from 'components/home/Order/Order_writer_Item/Item_category';
import { Item_text } from 'components/home/Order/Order_writer_Item/Item_text';
import * as React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
export const Board_item = ({ item, updateTemplatesTag, delteTemplatesTag }) => {
  // 수정하기 State
  const [update, setUpdate] = useState();
  const toggleUpdate = () => {
    setUpdate((prev) => !prev);
  };
  // form 데이터 관리
  const methods = useForm();
  const { handleSubmit, setValue } = methods;
  const onSubmit = (data) => {
    updateTemplatesTag(data);
    toggleUpdate();
  };
  const deleteItem = () => {
    toast(() => (
      <div className="confirm_box">
        Custom and <b>bold</b>
        <button onClick={() => toast.dismiss(t.id)}>Dismiss</button>
      </div>
    ));
  };
  useEffect(() => {
    setValue('id', item.id);
    setValue('title', item.title);
    setValue('tagList', Array.isArray(item.tagList.list) ? item.tagList.list : []);
  }, []);
  return (
    <div key={item.id} className="tag_conatiner">
      <div className="top_box">
        <div className="title_box">
          <h1 className="title">{item.title}</h1>
          <span>{item.from_nav}</span>
        </div>
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
              <div className="modify_btn" onClick={toggleUpdate}>
                수정하기
              </div>
              <div className="delete_btn" onClick={deleteItem}>
                삭제하기
              </div>
            </>
          )}
        </div>
      </div>
      <ul>
        {update ? (
          <div className="updata_box">
            <FormProvider {...methods}>
              <Item_text title={'제목'} valueName={'title'} />
              <Item_category title={'태그'} valueName={'tagList'} placeholder={item.tagList.list} />
            </FormProvider>
          </div>
        ) : (
          <>
            {Array.isArray(item.tagList.list) &&
              item.tagList.list?.map((item) => (
                <li key={item} className="tag_btn">
                  {item}
                </li>
              ))}
          </>
        )}
      </ul>
    </div>
  );
};
