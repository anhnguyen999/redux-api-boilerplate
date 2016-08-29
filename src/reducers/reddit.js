import Constant from '../constants/constant.js';

export function selectedSubreddit(state = 'reactjs', action) {
  switch (action.type) {
    case Constant.ActionTypes.SELECT_SUBREDDIT:
      return action.subreddit;
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
    case Constant.ActionTypes.INVALIDATE_SUBREDDIT:
      return Object.assign({}, state, {
        didInvalidate: true
      });
    case Constant.ActionTypes.GET_POSTS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });
    case Constant.ActionTypes.GET_POSTS_SUCCESS:
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
    case Constant.ActionTypes.INVALIDATE_SUBREDDIT:
    case Constant.ActionTypes.GET_POSTS_REQUEST:
    case Constant.ActionTypes.GET_POSTS_SUCCESS:
      return Object.assign({}, state, {
        [action.meta.subreddit]: posts(state[action.meta.subreddit], action)
      });
    default:
      return state;
  }
}
