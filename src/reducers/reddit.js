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

export function posts(state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
      return Object.assign({}, state, {
        didInvalidate: true
      });
    case GET_POSTS.REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });
    case GET_POSTS.SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.payload.result,
      });
    default:
      return state;
  }
}

export function postsBySubreddit(state = {}, action) {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
    case GET_POSTS.REQUEST:
    case GET_POSTS.SUCCESS:
      return Object.assign({}, state, {
        [action.meta.subreddit]: posts(state[action.meta.subreddit], action)
      });
    default:
      return state;
  }
}
