import { FormControl, MenuItem, Select } from '@mui/material';
import { Order_Update_container } from './style';
import { useFormContext } from 'react-hook-form';
import { useOrderSetting } from 'hooks/supabase/order/orderSetting/useOrderSetting';
import { useCallback, useEffect, useState } from 'react';
import PriceCalculate from 'utils/PriceCalculate';
import toast from 'react-hot-toast';
import { BasicModal } from 'components/common/Modal/BasicModal';
import { Select_Showcase } from '../Order_Detail/Select_Showcase';
import { MainLoading } from 'components/Loading/MainLoading';
export const Order_Update = ({ data, role }) => {
  // order from 셋팅
  const order_setting_for = ['item_1', 'item_2', 'item_3', 'item_4', 'item_5', 'item_6', 'item_7'];
  // 초기 주문 항목 리스트
  const { useGetOnlyOrderSetting } = useOrderSetting();
  const { data: orderSettingData, isLoading } = useGetOnlyOrderSetting(data.template_type);
  // react hooks form
  const { register, setValue, watch } = useFormContext();

  // 샘플선택
  const [open, setOpen] = useState(false);
  const toaggleModal = () => {
    setOpen((prev) => !prev);
  };

  const onChangeItemInput = (e, itemName) => {
    setValue(itemName, {
      title: data[itemName].title,
      content: e.target.value,
    });
  };
  const onChangeItem = (e, itemName) => {
    if (e.target.value === '기타') {
      setValue(`${itemName}_etc`, true);
      setValue(itemName, {
        title: data[itemName].title,
        content: data[itemName]?.content,
      });
    } else {
      setValue(`${itemName}_etc`, false);
    }
    setValue(itemName, {
      title: orderSettingData[itemName]?.title,
      content: e.target.value,
    });
  };
  // 초기값 설정
  useEffect(() => {
    if (orderSettingData) {
      order_setting_for.map((item) => {
        setValue(item, {
          title: orderSettingData[item]?.title,
          content: data[item]?.content,
        });
      });
    }
    setValue('id', data.id);
    setValue('image', data.image);
    setValue('name', data.name);
    setValue('phone', data.phone);
    setValue('contents', data.contents);
    setValue('address_1', data.address_1);
    setValue('address_2', data.address_2);
    setValue('address_3', data.address_3);
    setValue('zonecode', data.zonecode);
    setValue('row', data.row);
    setValue('col', data.col);
    setValue('count', data.count);
    setValue('price', data.price);
  }, [orderSettingData]);
  // Size 체크
  const handleSizeOnChange = useCallback(() => {
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
    setValue(
      'price',
      PriceCalculate(Number(watch('row')), Number(watch('col')), Number(watch('count')))
    );
  }, []);

  if (isLoading) {
    return <MainLoading />;
  }
  return (
    <Order_Update_container>
      <table>
        <thead>
          <tr>
            <th>선택이미지</th>
            <th>진행상태</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <img src={watch('image')} alt="select_img" className="select_img" />
              {/* <button onClick={toaggleModal} className="sample_btn" type="button" value="샘플선택">
                샘플선택 +
              </button>
              <BasicModal state={open} onClose={toaggleModal}>
                <Select_Showcase category={data.category_type} toaggleModal={toaggleModal} />
              </BasicModal> */}
            </td>
            <td>
              {role === 'admin' ? (
                <FormControl sx={{ minWidth: 150 }} size="small">
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    defaultValue={data.state}
                    {...register('state')}
                  >
                    <MenuItem value="확인전">확인전</MenuItem>
                    <MenuItem value="시안제작중">시안확인</MenuItem>
                    <MenuItem value="출력승인">출력승인</MenuItem>
                    <MenuItem value="인쇄중">인쇄중</MenuItem>
                    <MenuItem value="배송중">배송중</MenuItem>
                    <MenuItem value="배송완료">배송완료</MenuItem>
                  </Select>
                </FormControl>
              ) : (
                data.state
              )}
            </td>
          </tr>
        </tbody>
      </table>
      <table>
        <thead>
          <tr>
            <th>요청사항</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <textarea
                placeholder="시안을 보시고 수정사항을 적어주세요"
                {...register('contents')}
              />
              {data.file && (
                <div className="file_img">
                  <p>-----------------------</p>
                  <h2>첨부파일</h2>
                  <img src={data.file} alt="select_img" className="select_img" />
                </div>
              )}
            </td>
          </tr>
        </tbody>
      </table>
      <table>
        <thead>
          <tr>
            <th>시안번호</th>
            <th>이름/교회명</th>
            <th>전화번호</th>
            <th>주소</th>
            <th>우편번호</th>
            <th>사이즈</th>
            <th>수량</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{data.id}</td>
            <td>
              <input type="text" {...register('name')} />
            </td>
            <td>
              <input
                type="text"
                {...register('phone', {
                  pattern: /^[0-9]{8,11}$/,
                })}
              />
            </td>
            <td>
              <div>
                <input type="text" {...register('address_1')} />
              </div>
              <div>
                <input type="text" {...register('address_2')} />
              </div>
              <div>
                <input type="text" {...register('address_3')} />
              </div>
            </td>
            <td>
              <div>
                <input type="text" {...register('zonecode')} />
              </div>
            </td>
            <td>
              <div>
                <label htmlFor="row">가로</label>
                <input
                  id="row"
                  type="number"
                  {...register('row', {
                    onBlur: handleSizeOnChange,
                    pattern: /^[0-9]{2,4}$/,
                  })}
                />
              </div>
              <div>
                <label htmlFor="col">세로</label>
                <input
                  id="col"
                  type="number"
                  {...register('col', {
                    onBlur: handleSizeOnChange,
                    pattern: /^[0-9]{2,4}$/,
                  })}
                />
              </div>
            </td>
            <td>
              <input
                type="number"
                {...register('count', {
                  onBlur: handleSizeOnChange,
                  pattern: /^[0-9]{1,2}$/,
                })}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <table>
        <thead>
          <tr>
            {order_setting_for.map(
              (item, idx) => data[item]?.title && <th key={idx}>{data[item].title}</th>
            )}
            <th>가격</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {order_setting_for.map(
              (itemName, idx) =>
                data[itemName]?.title && (
                  <td key={idx}>
                    <div className="selete_box">
                      <FormControl sx={{ minWidth: 150 }} size="small">
                        <Select
                          labelId="demo-select-small-label"
                          id="demo-select-small"
                          defaultValue={
                            orderSettingData[itemName]?.list.includes(data[itemName].content)
                              ? data[itemName].content
                              : '기타'
                          }
                          onChange={(e) => onChangeItem(e, itemName)}
                        >
                          {orderSettingData[itemName].title !== '' &&
                            orderSettingData[itemName]?.list.map((item, idx) => {
                              return (
                                <MenuItem key={idx} value={item}>
                                  {item}
                                </MenuItem>
                              );
                            })}

                          <MenuItem value={'기타'}>기타</MenuItem>
                        </Select>
                      </FormControl>
                      {watch(`${itemName}_etc`) && (
                        <input
                          type="text"
                          className="C_basic_input"
                          value={watch(itemName).content}
                          onChange={(e) => onChangeItemInput(e, itemName)}
                        />
                      )}
                    </div>
                  </td>
                )
            )}
            <td>
              {role === 'admin' ? (
                <>
                  <input type="number" {...register('price')} />원
                </>
              ) : (
                <>{data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </Order_Update_container>
  );
};
