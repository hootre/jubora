import React from 'react';
import { SianBoardDetail_container } from './style';
import { DiBrackets } from 'react-icons/di';
import { FiChevronDown } from 'react-icons/fi';
import { Accordion, AccordionDetails, AccordionSummary, TextField } from '@mui/material';
import { useState } from 'react';
export const SianBoardDetail = ({
  data: {
    id,
    title,
    name,
    state,
    image,
    contents,
    row,
    col,
    count,
    item_1,
    item_2,
    price,
    item_3,
    item_4,
    item_5,
    item_6,
    item_7,
    adderss_1,
    adderss_2,
    adderss_3,
    created_at,
  },
}) => {
  const [expanded, setExpanded] = useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  return (
    <SianBoardDetail_container>
      <section>
        <div className="title_box">
          <DiBrackets className="icon" />
          <h1>시안확인</h1>
        </div>
        <table>
          <th>진행상태</th>
          <th>수정횟수</th>
          <tr>
            <td>{state}</td>
            <td>3</td>
          </tr>
        </table>
        <ul>
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
                <table>
                  <th>시안번호</th>
                  <th>이름/교회명</th>
                  <th>사이즈</th>
                  <th>수량</th>
                  <th>{item_1.title}</th>
                  <th>{item_2.title}</th>
                  <th>가격</th>
                  <tr>
                    <td>{id}</td>
                    <td>{name}</td>
                    <td>{`${row}cm X ${col}cm`}</td>
                    <td>{count}</td>
                    <td>{item_1.content}</td>
                    <td>{item_2.content}</td>
                    <td>{price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</td>
                  </tr>
                </table>
                <div className="sian_modify_box">
                  <img src={image} alt="sian_img" />
                  <div className="modify_box">
                    <div className="sell_text">
                      <h2>판매자 전달사항</h2>
                      <p>이렇게 해서 이러쿵 저러쿵 하였습니다</p>
                    </div>
                    <div className="modify_text">
                      <h2>구매자 수정요청</h2>
                      <TextField
                        className="textarea"
                        id="outlined-multiline-static"
                        multiline
                        placeholder="시안을 보시고 수정사항을 적어주세요"
                        rows={4}
                      />
                    </div>
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>
          </li>
        </ul>

        <div className="btn_box">
          <button className="modify_byn">출력승인</button>
        </div>
      </section>
      <section>
        <div className="title_box">
          <DiBrackets className="icon" />
          <h1>주문정보</h1>
        </div>
        <table>
          <th>시안번호</th>
          <th>이름/교회명</th>
          <th>사이즈</th>
          <th>수량</th>
          <th>{item_1.title}</th>
          <th>{item_2.title}</th>
          <th>가격</th>
          <tr>
            <td>{id}</td>
            <td>{name}</td>
            <td>{`${row}cm X ${col}cm`}</td>
            <td>{count}</td>
            <td>{item_1.content}</td>
            <td>{item_2.content}</td>
            <td>{price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</td>
          </tr>
        </table>
      </section>
      <section>
        <div className="title_box">
          <DiBrackets className="icon" />
          <h1>결제하기</h1>
        </div>
      </section>
    </SianBoardDetail_container>
  );
};
