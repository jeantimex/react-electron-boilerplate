import ReactDOM from 'react-dom';
import React from 'react';

// Redux and React Router
import { Provider } from 'react-redux';
import { Switch, Route } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createHashHistory';
import getStore from 'store';

// App components
import Todos from 'components/todos/Todos';

// Browser history
const history = createHistory();
const store = getStore(history);

ReactDOM.render(
  <Provider store={store}>
    { /* ConnectedRouter will use the store from Provider automatically */ }
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/" component={Todos} />
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);
