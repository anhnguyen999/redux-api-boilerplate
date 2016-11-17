import Immutable, { List } from 'immutable';
import { INVALIDATE_SUBREDDIT, GET_POSTS } from '../actions/redditActions';
import { getPost } from './entities';

export function getPostBySubreddit(state, subredditId) {
  const subreddit = state.get('postsBySubreddit').get(subredditId);
  const items = subreddit ? subreddit.get('items') : List([]);
  return items.map(postId => getPost(state, postId)).toJS();
}

export function getPostBySubredditMeta(state, subredditId) {
  const subreddit = state.get('postsBySubreddit').get(subredditId);
  const isFetching = subreddit ? subreddit.get('isFetching') : false;
  const didInvalidate = subreddit ? subreddit.get('didInvalidate') : false;
  return { isFetching, didInvalidate };
}

const postsInitalState = Immutable.fromJS({
  isFetching: false,
  didInvalidate: false,
  items: []
});
function posts(state = postsInitalState, action) {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT: {
      return state.merge({ didInvalidate: true });
    }
    case GET_POSTS.REQUEST: {
      return state.merge({ isFetching: true, didInvalidate: false });
    }
    case GET_POSTS.SUCCESS: {
      const { result } = action.payload;
      return state.merge({ isFetching: false, didInvalidate: false, items: result });
    }
    default:
      return state;
  }
}

const mapInitialState = Immutable.fromJS({});
export default function postsBySubreddit(state = mapInitialState, action) {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
    case GET_POSTS.REQUEST:
    case GET_POSTS.SUCCESS: {
      const { subreddit } = action.meta;
      const updatedSubreddit = posts(state.get(subreddit), action);
      return state.set(subreddit, updatedSubreddit);
    }
    default:
      return state;
  }
}
