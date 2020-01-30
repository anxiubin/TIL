import React from 'react';
import {Route, Link} from 'react-router-dom';
import GuGuDanClass from './GuGuDan/GuGuDanClass';
import GuGuDanFunction from './GuGuDan/GuGuDanFunction';
import NumberBaseballClass from './NumberBaseball/NumberBaseballClass';
import NumberBaseballFunction from './NumberBaseball/NumberBaseballFunction';
import {ResponseCheckClass} from './ResponseCheck/ResponseCheckClass';
import {ResponseCheckFunction} from './ResponseCheck/ResponseCheckFunction';
import {RSPclass} from './RockScissorsPaper/RSPclass';
import {RSPfunction} from './RockScissorsPaper/RSPfunction';
import {LottoClass} from './Lotto/LottoClass';
import {LottoFunction} from './Lotto/LottoFunction';
import {TicTacToeFunction} from './TicTacToe/TicTacToeFunction';
import MineSearch from './MineSearch/MineSearch';

function App() {
  return (
    <>
    <h1>React-WebGame</h1>
    <div><Link to="/GuGuDanClass">구구단 Class ver.</Link></div>
    <div><Link to="/GuGuDanFunction">구구단 Functional ver.</Link></div>
    <br/>
    <div><Link to="/NumberBaseballClass">숫자 야구 Class ver.</Link></div>
    <div><Link to="/NumberBaseballFunction">숫자 야구 Functional ver.</Link></div>
    <br/>
    <div><Link to="/ResponseCheckClass">반응 속도 체크 Class ver.</Link></div>
    <div><Link to="/ResponseCheckFunction">반응 속도 체크 Functional ver.</Link></div>
    <br/>
    <div><Link to="/RSPclass">가위 바위 보 Class ver.</Link></div>
    <div><Link to="/RSPfunction">가위 바위 보 Functional ver.</Link></div>
    <br/>
    <div><Link to="/LottoClass">로또 추첨 Class ver.</Link></div>
    <div><Link to="/LottoFunction">로또 추첨 Functional ver.</Link></div>
    <br/>
    <div><Link to="/TicTacToeFunction">틱택토 Functional ver.</Link></div>
    <br/>
    <br/>
    <div><Link to="/MineSearch">지뢰찾기</Link></div>
    <br/>
    <hr/>
      <Route path="/GuGuDanClass" component={GuGuDanClass} />
      <Route path="/GuGuDanFunction" component={GuGuDanFunction} />
      <Route path="/NumberBaseballClass" component={NumberBaseballClass} />
      <Route path="/NumberBaseballFunction" component={NumberBaseballFunction} />
      <Route path="/ResponseCheckClass" component={ResponseCheckClass} />
      <Route path="/ResponseCheckFunction" component={ResponseCheckFunction} />
      <Route path="/RSPclass" component={RSPclass} />
      <Route path="/RSPfunction" component={RSPfunction} />
      <Route path="/LottoClass" component={LottoClass} />
      <Route path="/LottoFunction" component={LottoFunction} />
      <Route path="/TicTacToeFunction" component={TicTacToeFunction} />
      <Route path="/MineSearch" component={MineSearch} />
    </>
  );
}
export default App;