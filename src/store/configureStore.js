import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import { apiMiddleware } from 'redux-api-middleware';
import apiErrorHandler from '../middlewares/apiErrorHandler.js';

const composeEnhancer = process.env.NODE_ENV === 'development' ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose :
  compose;

const finalCreateStore = composeEnhancer(
  applyMiddleware(thunk, apiMiddleware, apiErrorHandler)
)(createStore);

export default function configureStore(initialState) {
  return finalCreateStore(rootReducer, initialState);
};
