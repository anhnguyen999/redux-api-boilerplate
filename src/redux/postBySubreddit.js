import merge from 'lodash/merge';
import { INVALIDATE_SUBREDDIT, GET_POSTS } from '../actions/redditActions';
import { getPost } from './entities';

export function getPostBySubreddit(state, subredditId) {
  const subreddit = state.postsBySubreddit[subredditId];
  const items = subreddit ? subreddit.items : [];
  return items.map(postId => getPost(state, postId));
}

export function getPostBySubredditMeta(state, subredditId) {
  const subreddit = state.postsBySubreddit[subredditId];
  const isFetching = subreddit ? subreddit.isFetching : false;
  const didInvalidate = subreddit ? subreddit.didInvalidate : false;
  return { isFetching, didInvalidate };
}

const postsInitalState = {
  isFetching: false,
  didInvalidate: false,
  items: []
};
function posts(state = postsInitalState, action) {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT: {
      return merge({}, state, {
        didInvalidate: true,
      });
    }
    case GET_POSTS.REQUEST: {
      return merge({}, state, {
        isFetching: true,
        didInvalidate: false,
      });
    }
    case GET_POSTS.SUCCESS: {
      const { result } = action.payload;
      return merge({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: result,
      });
    }
    default:
      return state;
  }
}

export default function postsBySubreddit(state = {}, action) {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
    case GET_POSTS.REQUEST:
    case GET_POSTS.SUCCESS: {
      const { subreddit } = action.meta;
      return merge({}, state, {
        [subreddit]: posts(state[subreddit], action),
      });
    }
    default:
      return state;
  }
}
