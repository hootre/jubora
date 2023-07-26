'use client';
import React, { useEffect, useState } from 'react';
import 'react-awesome-button/dist/styles.css';
import './styles.jsx';
import { useForm } from 'react-hook-form';
import { Detail_container } from './styles.jsx';
import { Backdrop, Box, Fade, Modal, TextField } from '@mui/material';

import DaumPost from 'utils/kakaoMap/kakaoMap.jsx';
import PriceCalculate from 'utils/PriceCalculate.jsx';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation.js';
import { Showcase } from 'components/Templates/Showcase/index.jsx';
import { useTemplates } from 'hooks/supabase/templates/useTemplates.js';
import { useUser } from 'hooks/supabase/auth/useUser.js';
import { useOrder } from 'hooks/supabase/order/useOrder.js';

const detail = ({ params: { id } }) => {
  // 현재 id category 가져오기
  const { useGetOnlyTemplate } = useTemplates();
  const { data: detail_data, isLoading } = useGetOnlyTemplate(id);

  // user상태관리
  const { useGetUserInfo } = useUser();
  const { data: user, isLoading: userLoading } = useGetUserInfo();
  // Order 생성
  const { useCreateOrder } = useOrder();
  const { mutate: createOrder } = useCreateOrder();

  // 샘플선택

  const [open, setOpen] = useState(false);
  const handleSampleDesignModal = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  // kakaoMap Modal
  const [addressObj, setAddressObj] = useState();
  // form 데이터 관리
  const {
    handleSubmit,
    formState: { isSubmitting, errors },
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
  };
  // 가격 상태 관리
  const [price, setPrice] = useState(20000);

  // 로그인 로그아웃 상태
  useEffect(() => {
    console.log(detail_data);
    if (user) {
      setValue('writer_user_email', user.email);
      setValue('name', user.name);
    }
    // 기본 값
    if (isLoading) {
      setValue('category', '현수막');
      setValue('in_out_type', '실내');
      setValue('corner_type', '열재단');
    }
    setValue('state', '확인전');
    setValue('price', price);
    setValue('title', detail_data?.title);
    setValue('image', detail_data?.file);
    setValue('products_id', detail_data?.id);

    setValue('address_1', addressObj?.areaAddress);
    setValue('address_2', addressObj?.townAddress);
  }, [isLoading, addressObj, price, detail_data, user]);

  const router = useRouter();
  const onSubmit = (data) => {
    console.log(data);
    // createOrder(data);
    // router.push('/order');
  };
  if (isLoading || userLoading) {
    return <h1>Loading</h1>;
  }
  return (
    <Detail_container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form_box">
          <div className="productImgBox">
            <div>
              <h1>선택 이미지</h1>
              <img src={detail_data.file} alt="" />
            </div>
            <button
              onClick={handleSampleDesignModal}
              className="sample_btn"
              type="button"
              value="샘플선택"
            >
              샘플선택 +
            </button>
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              open={open}
              onClose={handleClose}
              closeAfterTransition
              slots={{ backdrop: Backdrop }}
              slotProps={{
                backdrop: {
                  timeout: 500,
                },
              }}
            >
              <Fade in={open}>
                <Box>
                  <div className="showcase_box">
                    <Showcase category={detail_data.category} />
                  </div>
                </Box>
              </Fade>
            </Modal>
          </div>
          <div className="productContent">
            <div className="contentBox">
              <div className="noUser_box">
                <div className="option_container name_box">
                  {!user?.id && (
                    <>
                      <h2>이름/회사명</h2>
                      <TextField
                        variant="outlined"
                        type="text"
                        size="small"
                        required
                        placeholder="이름/회사명"
                        onKeyDown={(e) => checkKeyDown(e)}
                        {...register('name')}
                      />
                      <h2>비밀번호</h2>
                      <TextField
                        variant="outlined"
                        type="password"
                        size="small"
                        required
                        placeholder="비밀번호"
                        inputProps={{ maxLength: 4 }}
                        onKeyDown={(e) => checkKeyDown(e)}
                        {...register('password')}
                      />
                    </>
                  )}
                  <h2>전화번호</h2>
                  <TextField
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
              </div>
              <div className="option_container">
                <h2>제품선택</h2>
                <div className="from_item_btn_box">
                  <button
                    className={
                      watch('category') === '현수막' ? 'from_item_btn active' : `from_item_btn`
                    }
                    type="button"
                    value="현수막"
                    onClick={(e) => setValue('category', e.target.value)}
                  >
                    현수막
                  </button>
                  <button
                    className={
                      watch('category') === '배너' ? 'from_item_btn active' : `from_item_btn`
                    }
                    type="button"
                    value="배너"
                    onClick={(e) => setValue('category', e.target.value)}
                  >
                    배너
                  </button>
                </div>
              </div>
              <div className="option_container">
                <h2>실내외구분</h2>
                <div className="from_item_btn_box">
                  <button
                    className={
                      watch('in_out_type') === '실내' ? 'from_item_btn active' : `from_item_btn`
                    }
                    type="button"
                    value="실내"
                    onClick={(e) => setValue('in_out_type', e.target.value)}
                  >
                    실내
                  </button>
                  <button
                    className={
                      watch('in_out_type') === '실외' ? 'from_item_btn active' : `from_item_btn`
                    }
                    type="button"
                    value="실외"
                    onClick={(e) => setValue('in_out_type', e.target.value)}
                  >
                    실외
                  </button>
                </div>
              </div>
              <div className="option_container">
                <h2>마감형태</h2>
                <div className="from_item_btn_box">
                  <button
                    className={
                      watch('corner_type') === '열재단' ? 'from_item_btn active' : `from_item_btn`
                    }
                    type="button"
                    value="열재단"
                    onClick={(e) => setValue('corner_type', e.target.value)}
                  >
                    열재단
                  </button>
                  <button
                    className={
                      watch('corner_type') === '펀칭' ? 'from_item_btn active' : `from_item_btn`
                    }
                    type="button"
                    value="펀칭"
                    onClick={(e) => setValue('corner_type', e.target.value)}
                  >
                    펀칭
                  </button>
                  <button
                    className={
                      watch('corner_type') === '고리' ? 'from_item_btn active' : `from_item_btn`
                    }
                    type="button"
                    value="고리"
                    onClick={(e) => setValue('corner_type', e.target.value)}
                  >
                    고리
                  </button>
                </div>
              </div>
              <div className="option_container">
                <h2>크기</h2>
                <div className="size_box">
                  <div className="row">
                    <TextField
                      variant="outlined"
                      type="text"
                      size="small"
                      required
                      placeholder="가로"
                      defaultValue={180}
                      onKeyDown={handleKeydown}
                      error={errors.row}
                      helperText={errors.row && '1~999'}
                      {...register('row', {
                        onBlur: handleSizeOnChange,
                        pattern: /^[0-9]{2,3}$/,
                      })}
                    />
                    cm
                  </div>
                  <span>x</span>
                  <div className="col">
                    <TextField
                      variant="outlined"
                      type="text"
                      size="small"
                      required
                      placeholder="세로"
                      defaultValue={70}
                      onKeyDown={handleKeydown}
                      error={errors.col}
                      helperText={errors.col && '1~999'}
                      {...register('col', {
                        onBlur: handleSizeOnChange,
                        pattern: /^[0-9]{2,3}$/,
                      })}
                    />
                    cm
                  </div>
                  <div className="count">
                    <TextField
                      type="text"
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
                    개
                  </div>
                </div>
              </div>
              <div className="option_container">
                <h2>수령주소</h2>
                <div className="address_content">
                  <div className="address_btn_box">
                    <DaumPost setAddressObj={setAddressObj} />
                    <TextField
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
                      className="address_input"
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
                      className="address_input"
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
                  className="textarea"
                  id="outlined-multiline-static"
                  label="주문내용"
                  multiline
                  rows={4}
                  {...register('contents')}
                />
              </div>
              <div className="option_container file_box">
                <h2>파일</h2>
                <label htmlFor="file" className="from_item_btn active">
                  첨부파일 등록
                </label>
                <input id="file" type="file" accept="image/*" name="file" {...register('file')} />
                {watch('file')?.[0]?.name && (
                  <div className="file_text">
                    <span className="file_name">{watch('file')[0].name}</span>
                  </div>
                )}
              </div>

              {/* <div className="contentText">
                <h2>참고사항</h2>
                <p>사이즈의 짧은 쪽이 180cm를 초과한다면 대형 현수막 상품으로 주문해주세요.</p>
              </div> */}
            </div>
          </div>
        </div>
        <div className="side_detail">
          <h1>상세보기</h1>
          <div className="side_content">
            <img src="https://www.nuriad.co.kr/data/bbsData/16376633441.jpg" alt="" />
            <h1>사방 타공</h1>
            <p>
              상하 또는 좌우 중 짧은 쪽 폭에 원형막대를 넣어 고정한 뒤, 로프를 엮어드리는
              방법입니다. 로프까지 완조립되어 있어 간편하게 외부에 시공할 수 있습니다. 비용이
              저렴하여 게릴라 홍보용 현수막에 주로 사용됩니다. ★90cm 폭 이하에서만 주문이
              가능합니다★
            </p>
            <div className="price">
              <h1>총 가격</h1>
              <h2>{price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</h2>
            </div>
          </div>

          <div className="purchaseBox">
            <button disabled={isSubmitting} className="basic_button">
              주문하기
            </button>
          </div>
        </div>
      </form>
    </Detail_container>
  );
};
export default detail;
