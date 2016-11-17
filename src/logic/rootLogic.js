import { createLogicMiddleware } from 'redux-logic';
import postApi from './postApi';

export default createLogicMiddleware([].concat.apply(
  postApi
));
