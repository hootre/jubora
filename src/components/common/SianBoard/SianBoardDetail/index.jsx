import React from 'react';
import { SianBoardDetail_container } from './style';
import { DiBrackets } from 'react-icons/di';
import { SianUpdateList } from '../SianUpdateList';
export const SianBoardDetail = ({ data }) => {
  return (
    <SianBoardDetail_container>
      <section>
        <div className="title_box">
          <div className="title">
            <DiBrackets className="icon" />
            <h1>시안확인</h1>
          </div>
          <div className="modify_btn">수정하기</div>
        </div>
        <table>
          <thead>
            <tr>
              <th>진행상태</th>
              <th>수정횟수</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{data.state}</td>
              <td>3</td>
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
              <th>사이즈</th>
              <th>수량</th>
              <th>가격</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{data.id}</td>
              <td>{data.name}</td>
              <td>{data.phone}</td>
              <td>{`${data.address_1} ${data.address_2} ${data.address_3}`}</td>
              <td>{`${data.row}cm X ${data.col}cm`}</td>
              <td>{data.count}</td>
              <td>{data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</td>
            </tr>
          </tbody>
        </table>
        <table>
          <thead>
            <tr>
              <th>{data.item_1.title}</th>
              <th>{data.item_2.title}</th>
              {data.item_3.title && <th>{data.item_3.title}</th>}
              <th>가격</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{data.item_1.content}</td>
              <td>{data.item_2.content}</td>
              <td>{data.item_3.content}</td>
              <td>{data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</td>
            </tr>
          </tbody>
        </table>
        <SianUpdateList data={data} />

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
          <thead>
            <tr>
              <th>시안번호</th>
              <th>이름/교회명</th>
              <th>사이즈</th>
              <th>수량</th>
              <th>{data.item_1.title}</th>
              <th>{data.item_2.title}</th>
              <th>가격</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{data.id}</td>
              <td>{data.name}</td>
              <td>{`${data.row}cm X ${data.col}cm`}</td>
              <td>{data.count}</td>
              <td>{data.item_1.content}</td>
              <td>{data.item_2.content}</td>
              <td>{data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</td>
            </tr>
          </tbody>
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
