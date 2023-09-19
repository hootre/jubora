'use client';
import React, { useEffect } from 'react';
import { MyInfo_container } from './style';
import { useUser } from 'hooks/supabase/auth/useUser';
import { FormProvider, useForm } from 'react-hook-form';
import { useState } from 'react';
import { ConfirmBtn } from 'components/common/ConfirmBtn';
import { Item_text } from 'components/home/Order/Order_writer_Item/Item_text';
import { Item_address } from 'components/home/Order/Order_writer_Item/Item_address';

export const MyInfo = () => {
  // 유저 정보
  const { useGetUserInfo, useUpdateUser, useDelete } = useUser();
  const { data: userData, isLoading } = useGetUserInfo();

  const { mutate: deleteUser } = useDelete();
  const { mutate: updateUser } = useUpdateUser();
  const methods = useForm();
  const { handleSubmit, setValue } = methods;

  // 기본 세팅
  useEffect(() => {
    if (userData) {
      setValue('id', userData.id);
      setValue('email', userData.email);
      setValue('name', userData.name);
      setValue('phone', userData.phone);
      setValue('address_1', userData.address_1);
      setValue('address_2', userData.address_2);
      setValue('address_3', userData.address_3);
    }
  }, [userData]);

  const onSubmit = (data) => {
    updateUser(data);
  };
  // 회원탈퇴 모달 관리
  const [openState, setOpenState] = useState(false);
  const handleOpen = () => {
    setOpenState(true);
  };
  const handleClose = () => setOpenState(false);

  if (isLoading) {
    return <h1>Loading</h1>;
  }
  return (
    <MyInfo_container>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form_box">
            <div className="productContent">
              <div className="contentBox">
                <div className="noUser_box">
                  <Item_text title="이름/회사명" valueName="name" />
                  <Item_text title="아이디" valueName="email" disabled />
                  <Item_text title="전화번호" valueName="phone" />
                  <Item_text title="비밀번호" valueName="password" />
                </div>
                <Item_address title="주소" />
                <div className="btn_box">
                  <button className="update_btn">수정하기</button>
                  <ConfirmBtn
                    openState={openState}
                    title="회원탈퇴"
                    handleOpen={handleOpen}
                    handleClose={handleClose}
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </FormProvider>
    </MyInfo_container>
  );
};
