import Constant from '../constants/constant.js';
import { CALL_API, getJSON } from 'redux-api-middleware';
import { PostSchema } from '../schemas/entities.js';
import { normalize, arrayOf } from 'normalizr';

export function selectSubreddit(subreddit) {
  return {
    type: Constant.ActionTypes.SELECT_SUBREDDIT,
    subreddit
  };
}

export function invalidateSubreddit(subreddit) {
  return {
    type: Constant.ActionTypes.INVALIDATE_SUBREDDIT,
    subreddit
  };
}

function fetchPosts(subreddit) {
  return {
    [CALL_API]: {
      endpoint: `http://www.reddit.com/r/${subreddit}.json`,
      method: 'GET',
      types: [
        {
          type: Constant.ActionTypes.GET_POSTS_REQUEST,
          meta: { subreddit },
        },
        {
          type: Constant.ActionTypes.GET_POSTS_SUCCESS,
          payload: (action, state, res) => (
            getJSON(res).then(json => {
              const posts = json.data.children.map(child => child.data);
              const normalized = normalize(posts, arrayOf(PostSchema));
              return normalized;
            })
          ),
          meta: () => {
            return { subreddit };
          }
        },
        {
          type: Constant.ActionTypes.GET_POSTS_FAILURE,
          meta: () => {
            return { subreddit };
          }
        }
      ]
    }
  };
}

function shouldFetchPosts(state, subreddit) {
  const posts = state.postsBySubreddit[subreddit];
  if (!posts) {
    return true;
  }
  if (posts.isFetching) {
    return false;
  }
  return posts.didInvalidate;
}

export function fetchPostsIfNeeded(subreddit) {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), subreddit)) {
      return dispatch(fetchPosts(subreddit));
    }
  };
}
