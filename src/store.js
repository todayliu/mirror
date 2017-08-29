import {
  createStore as _createStore,
  applyMiddleware,
  compose
} from 'redux'
import { combineReducers } from 'redux-immutable'
import {routerMiddleware, routerReducer} from 'react-router-redux'

import createMiddleware from './middleware'
import {getHistory} from './router'

function warning() {
  throw new Error(
    'You are calling "dispatch" or "getState" without applying mirrorMiddleware! ' +
    'Please create your store with mirrorMiddleware first!'
  )
}

export let dispatch = warning

export let getState = warning

export let store = {}

export function getStore(){
  return store;
}


export function createStore(models, initialState, middlewares = [], reducers = {}) {

  const middleware = applyMiddleware(
    routerMiddleware(getHistory()),
    ...middlewares,
    createMiddleware()
  )

  const enhancers = [middleware]

  let composeEnhancers = compose

  // Following line to exclude from coverage report:
  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'production') {
    // Redux devtools extension support.
    if (global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
      composeEnhancers = global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    }
  }

  // if you had written any reducers,add to default.reducers
  const reducer = createReducer(models,reducers)
  const enhancer = composeEnhancers(...enhancers)

  store = _createStore(reducer, initialState, enhancer)
  dispatch = store.dispatch
  getState = store.getState
  console.log(dispatch);
  return [store,dispatch,getState]
}

export function replaceReducer(store, models) {
  const reducer = createReducer(models)
  store.replaceReducer(reducer)
}

function createReducer(models,reducer) {

  const reducers = models.reduce((acc, cur) => {
    acc[cur.name] = cur.reducer
    return acc
  }, {})

  return combineReducers({
    ...reducers,
    ...reducer,
    routing: routerReducer
  })

}
