import React from 'react';
import {Route, Link} from 'react-router-dom';
import GuGuDanClass from './GuGuDan/GuGuDanClass';
import GuGuDanFunction from './GuGuDan/GuGuDanFunction';
import NumberBaseballClass from './NumberBaseball/NumberBaseballClass';
import NumberBaseballFunction from './NumberBaseball/NumberBaseballFunction';
import {ResponseCheckClass} from './ResponseCheck/ResponseCheckClass';
import {ResponseCheckFunction} from './ResponseCheck/ResponseCheckFunction';

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
    <hr/>
      <Route path="/GuGuDanClass" component={GuGuDanClass} />
      <Route path="/GuGuDanFunction" component={GuGuDanFunction} />
      <Route path="/NumberBaseballClass" component={NumberBaseballClass} />
      <Route path="/NumberBaseballFunction" component={NumberBaseballFunction} />
      <Route path="/ResponseCheckClass" component={ResponseCheckClass} />
      <Route path="/ResponseCheckFunction" component={ResponseCheckFunction} />
    </>
  );
}
export default App;