import React from 'react';
import Ball from './Ball';

function getWinNumbers() {
    const candidate = Array(45).fill().map((v,i) => i+1);
    const shuffle = [];
    while(candidate.length > 0) {
        shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
    }
    const bonusNum = shuffle[shuffle.length - 1];
    const winNum = shuffle.slice(0,6).sort((p,c) => p-c);
    return [...winNum, bonusNum];
};

export class LottoClass extends React.Component {
  state = {
      winNum: getWinNumbers(),
      winBalls: [],
      bonus: null,
      redo: false,
  };

  timeouts = [];

  runTimeouts = () => {
      const {winNum} = this.state;
      for(let i = 0; i < winNum.length - 1; i++) {
          this.timeouts[i] = setTimeout(() => {
              this.setState((prevState) => {
                  return {
                      winBalls: [...prevState.winBalls, winNum[i]],
                  };
              });
          }, (i+1)*1000);
      }
      this.timeouts[6] = setTimeout(() => {
          this.setState({
              bonus: winNum[6],
              redo: true,
          });
      }, 7000);
  };

  componentDidMount() { //로또 숫자 생성
      this.runTimeouts();
  };

  componentDidUpdate() { //redo버튼 눌러서 winBalls 길이가 0으로 업데이트 될 때 다시 로또 숫자 생성
      if(this.state.winBalls.length === 0) {
        this.runTimeouts();
      }
  };

  componentWillUnmount() {
      this.timeouts.forEach((v) => {
          clearTimeout(v);
      });
  };

  onClickRedo = () => {
      this.setState({
        winNum: getWinNumbers(),
        winBalls: [],
        bonus: null,
        redo: false,
      });
      this.timeouts = [];
  };


  render() {
      const {winBalls, bonus, redo} = this.state;
    return (
      <>
      <div>당첨 숫자</div>
      <div id="result">
          {winBalls.map( (v) => <Ball key={v} number={v} /> )}
      </div>
      <br></br>
      <div>보너스</div>
      {bonus && <Ball number={bonus} />}
      {redo && <button onClick={this.onClickRedo}>한 번 더!</button>}
      </>
    );
  }
}

