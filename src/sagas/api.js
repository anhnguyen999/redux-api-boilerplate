import fetch from 'isomorphic-fetch';
import { take, put, fork, cancel, select } from 'redux-saga/effects';

export const CALL_API = 'CALL_API';

export function* watchLatestAPI() {
  const apiMap = {}
  while (true) {
    const action = yield take(CALL_API);
    const currentTask = apiMap[action.actionTypes.REQUEST];
    if (!action.keepTask && currentTask && currentTask.isRunning()) {
      yield cancel(currentTask);
    }
    apiMap[action.actionTypes.REQUEST] = yield fork(apiWorker, action)
  }
}

export function* apiWorker(action) {
  const {
    endpoint, method, body, headers,
    transform, shouldRequest, meta,
    actionTypes: { REQUEST: request, SUCCESS: success, FAILURE: failure }
  } = action;

  const state = yield select();
  if (shouldRequest && !shouldRequest(state)) {
    return;
  }

  yield put({
    type: request,
    meta
  })

  const response = yield apiClient({ endpoint, method, body, headers });

  if (!response.ok) {
    yield put({
      type: failure,
      payload: {
        status: response.status,
        statusText: response.statusText,
        error: response.body,
      },
      error: true,
      meta
    });
    return;
  }

  const dataTransform = transform || (data => data);
  const transformed = dataTransform(response);
  yield put({
    type: success,
    payload: transformed,
    meta
  })

  return transformed;
};

function* apiClient({
  endpoint, method,
  headers, body,
}) {
  const response = yield fetch(endpoint, { method, body, headers });
  const data = yield response.json();
  const result = {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
    ok: response.ok,
    body: data,
  };
  return result; 
}
