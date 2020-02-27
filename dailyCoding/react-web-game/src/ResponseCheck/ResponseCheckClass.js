import React, {Component} from 'react';
import styled from 'styled-components';


export class ResponseCheckClass extends Component {

  state = {
    condition : 'waiting',
    message: '클릭해서 시작하세요',
    result: [],
  };

  timeout;
  startTime;
  endTime;

  onClick = () => {
      const {condition,message,result} = this.state;
      if(condition === 'waiting') {
          this.setState({
              condition : 'ready',
              message: '초록색 화면이 되면 클릭하세요',
          });
          setTimeout(() => {
              this.setState({
                  condition: 'now',
                  message: '지금 클릭하세요!',
              });
              this.startTime = new Date();              
          }, Math.floor(Math.random()*1000 + 2000));

      } else if(condition === 'ready'){
          clearTimeout(this.timeout);
          this.setState({
              condition: 'waiting',
              message: '너무 성급하셨군요! 초록색이 된 후에 클릭하세요!'
          });
      } else if(condition === 'now') {
          this.endTime = new Date();
          this.setState((prevState) => {
              return {
                condition: 'waiting',
                message: '클릭해서 시작하세요',
                result: [...prevState.result, this.endTime - this.startTime],
              }
          });
      }
  };

  onReset = () => {
      this.setState({
          result: [],
      })
  };

  renderAverage = () => {
      const {result} = this.state;
      return result.length === 0
      ? null
      : <>
      <div>평균시간: {result.reduce((acc, curr) => acc + curr) / result.length}ms</div>
      <button onClick={this.onReset}>Reset</button>
      </>
  };

  render() {
      const {condition,message} = this.state;
    return (
      <ScreenBox>
      <div
      id = "screen"
      className = {condition}
      onClick={this.onClick}
      >
        {message}
      </div>
      {this.renderAverage()}
      </ScreenBox>
    );
  }
}

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
