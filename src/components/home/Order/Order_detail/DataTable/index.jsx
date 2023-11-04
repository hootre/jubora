import { DataTable_container } from './style';
export const DataTable = ({ data }) => {
  // order from 셋팅
  const order_setting_for = ['item_1', 'item_2', 'item_3', 'item_4', 'item_5', 'item_6', 'item_7'];
  return (
    <DataTable_container>
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
            <td>{`${data.address_1} ${data.address_2} ${data.address_3} `}</td>
            <td>{`${data.zonecode}`}</td>
            <td>{`${data.row}cm X ${data.col}cm`}</td>
            <td>{data.count}</td>
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
              (item, idx) => data[item]?.content && <td key={idx}>{data[item].content}</td>
            )}
            <td>{data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</td>
          </tr>
        </tbody>
      </table>
    </DataTable_container>
  );
};
