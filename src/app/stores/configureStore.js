import {
  applyMiddleware,
  compose,
  createStore
} from 'redux'
import {
  routerMiddleware
} from 'react-router-redux'
import thunk from 'redux-thunk'
import reducer from '../reducers';
import createLogger from 'redux-logger'
import promiseMiddleware from '../middlewares/promiseMiddleware'

export default (initialState = {}, history) => {

  const logger = createLogger()

  const reduxDevToolsExtension = window.devToolsExtension ? window.devToolsExtension() : f => f;

  const middleware = [thunk, routerMiddleware(history)]

  const store = createStore(
    reducer,
    initialState,
    compose(
      applyMiddleware(...middleware, promiseMiddleware({
        promiseTypeSuffixes: ['PENDING', 'SUCCESS', 'ERROR']
      })),
      reduxDevToolsExtension
    )
  )

  store.asyncReducers = {}

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default
      store.replaceReducer(nextReducer)
    })
  }
  return store
}