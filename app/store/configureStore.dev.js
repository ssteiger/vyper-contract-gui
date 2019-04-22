// @flow

//import { createStore, applyMiddleware, compose } from 'redux'
import { createStore, applyMiddleware } from 'redux'
//import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
// lets you manage the history stack, navigate, confirm navigation, and persist state between sessions.
import { createHashHistory } from 'history'
import { routerMiddleware, routerActions } from 'connected-react-router'
import { createLogger } from 'redux-logger'
import createRootReducer from '../reducers'
import rootSaga from '../sagas'

// https://www.npmjs.com/package/history
const history = createHashHistory()
// we have a root reducer,
// -> all over reducers are combined inside the root reducer (Treestructure)
console.log('creating root reducer')
const rootReducer = createRootReducer(history)

const configureStore = (initialState?) => {
  // Redux Configuration

  // use case for middleware is to support asynchronous actions
  // https://redux.js.org/api/applymiddleware
  const middleware = []
  const enhancers = []
  // Create the Saga Middleware
  const sagaMiddleware = createSagaMiddleware()
  // Saga Middleware
  middleware.push(sagaMiddleware)

  // Logging Middleware
  const logger = createLogger({
    level: 'info',
    collapsed: true
  })

  // Skip redux logs in console during the tests
  if (process.env.NODE_ENV !== 'test') {
    middleware.push(logger)
  }

  // Router Middleware
  const router = routerMiddleware(history)
  middleware.push(router)

  // Redux DevTools Configuration
  const actionCreators = {
    ...routerActions
  }
  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Options: http://extension.remotedev.io/docs/API/Arguments.html
        actionCreators
      })
    : compose
  /* eslint-enable no-underscore-dangle */

  // Apply Middleware & Compose Enhancers
  enhancers.push(applyMiddleware(...middleware))
  const enhancer = composeEnhancers(...enhancers)

  // Create Store
  const store = createStore(rootReducer, initialState, enhancer)

  if (module.hot) {
    module.hot.accept(
      '../reducers',
      // eslint-disable-next-line global-require
      () => store.replaceReducer(require('../reducers').default)
    )
  }
  // Saga Middleware
  sagaMiddleware.run(rootSaga)
  return store
}

export default { configureStore, history }
