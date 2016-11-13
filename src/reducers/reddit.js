import Immutable from 'immutable';
import {
  SELECT_SUBREDDIT,
  INVALIDATE_SUBREDDIT,
  GET_POSTS,
} from '../actions/redditActions.js';

export function selectedSubreddit(state = 'reactjs', action) {
  switch (action.type) {
    case SELECT_SUBREDDIT:
      return action.meta.subreddit;
    default:
      return state;
  }
}

const postsInitalState = Immutable.fromJS({
  isFetching: false,
  didInvalidate: false,
  items: []
});
export function posts(state = postsInitalState, action) {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
      return state.merge({ didInvalidate: true });
    case GET_POSTS.REQUEST:
      return state.merge({ isFetching: true, didInvalidate: false });
    case GET_POSTS.SUCCESS:
      const { result } = action.payload;
      return state.merge({ isFetching: false, didInvalidate: false, items: result });
    default:
      return state;
  }
}

const mapInitialState = Immutable.fromJS({});
export function postsBySubreddit(state = mapInitialState, action) {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
    case GET_POSTS.REQUEST:
    case GET_POSTS.SUCCESS:
      const { subreddit } = action.meta;
      const updatedSubreddit = posts(state.get(subreddit), action);
      return state.set(subreddit, updatedSubreddit);
    default:
      return state;
  }
}
