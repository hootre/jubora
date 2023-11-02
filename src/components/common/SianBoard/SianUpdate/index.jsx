import { Accordion, AccordionDetails, AccordionSummary, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { SianUpdate_container } from './style';
import { useForm } from 'react-hook-form';
import { useSian } from 'hooks/supabase/sian/useSian';

export const SianUpdate = ({ data, index, expand, role, disabled }) => {
  console.log(disabled);
  // sian 관련
  const { useUpdateSian } = useSian();
  const { mutate: updateSian } = useUpdateSian();
  const [expanded, setExpanded] = useState(expand);
  // image 미리보기
  const onChangeImage = (e) => {
    e.preventDefault();
    const image = e.target.files[0];
    setValue(`main_img`, image);
    if (typeof image !== 'string' > 0) {
      if (image.size > 10485760) {
        setValue(`main_img`, '');
        toast.error('이미지 사이즈가 10mb보다 큽니다');
      } else {
        setValue(`image_preview`, URL.createObjectURL(image));
      }
    }
  };
  const handleChange = () => () => {
    setExpanded((prev) => !prev);
  };
  useEffect(() => {
    if (data.id) {
      setValue('id', data.id);
      setValue(`main_img`, data.main_img);
      setValue(`image_preview`, data.main_img);
    }
  }, []);
  const [isUploading, setIsUploading] = useState(false);
  const onSubmit = (data) => {
    setIsUploading(true);
    updateSian(data, {
      onSettled: () => {
        setIsUploading(false);
        reset();
      },
    });
  };
  // react hooks form
  const { register, setValue, handleSubmit, watch } = useForm();
  return (
    <SianUpdate_container>
      <Accordion expanded={expanded} onChange={handleChange()}>
        <AccordionSummary
          expandIcon={<FiChevronDown />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <h1>{`시안_${index + 1} ${data.user_text ? '(고객요청 등록완료)' : ''}`}</h1>
        </AccordionSummary>
        <AccordionDetails>
          <form className="sian_modify_box">
            {watch(`image_preview`) ? (
              <div className="skeleton_main_img">
                <img src={watch(`image_preview`)} className="main_image" alt="" />
              </div>
            ) : (
              <div className="skeleton_main_img">
                <h2>이미지를 등록해주세요</h2>
              </div>
            )}
            <div className="modify_box">
              <div className="sell_text">
                <h2>판매자 전달사항</h2>
                {data.admin_text ? (
                  <pre>{data.admin_text}</pre>
                ) : (
                  <textarea
                    placeholder={'전달사항을 입력해주세요'}
                    {...register('admin_text')}
                    disabled={disabled}
                  />
                )}
              </div>
              <div className="modify_text">
                <h2>구매자 수정요청</h2>
                <div className="textarea_box">
                  {data.user_text ? (
                    <pre>{data.user_text}</pre>
                  ) : (
                    <textarea
                      disabled={!data.admin_text || disabled}
                      placeholder="시안을 보시고 수정사항을 적어주세요"
                      {...register('user_text')}
                    />
                  )}
                </div>
              </div>
              <div className="sianupdate_btn_box">
                {role === 'admin' ? (
                  <div className="file_box">
                    <label htmlFor="file" className="sian_btn">
                      이미지 등록
                    </label>
                    <input
                      id="file"
                      type="file"
                      accept="image/*"
                      name="file"
                      onChange={(e) => onChangeImage(e)}
                    />
                  </div>
                ) : (
                  <div></div>
                )}
                {!disabled && (
                  <div className="sian_btn" disabled={isUploading} onClick={handleSubmit(onSubmit)}>
                    {isUploading ? '업로드중...' : '등록하기'}
                  </div>
                )}
              </div>
              <div className="caution_text">
                <h2>★확인사항★</h2>
                <p>1. 오타를 꼭 확인하여주세요.</p>
                <p>2. 시안 수정은 2회로 제안되어있습니다.</p>
                <p>
                  3. 최종 출력물과 모니터에서 확인하신 색상간의 차이가 있을 수 있습니다.
                  <span>(모니터는 RGB 칼라이고, 출력물은 CMYK 칼라입니다.)</span>
                </p>
                <p>4. 최종 교정 후의 출력물에 대해서는 책임을 지지 않습니다.</p>
                <p>5. 시안확인 후 입금과 출력요청을 하여야만 인쇄가 진행됩니다.</p>
                <p>6. 시안확인 후 출력을 취소했을 시 소정의 디자인비가 청구됩니다.</p>
              </div>
            </div>
          </form>
        </AccordionDetails>
      </Accordion>
    </SianUpdate_container>
  );
};
