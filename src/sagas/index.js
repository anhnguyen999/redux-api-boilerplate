import { takeLatest } from 'redux-saga';
import { GET_POSTS } from '../actions/redditActions.js';
import { getPosts } from './api/posts.js';

export default function* root() {
  yield takeLatest(GET_POSTS.SAGA, getPosts)
}