import React, {Component} from 'react';
import Try from './Try';

function getNumbers() {
    const numbers = [1,2,3,4,5,6,7,8,9];
    const array = [];
    for(let i = 0; i < 4; i++){
        const chosen = numbers.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
        array.push(chosen);
    }
    return array;
};

class NumberBaseballClass extends Component {
    state = {
        result: '',
        value: '',
        answer: getNumbers(),
        tries: [],
    };

    onSubmit = (e) => {
        e.preventDefault();
        if(this.state.value === this.state.answer.join('')){
            this.setState({
                result: '홈런!',
                tries: [...this.state.tries, {try: this.state.value, result: '홈런!'}]
            })
        } else {
            const myAnswerArray = this.state.value.split('').map((num) => parseInt(num));
            let strike = 0;
            let ball = 0;
            if(this.state.tries.length >= 9){
                this.setState({
                    result: `10번 넘게 틀려서 실패입니다! 답은 ${this.state.answer.join(',')} 였습니다!`
                });
                alert('게임을 다시 시작합니다!');
                this.setState({
                    value: '',
                    answer: getNumbers(),
                    tries: []
                });
            } else {
                for(let i = 0; i < 4; i++){
                    if(myAnswerArray[i] === this.state.answer[i]) {
                        strike++;
                    } else if(this.state.answer.includes(myAnswerArray[i])) {
                        ball++;
                    }
                }
                this.setState({
                    tries: [...this.state.tries, {try: this.state.value, result: `${strike} 스트라이크, ${ball} 볼입니다`}],
                    value:'',
                });
            }
        }
        this.input.focus();
        console.log(this.state.answer);
    };

    onChange = (e) => {
        this.setState({
            value: e.target.value
        });
    };

    onClick = () => {
        this.setState({
            value: '',
            answer: getNumbers(),
            tries: []
        });
    }


    input;
    
    onRef = (e) => {this.input = e;};

  render() {
    return (
      <>
        <h3>Number Baseball Game</h3>
        <div>
            <button onClick={this.onClick}>New Game</button>
        </div>
        <br/>
        <form onSubmit={this.onSubmit}>
            <input 
            maxLength={4} 
            value={this.state.value} 
            onChange={this.onChange} 
            placeholder={'4자리 숫자를 입력하세요'} 
            ref={this.onRef} />    
        </form>
        <br/>
        <div>시도: {this.state.tries.length}</div>
        <ul>
            {this.state.tries.map((tried, index) => {
                return (
                    <Try key={`${index + 1 }차 시도`} tryInfo={tried} />
                );
            })}
        </ul>
      </>
    );
  }
}

export default NumberBaseballClass;