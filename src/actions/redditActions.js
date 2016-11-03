import createRequestType from '../utils/createRequestType.js';

export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT';
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT';
export const GET_POSTS = createRequestType('GET_POST');

export function selectSubreddit(subreddit) {
  return {
    type: SELECT_SUBREDDIT,
    subreddit
  };
}

export function invalidateSubreddit(subreddit) {
  return {
    type: INVALIDATE_SUBREDDIT,
    subreddit
  };
}

export function fetchPosts(subreddit) {
  return {
    type: GET_POSTS.REQUEST,
    meta: { subreddit }
  };
}
