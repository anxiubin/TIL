import React, { useCallback, memo } from 'react';
import { CLICK_CELL } from './TicTacToeFunction';
import styled from 'styled-components';

const Tds = styled.td`
    border: 1px solid black;
    width: 40px;
    height: 40px;
    text-align: center;
`

const Td = memo(({ rowIndex, cellIndex, dispatch, cellData }) => {

  const onClickTd = useCallback(() => {
    if (cellData) {
      return;
    }
    dispatch({ type: CLICK_CELL, row: rowIndex, cell: cellIndex });
  }, [cellData]);

  return (
    <Tds onClick={onClickTd}>{cellData}</Tds>
  )
});

export default Td;