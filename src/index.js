import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Main from './examples/Main';

// styles
import './index.css';

// components
import App from './App';

// utils
import registerServiceWorker from './registerServiceWorker';

const defaultPath = process.env.REACT_APP_BASE_PATH;

ReactDOM.render(
  <Router>
    <App>
      <Switch>
        <Route exact path={defaultPath+"*"} component={Main} />
      </Switch>
    </App>
  </Router>,
  document.getElementById('root'),
);

registerServiceWorker();
