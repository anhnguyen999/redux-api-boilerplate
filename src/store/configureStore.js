import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import { apiMiddleware } from 'redux-api-middleware';


const finalCreateStore = compose(
  applyMiddleware(thunk),
  applyMiddleware(apiMiddleware)
)(createStore);

export default function configureStore(initialState) {
  return finalCreateStore(rootReducer, initialState);
};
