import React from 'react';
import {Route, Link} from 'react-router-dom';
import GuGuDanClass from './GuGuDanClass';
import GuGuDanFunction from './GuGuDanFunction';

function App() {
  return (
    <>
    <h1>React-WEBGAME</h1>
    <div>
        <Link to="/GuGuDanClass">구구단 Class ver.</Link>
    </div>
    <div>
        <Link to="/GuGuDanFunction">구구단 Functional ver.</Link>
    </div>
    <br/>
    <hr/>
      <Route path="/GuGuDanClass" component={GuGuDanClass} />
      <Route path="/GuGuDanFunction" component={GuGuDanFunction} />
    </>
  );
}
export default App;