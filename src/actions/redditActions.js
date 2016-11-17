import { createObjectType } from '../utils/createRequestType';

export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT';
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT';
export const GET_POSTS = createObjectType('GET_POSTS');

export function actionSelectSubreddit(subreddit) {
  return {
    type: SELECT_SUBREDDIT,
    meta: { subreddit }
  };
}

export function actionInvalidateSubreddit(subreddit) {
  return {
    type: INVALIDATE_SUBREDDIT,
    meta: { subreddit }
  };
}

export function actionFetchPosts(subreddit) {
  return {
    type: GET_POSTS.REQUEST,
    meta: { subreddit }
  };
}
