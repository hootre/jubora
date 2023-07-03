'use client';
import React, { useRef } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import 'react-awesome-button/dist/styles.css';
import dynamic from 'next/dynamic';
import { Option } from 'components/Detail/Option';
import './Detail.scss';
import Link from 'next/link';
const NoSsrEditor = dynamic(() => import('components/Detail/Editor'), {
  ssr: false,
});
const detail = ({ id }) => {
  const ref = useRef(null);
  console.log(id);

  return (
    <section className="datail_contaniner">
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
              <input type="text" defaultValue={1} />
              <AiOutlinePlus className="icon" />
            </div>
            <div className="price">
              <h2>17,900원</h2>
            </div>
          </div>
          <Link href="/" className="basic_button">
            주문하기
          </Link>
        </div>
      </div>
    </section>
  );
};
export default detail;
