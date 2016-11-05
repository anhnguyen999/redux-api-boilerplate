import { fork } from 'redux-saga/effects';
import { GET_POSTS } from '../actions/redditActions.js';
import { watchLatestAPI } from './api.js';

export default function* root() {
  yield [
    fork(watchLatestAPI)
  ]
}