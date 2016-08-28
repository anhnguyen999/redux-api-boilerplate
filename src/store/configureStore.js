import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import { apiMiddleware } from 'redux-api-middleware';
import apiErrorHandler from '../middlewares/apiErrorHandler.js';


const finalCreateStore = compose(
  applyMiddleware(thunk, apiMiddleware, apiErrorHandler)
)(createStore);

export default function configureStore(initialState) {
  return finalCreateStore(rootReducer, initialState);
};
