import { orderSettingFor } from 'assets/data';
import OrderDataTableContainer from './style';

export default function OrderDataTable({ data }) {
  return (
    <OrderDataTableContainer>
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
              <img src={data.image} alt="select_img" className="select_img" />
            </td>
            <td>{data.state}</td>
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
              <pre>{data.contents}</pre>
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
            <td>{data.name}</td>
            <td>{data.phone}</td>
            <td>{`${data.address1} ${data.address2} ${data.address3} `}</td>
            <td>{`${data.zonecode}`}</td>
            <td>{`${data.row}cm X ${data.col}cm`}</td>
            <td>{data.count}</td>
          </tr>
        </tbody>
      </table>
      <table>
        <thead>
          <tr>
            {orderSettingFor.map(
              (item) => data[item]?.title && <th key={item}>{data[item].title}</th>
            )}
            <th>가격</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {orderSettingFor.map(
              (item) => data[item]?.content && <td key={item}>{data[item].content}</td>
            )}
            <td>{data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</td>
          </tr>
        </tbody>
      </table>
    </OrderDataTableContainer>
  );
}
