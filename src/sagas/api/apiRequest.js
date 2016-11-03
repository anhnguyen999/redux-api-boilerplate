import fetch from 'isomorphic-fetch';
import { put } from 'redux-saga/effects';

function checkStatus(response) {
  if (response.status < 200 || response.status >= 300) {
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
  return response;
}

export default function* request(options) {
  const {
    endpoint, method, body,
    credentials, headers, transform,
    meta, types: [success, failure]
  } = options;

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
        error: result.message
      })
    }

    return result
};
