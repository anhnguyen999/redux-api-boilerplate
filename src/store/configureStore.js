import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import createSagaMiddleware from 'redux-saga';

// REDUX_DEVTOOLS EXTENSION in dev enviroment
const composeEnhancer = process.env.NODE_ENV === 'development' ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose :
  compose;

// Config middleware
const sagaMiddleware = createSagaMiddleware();
const finalCreateStore = composeEnhancer(
  applyMiddleware(
    sagaMiddleware
  )
)(createStore);

export default function configureStore(initialState) {
  const store = finalCreateStore(rootReducer, initialState);
  store.runSaga = sagaMiddleware.run;
  return store;
};
