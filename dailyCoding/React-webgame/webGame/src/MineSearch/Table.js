import React, {useContext, memo} from 'react';
import Tr from './Tr';
import {TableContext} from './MineSearch';
import styled from 'styled-components';

const Tables = styled.table`
    border-collapse: collapse;
`;

function Table() {
    const {tableData} = useContext(TableContext);
  return (
    <Tables>
      {Array(tableData.length).fill().map((tr, i) => <Tr rowIndex={i} />)}
    </Tables>
  );
}
export default memo(Table);