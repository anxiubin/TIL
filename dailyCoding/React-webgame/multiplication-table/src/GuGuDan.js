import React from 'react';

class GuGuDan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first: Math.ceil(Math.random() * 9),
      second: Math.ceil(Math.random() * 9),
      value: '',
      result: '',
    };
  }

  onSubmit = (e) => {
    e.preventDefault();
    if(parseInt(this.state.value) === this.state.first * this.state.second){
      this.setState((prevState) => {
        return {
          result: '정답: ' + prevState.value,
          first: Math.ceil(Math.random() * 9),
          second: Math.ceil(Math.random() * 9),
          value: '',
        }
      });
      this.input.focus();
    } else {
      this.setState({
        result: '땡!',
        value: '',
      });
      this.input.focus();
    }
  };

  onChange = (e) => this.setState({value: e.target.value});

  input;

  render() {
    return (
      <>
      <div>
        {this.state.first} 곱하기 {this.state.second} 는?
      </div>
      <form onSubmit={this.onSubmit}>
        <input 
        type="number" 
        value={this.state.value} 
        onChange={this.onChange}
        ref={(e) => {this.input = e;}} />
        <button type="submit">입력</button>
      </form>
      <div>{this.state.result}</div>
      </>
    );
  }

}

export default GuGuDan;
