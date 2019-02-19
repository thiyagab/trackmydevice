import React from 'react';
import ReactDOM from 'react-dom';
import Main from './screens/Main';

// styles
import './index.css';

// components
import App from './App';

// utils
import registerServiceWorker from './registerServiceWorker';

const defaultPath = process.env.REACT_APP_BASE_PATH;

ReactDOM.render(
  <App>
    <Main />
  </App>,
  document.getElementById('root'),
);

registerServiceWorker();
