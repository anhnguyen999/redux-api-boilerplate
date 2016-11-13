import { SELECT_SUBREDDIT } from '../actions/redditActions.js';

export default function selectedSubreddit(state = 'reactjs', action) {
  switch (action.type) {
    case SELECT_SUBREDDIT:
      return action.meta.subreddit;
    default:
      return state;
  }
}

export function selectSelectedSubreddit(state) {
  return state.get('selectedSubreddit');
}
