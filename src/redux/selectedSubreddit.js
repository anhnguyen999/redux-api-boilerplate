import { SELECT_SUBREDDIT } from '../actions/redditActions';

export function getSelectedSubreddit(state) {
  return state.get('selectedSubreddit');
}

export default function selectedSubreddit(state = 'reactjs', action) {
  switch (action.type) {
    case SELECT_SUBREDDIT:
      return action.meta.subreddit;
    default:
      return state;
  }
}
