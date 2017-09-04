import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import todoReducer from 'reducers/TodoReducer';

export default history => {
  const middleware = [routerMiddleware(history), thunk];

  // Add the reducer to your store on the `router` key
  // Also apply our middleware for navigating
  return createStore(
    combineReducers({
      todo: todoReducer,
      router: routerReducer,
    }),
    composeWithDevTools(applyMiddleware(...middleware))
  );
};
