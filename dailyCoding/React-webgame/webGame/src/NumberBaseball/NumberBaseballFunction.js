import React, {useState, useRef, memo} from 'react';
import TryFC from './TryFC';

function getNumbers() {
    const numbers = [1,2,3,4,5,6,7,8,9];
    const array = [];
    for(let i = 0; i < 4; i++){
        const chosen = numbers.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
        array.push(chosen);
    }
    return array;
};

function NumberBaseballFunction() {
    const [result,setResult] = useState('');
    const [value,setValue] = useState('');
    const [answer,setAnswer] = useState(getNumbers());
    const [tries,setTries] = useState([]);

    const onSubmit = (e) => {
        e.preventDefault();
        if(value === answer.join('')){
            setResult('홈런!');
            setTries((prevTries) => {
                return [...prevTries, {try: value, result: '홈런!'}];
            })
        } else {
            const myAnswerArray = value.split('').map((num) => parseInt(num));
            let strike = 0;
            let ball = 0;
            if(tries.length >= 9){
                setResult(`10번 넘게 틀려서 실패입니다! 답은 ${answer.join(',')} 였습니다!`);
                alert('게임을 다시 시작합니다!');
                setValue('');
                setAnswer(getNumbers());
                setTries([]);
            } else {
                for(let i = 0; i < 4; i++){
                    if(myAnswerArray[i] === answer[i]) {
                        strike++;
                    } else if(answer.includes(myAnswerArray[i])) {
                        ball++;
                    }
                }
                setTries((prevTries) => {
                    return [...prevTries, {try: value, result: `${strike} 스트라이크, ${ball} 볼입니다`}];
                });
                setValue('');
            }
        }
        input.current.focus();
    };
    const onChange = (e) => {
        setValue(e.target.value);
    };

    const onClick = () => {
        setResult('');
        setValue('');
        setAnswer(getNumbers());
        setTries([]);
    }

    const input = useRef();

  return (
    <>
      <h3>Number Baseball Game Functional Component</h3>
        <div>
            <button onClick={onClick}>New Game</button>
        </div>
        <br/>
        <h2>{result}</h2>
        <form onSubmit={onSubmit}>
            <input 
            maxLength={4} 
            value={value} 
            onChange={onChange} 
            placeholder={'4자리 숫자를 입력하세요'} 
            ref={input} />    
        </form>
        <br/>
        <div>시도: {tries.length}</div>
        <ul>
            {tries.map((tried, index) => {
                return (
                    <TryFC key={`${index + 1 }차 시도`} tryInfo={tried} />
                );
            })}
        </ul>
    </>
  );
};

export default memo(NumberBaseballFunction);