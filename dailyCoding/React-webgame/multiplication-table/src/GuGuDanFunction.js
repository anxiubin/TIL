import React , {useState, useRef} from 'react';

function GuGuDanFunction () {

  const [first,setFirst] = useState(Math.ceil(Math.random() * 9));
  const [second,setSecond] = useState(Math.ceil(Math.random() * 9));
  const [value,setValue] = useState('');
  const [result,setResult] = useState('');
  
  const onSubmit = (e) => {
    e.preventDefault();
    if(parseInt(value) === first * second){
      setResult('정답: ' + value);
      setFirst(Math.ceil(Math.random() * 9));
      setSecond(Math.ceil(Math.random() * 9));
      setValue('');
      input.current.focus();
    } else {
      setResult('땡!');
      setValue('');
      input.current.focus();
    }
  };

  const onChange = (e) => setValue(e.target.value);

  const input = useRef();

    return (
      <>
      <h1>Functional Component</h1>
      <div>
        {first} 곱하기 {second} 는?
      </div>
      <form onSubmit={onSubmit}>
        <input 
        type="number" 
        value={value} 
        onChange={onChange}
        ref={input} />
        <button type="submit">입력</button>
      </form>
      <div>{result}</div>
      </>
    );
}

export default GuGuDanFunction;
