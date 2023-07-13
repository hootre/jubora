import React from 'react';
import { Board_container } from './style.jsx';
export const Board = ({ boardDataList, headerList }) => {
  const [activePage, setActivePage] = React.useState(5);
  const tableRef = React.useRef();
  return (
    <Board_container>
      <h2>Total 448건 1페이지</h2>
    </Board_container>
  );
};
