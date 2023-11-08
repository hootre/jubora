'use client';

import React, { useEffect, useState } from 'react';
import User from 'hooks/supabase/auth/useUser';
import { FormProvider, useForm } from 'react-hook-form';

import DeleteAuthBtn from 'components/common/DeleteAuthBtn';
import MainLoading from 'components/Loading/MainLoading';
import ItemText from 'components/home/Order/OrderWriterItem/ItemText';
import ItemAddress from 'components/home/Order/OrderWriterItem/ItemAddress';
import MyInfoContainer from './style';

export default function MyInfo() {
  // 유저 정보
  const { useGetUserInfo, useUpdateUser } = User();
  const { data: userData, isLoading } = useGetUserInfo();

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
      setValue('address1', userData.address1);
      setValue('address2', userData.address2);
      setValue('address3', userData.address3);
      setValue('zonecode', userData.zonecode);
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
    return <MainLoading />;
  }
  return (
    <MyInfoContainer>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form_box">
            <div className="productContent">
              <div className="contentBox">
                <div className="noUser_box">
                  <ItemText title="이름/회사명" valueName="name" />
                  <ItemText title="아이디" valueName="email" disabled />
                  <ItemText title="전화번호" valueName="phone" />
                  {/* <ItemText title="비밀번호" valueName="password" /> */}
                </div>
                <ItemAddress title="주소" />
                <div className="btn_box">
                  <button type="button" className="update_btn">
                    수정하기
                  </button>
                  <DeleteAuthBtn
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
    </MyInfoContainer>
  );
}
