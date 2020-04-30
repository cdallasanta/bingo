import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import actionCable from 'actioncable';
import { API_WS_ROOT } from './constants';

const CableApp = {}

CableApp.cable = actionCable.createConsumer(API_WS_ROOT);

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App CableApp={CableApp} />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
