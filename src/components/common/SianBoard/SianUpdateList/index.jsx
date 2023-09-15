import { Accordion, AccordionDetails, AccordionSummary, TextField } from '@mui/material';
import React, { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { SianUpdateList_container } from './style';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export const SianUpdateList = ({ data }) => {
  const [expanded, setExpanded] = useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const imageUploadSetValue = (e) => {
    if (watch('images')?.length === 3) {
      return toast.error('업로드는 3개까지 가능합니다');
    }
    if (watch('images')) {
      setValue('images', [...watch('images'), e.target.files[0]]);
    } else {
      setValue('images', [e.target.files[0]]);
    }
  };
  const deleteData = (img) => {
    setValue(
      'images',
      watch('images').filter((item) => item.name !== img.name)
    );
  };
  const onSubmit = (data) => {
    console.log(data);
  };
  // react hooks form
  const { register, setValue, handleSubmit, watch } = useForm();
  return (
    <SianUpdateList_container>
      <li>
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          <AccordionSummary
            expandIcon={<FiChevronDown />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <h1>시안_1</h1>
          </AccordionSummary>
          <AccordionDetails>
            <form className="sian_modify_box">
              <img src={data.image} alt="sian_img" />
              <div className="modify_box">
                <div className="sell_text">
                  <h2>판매자 전달사항</h2>
                  <p>이렇게 해서 이러쿵 저러쿵 하였습니다</p>
                </div>
                <div className="modify_text">
                  <h2>구매자 수정요청</h2>
                  <div className="textarea_box">
                    <textarea
                      placeholder="시안을 보시고 수정사항을 적어주세요"
                      {...register('text')}
                    />
                    <div className="file_list">
                      {watch('images')?.map((img) => (
                        <div key={img.size} className="file_text">
                          <span className="file_name">{img.name}</span>
                          <div className="delete_btn" onClick={() => deleteData(img)}>
                            삭제
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="sianupdate_btn_box">
                  <div className="file_box">
                    <label htmlFor="file" className="from_item_btn active">
                      첨부파일 등록
                    </label>
                    <input
                      id="file"
                      type="file"
                      accept="image/*"
                      name="file"
                      onChange={imageUploadSetValue}
                    />
                  </div>
                  <div className="submit" onClick={handleSubmit(onSubmit)}>
                    등록하기
                  </div>
                </div>
              </div>
            </form>
          </AccordionDetails>
        </Accordion>
      </li>
    </SianUpdateList_container>
  );
};
