import React from 'react';
import {Route, Link} from 'react-router-dom';
import GuGuDanClass from './GuGuDan/GuGuDanClass';
import GuGuDanFunction from './GuGuDan/GuGuDanFunction';
import NumberBaseballClass from './NumberBaseball/NumberBaseballClass';

function App() {
  return (
    <>
    <h1>React-WebGame</h1>
    <div><Link to="/GuGuDanClass">구구단 Class ver.</Link></div>
    <div><Link to="/GuGuDanFunction">구구단 Functional ver.</Link></div>
    <br/>
    <div><Link to="/NumberBaseballClass">숫자 야구 Class ver.</Link></div>

    <br/>
    <hr/>
      <Route path="/GuGuDanClass" component={GuGuDanClass} />
      <Route path="/GuGuDanFunction" component={GuGuDanFunction} />
      <Route path="/NumberBaseballClass" component={NumberBaseballClass} />
    </>
  );
}
export default App;