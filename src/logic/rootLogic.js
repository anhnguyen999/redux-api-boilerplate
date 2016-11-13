import { createLogicMiddleware } from 'redux-logic';
import postApi from './postApi.js';

export default createLogicMiddleware([].concat.apply(
  postApi
));
