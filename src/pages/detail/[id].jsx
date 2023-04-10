import React, { useRef, useState } from 'react';
import { DetailBox } from './styles';
import { useRouter } from 'next/router';
import { AiFillCaretDown, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';
import dynamic from 'next/dynamic';
import { Option } from 'components/Detail/Option';

const NoSsrEditor = dynamic(() => import('components/Detail/Editor'), {
  ssr: false,
});
const detail = () => {
  const router = useRouter();
  const { id } = router.query;
  const ref = useRef(null);

  return (
    <DetailBox>
      <div className="productImgBox">
        <div className="img"></div>
      </div>
      <div className="productContent">
        <div className="titleBox">
          <span className="subTitle">현수막/배너</span>
          <h2 className="title">부활절 현수막</h2>
        </div>
        <div className="contentBox">
          <ul>
            <Option />
            <Option />
            <Option />
          </ul>
          <div className="editor">
            <h2>주문내용</h2>
            <NoSsrEditor content="" editorRef={ref} />
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
              <input type="text" value={1} />
              <AiOutlinePlus className="icon" />
            </div>
            <div className="price">
              <h2>17,900원</h2>
            </div>
          </div>
          <AwesomeButton type="primary">주문하기</AwesomeButton>
        </div>
      </div>
    </DetailBox>
  );
};
export default detail;
