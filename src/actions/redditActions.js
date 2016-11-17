import { createObjectType } from '../utils/createRequestType';

export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT';
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT';
export const GET_POSTS = createObjectType('GET_POSTS');

export function selectSubreddit(subreddit) {
  return {
    type: SELECT_SUBREDDIT,
    meta: { subreddit }
  };
}

export function invalidateSubreddit(subreddit) {
  return {
    type: INVALIDATE_SUBREDDIT,
    meta: { subreddit }
  };
}

export function fetchPosts(subreddit) {
  return {
    type: GET_POSTS.REQUEST,
    meta: { subreddit }
  };
}
