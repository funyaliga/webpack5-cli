import React from 'react';
import ReactDOM from 'react-dom';
import Test1 from '@assets/imgs/test';
import npm from '@assets/imgs/npm.png';

import './index.scss';

const App = () => {
  console.log('process.env.NODE_ENV', process.env.NODE_ENV);
  return <div>
    <img src={npm} />
    <div> App入口 </div>
    <Test1 />
  </div>;
};

ReactDOM.render(<App />, document.querySelector('#root'));
