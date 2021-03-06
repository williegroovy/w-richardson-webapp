import { createStore, compose, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';

import rootReducer from './index';
import startForeman from './Sagas/index';

const initialState = {
  user: {
    error: '',
    authenticated: false,
    username: 'Darth Maul',
    permission: 1
  },
  focusCard: { currentCard: null },
};

let middlewares = [];

// add dev middlewares
if(process.env.NODE_ENV !== 'production') {

  // add redux-immutable middleware
  middlewares.push(reduxImmutableStateInvariant());
}

// add saga middleware
const sagaMiddleware = createSagaMiddleware();
middlewares.push(sagaMiddleware);

// add reduxThunk middleware
middlewares.push(reduxThunk);

// apply the middleware
let middleware = applyMiddleware(...middlewares);

// add redux dev tools
if(process.env.NODE_ENV !== 'production' && window.devToolsExtension) {
  middleware = compose(middleware, window.devToolsExtension());
}

// create and export the store
const store = createStore(rootReducer, initialState, middleware);
sagaMiddleware.run(startForeman);

export default store;
