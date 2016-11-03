import { fork } from 'redux-saga/effects';
import { GET_POSTS } from '../actions/redditActions.js';
import watchAPI from './api.js';

export default function* root() {
  yield [
    fork(watchAPI)
  ]
}