import React, {useState, useRef} from 'react';
import styled from 'styled-components';

const ScreenBox = styled.div`

#screen {
    width: 300px;
    height: 300px;
    text-align: center;
    user-select: none;
}

#screen.waiting {
    background-color: skyblue;
}
#screen.ready {
    background-color: red;
    color: white;
}
#screen.now {
    background-color: green;
    color: white;
}
`;

export function ResponseCheckFunction() {
        const [condition, setCondition] = useState('waiting');
        const [message, setMessage] = useState('클릭해서 시작하세요');
        const [result,setResult] = useState([]);
        const timeout = useRef(null);
        const startTime = useRef();
        const endTime = useRef();


        const onClick = () => {
            if(condition === 'waiting') {
                setCondition('ready');
                setMessage('초록색 화면이 되면 클릭하세요');
                timeout.current = setTimeout(() => {
                    setCondition('now');
                    setMessage('지금 클릭하세요!');
                    startTime.current = new Date();              
                }, Math.floor(Math.random()*1000 + 2000));
    
            } else if(condition === 'ready'){
                clearTimeout(timeout.current);
                setCondition('waiting');
                setMessage('너무 성급하셨군요! 초록색이 된 후에 클릭하세요!');
            } else if(condition === 'now') {
                endTime.current = new Date();
                setCondition('waiting');
                setMessage('클릭해서 시작하세요');
                setResult((prevResult) => {
                    return [...prevResult, endTime.current - startTime.current]
                });
            }
        };
    
        const onReset = () => {
            setResult([]);
        };
    
        const renderAverage = () => {
            return result.length === 0
            ? null
            : <>
            <div>평균시간: {result.reduce((acc, curr) => acc + curr) / result.length}ms</div>
            <button onClick={onReset}>Reset</button>
            </>
        };

    return (
        <ScreenBox>
        <div
        id = "screen"
        className = {condition}
        onClick={onClick}
        >
            {message}
        </div>
        {renderAverage()}
        </ScreenBox>
    );
    }
