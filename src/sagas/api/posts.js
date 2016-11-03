import apiRequest from './apiRequest.js';
import { GET_POSTS } from '../../actions/redditActions.js';
import { PostSchema } from '../../schemas/entities.js';
import { arrayOf, normalize } from 'normalizr';
import { call, put } from 'redux-saga/effects'

export function* getPosts(action) {
  const { schema, subreddit } = action;
  yield [
    put({ type: GET_POSTS.REQUEST, meta: { subreddit }}),
    call(apiRequest, {
      endpoint: `http://www.reddit.com/r/${subreddit}.json`,
      method: 'GET',
      transform: json => {
        const posts = json.data.children.map(child => child.data);
        const normalized = normalize(posts, arrayOf(PostSchema));
        return normalized;
      },
      meta: { subreddit },
      types: GET_POSTS
    })
  ]
}
