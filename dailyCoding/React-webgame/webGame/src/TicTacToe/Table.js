  
import React from 'react';
import Tr from './Tr';
import styled from 'styled-components';

const Tables = styled.table`
   border-collapse: collapse;
`;

const Table = ({ tableData, dispatch }) => {
  return (
    <Tables>
      {Array(tableData.length).fill().map((tr, i) => (
          <Tr key={i} dispatch={dispatch} rowIndex={i} rowData={tableData[i]} />
      ))}
    </Tables>
  );
};

export default Table;