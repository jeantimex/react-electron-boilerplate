import ReactDOM from 'react-dom';
import React from 'react';

// Redux and React Router
import { Provider } from 'react-redux';
import { Switch, Route } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import store from 'store';

// App components
import Todos from 'components/todos/Todos';

const history = createHistory();

ReactDOM.render(
  <Provider store={store}>
    { /* ConnectedRouter will use the store from Provider automatically */ }
    <ConnectedRouter history={ history }>
      <Switch>
        <Route exact path='/' component={ Todos } />
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
