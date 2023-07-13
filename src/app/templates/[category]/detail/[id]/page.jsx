'use client';
import React, { useCallback, useEffect, useState } from 'react';
import 'react-awesome-button/dist/styles.css';
import './styles.jsx';
import { useTemplates } from 'hooks/templates/useTemplates';
import { useForm } from 'react-hook-form';
import { Detail_container } from './styles.jsx';
import { FormControlLabel, MenuItem, Radio, RadioGroup, Select, TextField } from '@mui/material';
import { useUser } from 'hooks/auth/useUser.js';
import DaumPost from 'utils/kakaoMap/kakaoMap.jsx';
import PriceCalculate from 'utils/PriceCalculate.jsx';
import { toast } from 'react-hot-toast';
import { useOrder } from 'hooks/order/useOrder.js';

const detail = ({ params: { id } }) => {
  // 현재 id category 가져오기
  const { useGetOnlyTemplates } = useTemplates();
  const { data: datail_data, isLoading } = useGetOnlyTemplates(id);

  // user상태관리
  const { useGetUserInfo } = useUser();
  const { data: user, isLoading: userLoading } = useGetUserInfo();

  // kakaoMap Modal
  const [addressObj, setAddressObj] = useState();
  // form 데이터 관리
  const {
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
    watch,
    setValue,
    register,
  } = useForm();

  // KeyDown 관리
  const checkKeyDown = (e) => {
    if (e.key === 'Enter') e.preventDefault();
  };
  const handleKeydown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSizeOnChange();
    }
  };
  // Size 체크
  const handleSizeOnChange = () => {
    if (Number(watch('row')) < 70) {
      setValue('row', 70);
      toast.error('최소단위는 70cm 이상입니다');
    } else if (Number(watch('row')) > 2500) {
      setValue('row', 2500);
      toast.error('최대단위는 2500cm 이상입니다');
    }
    if (Number(watch('row')) % 5 !== 0) {
      setValue('row', Math.round(Number(watch('row')) / 10) * 10);
      toast.error('5cm 단위로 적어주세요');
    }
    if (Number(watch('col')) < 70) {
      setValue('col', 70);
      toast.error('최소단위는 70cm 이상입니다');
    } else if (Number(watch('col')) > 2500) {
      setValue('col', 2500);
      toast.error('최대단위는 2500cm 이상입니다');
    }
    if (Number(watch('col')) % 5 !== 0) {
      setValue('col', Math.round(Number(watch('col')) / 10) * 10);
      toast.error('5cm 단위로 적어주세요');
    }
    if (Number(watch('count')) > 10) {
      setValue('count', 10);
      toast.error('10개 이상은 문의 부탁드립니다.');
    } else if (Number(watch('count')) < 1) {
      setValue('count', 1);
      toast.error('1개 이상을 선택해주세요');
    }
    setPrice(PriceCalculate(Number(watch('row')), Number(watch('col')), Number(watch('count'))));
    console.log(watch('row'));
  };

  // 가격 상태 관리
  const [price, setPrice] = useState(20000);

  // 로그인 로그아웃 상태
  useEffect(() => {
    if (user) {
      setValue('isUser', true);
      setValue('name', user.name);
    }

    setValue('isUser', false);
    setValue('price', price);
    setValue('products_id', datail_data?.id);
    setValue('address_1', addressObj?.areaAddress);
    setValue('address_2', addressObj?.townAddress);
  }, [addressObj, price, datail_data, user]);

  const { useCreateOrder } = useOrder();
  const { mutate: createOrder } = useCreateOrder();
  const onSubmit = (data) => {
    console.log(data);
    createOrder(data);
    reset();
  };
  if (isLoading || userLoading) {
    return <h1>Loading</h1>;
  }

  return (
    <Detail_container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="productImgBox">
          <img src={datail_data.file} alt="" />
        </div>
        <div className="productContent">
          <div className="titleBox">
            <span className="subTitle">현수막/배너</span>
            <h2 className="title">{datail_data.title}</h2>
          </div>
          <div className="contentBox">
            {!user?.id && (
              <div className="noUser_box">
                <div className="option_container name_box">
                  <h2>이름/회사명</h2>
                  <TextField
                    fullWidth
                    label="이름/회사명"
                    variant="outlined"
                    type="text"
                    size="small"
                    required
                    onKeyDown={(e) => checkKeyDown(e)}
                    {...register('name')}
                  />
                </div>
                <div className="option_container phone_box">
                  <h2>비밀번호</h2>
                  <TextField
                    fullWidth
                    label="비밀번호(4자리)"
                    variant="outlined"
                    type="password"
                    size="small"
                    required
                    inputProps={{ maxLength: 4 }}
                    onKeyDown={(e) => checkKeyDown(e)}
                    {...register('password')}
                  />
                </div>
              </div>
            )}

            <div className="isUser_box">
              <div className="option_container radio_box">
                <h2>실내외구분</h2>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  required
                  onKeyDown={(e) => checkKeyDown(e)}
                  {...register('in_out_type')}
                >
                  <FormControlLabel value="실내" control={<Radio />} label="실내" />
                  <FormControlLabel value="실외" control={<Radio />} label="실외" />
                </RadioGroup>
              </div>
              <div className="option_container">
                <h2>마감형태</h2>
                <Select
                  id="demo-simple-select"
                  defaultValue={'재단(압정사용시)'}
                  fullWidth
                  size="small"
                  required
                  onKeyDown={(e) => checkKeyDown(e)}
                  {...register('corner_type')}
                >
                  <MenuItem value={'재단(압정사용시)'}>재단(압정사용시)</MenuItem>
                  <MenuItem value={'미싱(각목사용시) : 막대, 끈 포함'}>
                    미싱(각목사용시) : 막대, 끈 포함
                  </MenuItem>
                  <MenuItem value={'고리(사면 납작한 끈으로)'}>고리(사면 납작한 끈으로)</MenuItem>
                  <MenuItem value={'펀칭(모서리 금속으로 구멍처리)'}>
                    펀칭(모서리 금속으로 구멍처리)
                  </MenuItem>
                  <MenuItem value={'로프미싱(대형 현수막 사면 로프)'}>
                    로프미싱(대형 현수막 사면 로프)
                  </MenuItem>
                </Select>
              </div>
              <div className="option_container">
                <h2>크기</h2>
                <div className="size_box">
                  <div className="row">
                    <TextField
                      fullWidth
                      label="가로"
                      variant="outlined"
                      type="number"
                      size="small"
                      required
                      defaultValue={180}
                      onKeyDown={handleKeydown}
                      error={errors.row}
                      helperText={errors.row && '1~999'}
                      {...register('row', {
                        onBlur: handleSizeOnChange,
                        pattern: /^[0-9]{2,3}$/,
                      })}
                    />
                  </div>
                  <span>x</span>
                  <div className="col">
                    <TextField
                      fullWidth
                      label="세로"
                      variant="outlined"
                      type="number"
                      size="small"
                      required
                      defaultValue={70}
                      onKeyDown={handleKeydown}
                      error={errors.col}
                      helperText={errors.col && '1~999'}
                      {...register('col', {
                        onBlur: handleSizeOnChange,
                        pattern: /^[0-9]{2,3}$/,
                      })}
                    />
                  </div>
                  <div className="count">
                    <TextField
                      fullWidth
                      label="개수"
                      type="number"
                      variant="outlined"
                      size="small"
                      required
                      defaultValue={1}
                      onKeyDown={handleKeydown}
                      error={errors.count}
                      helperText={errors.count && '1~99'}
                      {...register('count', {
                        onBlur: handleSizeOnChange,
                        pattern: /^[0-9]{1,2}$/,
                      })}
                    />
                  </div>
                  <span>개</span>
                </div>
              </div>
              <div className="option_container phone_box">
                <h2>전화번호</h2>
                <TextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  size="small"
                  required
                  placeholder="ex)01012345678"
                  inputProps={{ maxLength: 11 }}
                  onKeyDown={(e) => checkKeyDown(e)}
                  error={errors.phone}
                  helperText={errors.phone && '전화번호 형식에 맞춰라'}
                  {...register('phone', {
                    pattern: /^[0-9]{8,11}$/,
                  })}
                />
              </div>
              <div className="option_container">
                <h2>수령주소</h2>
                <div className="address_content">
                  <div className="address_btn_box">
                    <DaumPost setAddressObj={setAddressObj} />
                    <TextField
                      fullWidth
                      variant="outlined"
                      type="text"
                      onKeyDown={(e) => checkKeyDown(e)}
                      value={addressObj?.areaAddress || ''}
                      size="small"
                      {...register('address_1')}
                    />
                  </div>
                  <div>
                    <TextField
                      fullWidth
                      variant="outlined"
                      type="text"
                      onKeyDown={(e) => checkKeyDown(e)}
                      value={addressObj?.townAddress || ''}
                      size="small"
                      {...register('address_2')}
                    />
                  </div>
                  <div>
                    <TextField
                      fullWidth
                      variant="outlined"
                      type="text"
                      size="small"
                      placeholder="상세주소"
                      onKeyDown={(e) => checkKeyDown(e)}
                      {...register('address_3')}
                    />
                  </div>
                </div>
              </div>
              <div className=" option_container contents">
                <h2>주문내용</h2>
                <TextField
                  id="outlined-multiline-static"
                  label="주문내용"
                  multiline
                  fullWidth
                  rows={4}
                  {...register('contents')}
                />
              </div>
              <div className="option_container contents">
                <h2>파일</h2>
                <input type="file" accept="image/*" name="file" {...register('file')} />
              </div>

              {/* <div className="contentText">
                <h2>참고사항</h2>
                <p>사이즈의 짧은 쪽이 180cm를 초과한다면 대형 현수막 상품으로 주문해주세요.</p>
              </div> */}
            </div>
            <div className="purchaseBox">
              <div className="priceBox">
                <div className="price">
                  <h2>{price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</h2>
                </div>
                <button disabled={isSubmitting} className="basic_button">
                  주문하기
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Detail_container>
  );
};
export default detail;
