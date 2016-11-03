import fetch from 'isomorphic-fetch';
import { take, put, fork, cancel, select } from 'redux-saga/effects';

export const CALL_API = 'CALL_API';

export default function* watchAPI() {
  const apiMap = {}
  while (true) {
    const action = yield take(CALL_API);
    const currentTask = apiMap[action.actionTypes.REQUEST];
    if (!action.keepTask && currentTask && currentTask.isRunning()) {
      yield cancel(currentTask);
    }
    apiMap[action.actionTypes.REQUEST] = yield fork(requestAPI, action)
  }
}

function checkStatus(response) {
  if (response.status < 200 || response.status >= 300) {
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
  return response;
}

export function* requestAPI(action) {
  const {
    endpoint, method, body, credentials,
    headers, transform, shouldRequest, meta,
    actionTypes: { REQUEST: request, SUCCESS: success, FAILURE: failure }
  } = action;

  const state = yield select();
  if (shouldRequest && !shouldRequest(state)) {
    return;
  }

  if (request) {
    yield put({
      type: request,
      meta
    })
  }

  const result = yield fetch(endpoint, { method, body, credentials, headers })
    .then(checkStatus)
    .then(response => response.json())
    .then(data => {
      let finalData = data;
      if (transform) {
        finalData = transform(data);
      }

      return finalData;
    })
    .catch(error => {
      return error;
    });

    if (!(result instanceof Error) && success) {
      yield put({
        type: success,
        payload: result,
        meta
      })
    }

    if (result instanceof Error && failure) {
      yield put({
        type: failure,
        error: result.message,
        meta
      })
    }

    return result
};
