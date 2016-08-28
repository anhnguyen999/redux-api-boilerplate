import Constant from '../constants/constant.js';
import Immutable from 'immutable';

export function selectedSubreddit(state = 'reactjs', action) {
  switch (action.type) {
    case Constant.ActionTypes.SELECT_SUBREDDIT:
      return action.subreddit;
    default:
      return state;
  }
}

export function posts(state = Immutable.Map({
  isFetching: false,
  didInvalidate: false,
  items: []
}), action) {
  switch (action.type) {
    case Constant.ActionTypes.INVALIDATE_SUBREDDIT:
      return state.merge({
        didInvalidate: true
      });
    case Constant.ActionTypes.GET_POSTS_REQUEST:
      return state.merge({
        isFetching: true,
        didInvalidate: false
      });
    case Constant.ActionTypes.GET_POSTS_SUCCESS:
      return state.merge({
        isFetching: false,
        didInvalidate: false,
        items: action.payload.result,
      });
    default:
      return state;
  }
}

export function postsBySubreddit(state = Immutable.Map({}), action) {
  switch (action.type) {
    case Constant.ActionTypes.INVALIDATE_SUBREDDIT:
    case Constant.ActionTypes.GET_POSTS_REQUEST:
    case Constant.ActionTypes.GET_POSTS_SUCCESS:
      return state.merge({
        [action.subreddit]: posts(state.get(action.meta.subreddit), action)
      });
    default:
      return state;
  }
}
