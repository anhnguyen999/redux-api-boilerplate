import { createObjectType } from '../utils/createRequestType.js';

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

// export function fetchPosts(subreddit) {
//   return {
//     type: CALL_API,
//     endpoint: `http://www.reddit.com/r/${subreddit}.json`,
//     method: 'GET',
//     transform: response => {
//       const posts = response.body.data.children.map(child => child.data);
//       const normalized = normalize(posts, arrayOf(PostSchema));
//       return normalized;
//     },
//     shouldRequest: state => {
//       const posts = state.postsBySubreddit[subreddit];
//       if (!posts || posts.items.length === 0) {
//         return true;
//       }
//       return posts.didInvalidate;
//     },
//     meta: { subreddit },
//     actionTypes: GET_POSTS
//   };
// }
