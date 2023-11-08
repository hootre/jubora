'use client';

import ItemCategory from 'components/home/Order/OrderWriterItem/ItemCategory';
import ItemText from 'components/home/Order/OrderWriterItem/ItemText';
import * as React from 'react';
import { useEffect, useState } from 'react';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { FormProvider, useForm } from 'react-hook-form';

export default function BoardItem({ item, updateTemplatesTag, deleteTemplatesTag }) {
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
    confirmAlert({
      title: '정말로 삭제하시겠습니까?',
      message: '복구 불가능합니다',
      buttons: [
        {
          label: '삭제',
          onClick: () => {
            deleteTemplatesTag({ id: item.id, categoryName: item.title });
          },
        },
        {
          label: '취소',
          onClick: () => {},
        },
      ],
    });
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
          <span>{item.fromNav}</span>
        </div>
        <div className="btn_box">
          {update ? (
            <>
              <button type="button" className="update_order" onClick={handleSubmit(onSubmit)}>
                수정완료
              </button>
              <button type="button" className="modify_btn" onClick={toggleUpdate}>
                수정취소
              </button>
            </>
          ) : (
            <>
              <button type="button" className="modify_btn" onClick={toggleUpdate}>
                수정하기
              </button>
              <button type="button" className="delete_btn" onClick={deleteItem}>
                삭제하기
              </button>
            </>
          )}
        </div>
      </div>
      <ul>
        {update ? (
          <div className="updata_box">
            <FormProvider {...methods}>
              <ItemText title="제목" valueName="title" required />
              <ItemCategory title="태그" valueName="tagList" placeholder={item.tagList.list} />
            </FormProvider>
          </div>
        ) : (
          Array.isArray(item.tagList.list) &&
          item.tagList.list?.map((item2) => (
            <li key={item2} className="tag_btn">
              {item2}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
