'use client';
import React, { useRef } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import 'react-awesome-button/dist/styles.css';
import dynamic from 'next/dynamic';
import './styles.jsx';
import { usePathname } from 'next/navigation';
import { useTemplates } from 'hooks/templates/useTemplates';
import { useForm } from 'react-hook-form';
import { Detail_container } from './styles.jsx';
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';

const detail = ({ params: { id } }) => {
  let pathName = usePathname().split('/')[2];
  const ref = useRef(null);
  const { useGetTemplates } = useTemplates();
  const { data: templatesList, isLoading } = useGetTemplates(pathName);
  const {
    handleSubmit,
    formState: { isValid, isSubmitting, errors },
    trigger,
    register,
    watch,
  } = useForm();
  const onSubmit = (data) => console.log(data);
  if (isLoading) {
    return <h1>Loading</h1>;
  }
  const detailItem = templatesList.filter((item) => item.id == id)[0];

  return (
    <Detail_container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="productImgBox">
          <img src={detailItem.file} alt="" />
        </div>
        <div className="productContent">
          <div className="titleBox">
            <span className="subTitle">현수막/배너</span>
            <h2 className="title">{detailItem.title}</h2>
          </div>
          <div className="contentBox">
            <div className="option_container radio_box">
              <h2>실내외구분</h2>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                {...register('in_out_type', { required: '실내외구분' })}
              >
                <FormControlLabel value="실내" control={<Radio />} label="실내" />
                <FormControlLabel value="실외" control={<Radio />} label="실외" />
              </RadioGroup>
            </div>
            <div className="option_container">
              <h2>마감형태</h2>
              <select
                className="option_box"
                id="corner_type"
                defaultValue=""
                name="corner_type"
                {...register('corner_type', { required: '마감형태를 선택해주세요' })}
              >
                <option value="1">
                  <span>실내용</span>
                </option>
                <option value="2">
                  <span>실외용</span>
                </option>
              </select>
            </div>
            <div className="contents">
              <h2>주문내용</h2>
              <textarea
                id="contents"
                type="text"
                placeholder="주문내용"
                {...register('contents')}
              />
            </div>
            <div className="contentText">
              <h2>참고사항</h2>
              <p>사이즈의 짧은 쪽이 180cm를 초과한다면 대형 현수막 상품으로 주문해주세요.</p>
            </div>
          </div>
          <div className="purchaseBox">
            <div className="priceBox">
              <div className="count">
                <AiOutlineMinus className="icon" />
                <input type="text" defaultValue={1} />
                <AiOutlinePlus className="icon" />
              </div>
              <div className="price">
                <h2>17,900원</h2>
              </div>
            </div>
            <button type="submit" disabled={isSubmitting} className="basic_button">
              주문하기
            </button>
          </div>
        </div>
      </form>
    </Detail_container>
  );
};
export default detail;
