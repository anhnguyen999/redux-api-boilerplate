import { createObjectType } from '../utils/createRequestType.js';
import { PostSchema } from '../schemas/entities.js';
import { arrayOf, normalize } from 'normalizr';
import { CALL_API } from '../sagas/api.js';

export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT';
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT';
export const GET_POSTS = createObjectType('GET_POST');

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
    type: CALL_API,
    endpoint: `http://www.reddit.com/r/${subreddit}.json`,
    method: 'GET',
    transform: json => {
      const posts = json.data.children.map(child => child.data);
      const normalized = normalize(posts, arrayOf(PostSchema));
      return normalized;
    },
    shouldRequest: state => {
      const posts = state.postsBySubreddit[subreddit];
      if (!posts || posts.items.length === 0) {
        return true;
      }
      return posts.didInvalidate;
    },
    meta: { subreddit },
    actionTypes: GET_POSTS
  };
}
