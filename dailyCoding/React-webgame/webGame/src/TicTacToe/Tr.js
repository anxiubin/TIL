import React, { useRef, useEffect, memo, useMemo } from 'react';
import Td from './Td';

const Tr = memo(({ rowData, rowIndex, dispatch }) => { //memo를 통해 성능 최적화
    //useEffect와 console을 활용하여 정확히 데이터 파악하기
  const ref = useRef([]);
  useEffect(() => {
    console.log(rowData === ref.current[0], dispatch === ref.current[2], rowIndex === ref.current[3]);
    ref.current = [rowData, dispatch, rowIndex];
  }, [rowData, dispatch, rowIndex]);

  return (
    <tr>
      {Array(rowData.length).fill().map((td, i) => (
        useMemo(
          () => <Td key={i} dispatch={dispatch} rowIndex={rowIndex} cellIndex={i} cellData={rowData[i]}>{''}</Td>,
          [rowData[i]],
        )
      ))}
    </tr>
  );
});

export default Tr;