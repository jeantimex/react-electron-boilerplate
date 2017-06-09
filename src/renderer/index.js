import ReactDOM from 'react-dom';
import React from 'react';

// Redux and React Router
import { Provider } from 'react-redux';
import { Switch, Route } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import store from 'store';

// App components
//import App from 'components/app';
import Todos from 'components/todos/Todos';

const history = createHistory();

ReactDOM.render(
  <Provider store={store}>
    <Todos />
  </Provider>,
  document.getElementById('root')
);
