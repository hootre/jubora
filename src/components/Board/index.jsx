import React from 'react';
import { BoardBox } from './styles';
import { Column, HeaderCell, Cell, Table } from 'rsuite-table';
import Pagination from 'rsuite/Pagination';
import 'rsuite/dist/rsuite.min.css';

export const Board = ({ boardDataList, headerList }) => {
  const [activePage, setActivePage] = React.useState(5);
  const tableRef = React.useRef();
  return (
    <BoardBox>
      <h2>Total 448건 1페이지</h2>
      <Table
        virtualized
        height={600}
        data={boardDataList}
        ref={tableRef}
        onRowClick={(data) => {
          console.log(data);
        }}
      >
        {headerList &&
          headerList.map((item, idx) => {
            if (idx === 0) {
              return (
                <Column key={idx} width={50} align="center" fixed>
                  <HeaderCell>{item}</HeaderCell>
                  <Cell dataKey={item} />
                </Column>
              );
            } else if (idx === 1) {
              return (
                <Column key={idx} flexGrow={7} fullText>
                  <HeaderCell>{item}</HeaderCell>
                  <Cell dataKey={item} />
                </Column>
              );
            } else {
              return (
                <Column key={idx} flexGrow={1} fullText>
                  <HeaderCell>{item}</HeaderCell>
                  <Cell dataKey={item} />
                </Column>
              );
            }
          })}
      </Table>
      <Pagination
        className="pageNav"
        prev
        last
        next
        first
        size="sm"
        total={110}
        limit={10}
        activePage={activePage}
        onChangePage={setActivePage}
      />
    </BoardBox>
  );
};
