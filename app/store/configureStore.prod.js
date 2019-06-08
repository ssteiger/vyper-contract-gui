// @flow
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
// lets you manage the history stack, navigate, confirm navigation, and persist state between sessions.
import { createHashHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import createRootReducer from '../reducers';
import rootSaga from '../sagas';

// https://www.npmjs.com/package/history
const history = createHashHistory();

function configureStore(initialState?) {
  const rootReducer = createRootReducer(history);
  const router = routerMiddleware(history);
  // Create the Saga Middleware
  const sagaMiddleware = createSagaMiddleware();
  // use case for middleware is to support asynchronous actions
  // https://redux.js.org/api/applymiddleware
  const enhancer = applyMiddleware(sagaMiddleware, router);

  const store = createStore(rootReducer, initialState, enhancer);
  sagaMiddleware.run(rootSaga);
  return store;
}

export default { configureStore, history };
