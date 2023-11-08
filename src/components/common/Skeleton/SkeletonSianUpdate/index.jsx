import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import React, { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import toast from 'react-hot-toast';
import SkeletonSianUpdateContainer from './style';

export default function SkeletonSianUpdate() {
  const [expanded, setExpanded] = useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const onMessage = () => {
    toast.error('시안 제작 후에 가능합니다');
  };
  return (
    <SkeletonSianUpdateContainer>
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
            <div className="skeleton_mainImg">
              <h2>시안 준비중</h2>
            </div>
            <div className="modify_box">
              <div className="sell_text">
                <h2>판매자 전달사항</h2>
                <p />
              </div>
              <div className="modify_text">
                <h2>구매자 수정요청</h2>
                <div className="textarea_box">
                  <textarea placeholder="시안 제작 후 요청해주세요" disabled />
                </div>
              </div>
              <div className="sianupdate_btn_box">
                <button type="button" className="submit" onClick={onMessage}>
                  등록하기
                </button>
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
    </SkeletonSianUpdateContainer>
  );
}
