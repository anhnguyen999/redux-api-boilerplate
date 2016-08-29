import { ApiError, InternalError, RequestError } from 'redux-api-middleware';

const apiErrorHandler = store => next => action => {
  // Check if dispatched action is an Error from API request
  const isError = action.payload instanceof RequestError
    || action.payload instanceof ApiError
    || action.payload instanceof InternalError;

  if (!action.error || !isError) {
    return next(action);
  }

  /*
   * Handle error from api request
   * You can dispatch another action by calling next(your_action)
   */
  console.log('Api Error: ', action.payload);

  return next(action);
};

export default apiErrorHandler;
