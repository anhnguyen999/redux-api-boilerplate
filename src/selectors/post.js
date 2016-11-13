import { List } from 'immutable';

export function getPostBySubreddit(state, subredditId) {
  const { entities, postsBySubreddit } = state;
  const subreddit = postsBySubreddit.get(subredditId);
  const items = subreddit ? subreddit.get('items') : List([]);
  return items.map(postId => entities.get('post').get(postId)).toJS();
}

export function isFetchingSubreddit(state, subredditId) {
  const { postsBySubreddit } = state;
  const subreddit = postsBySubreddit.get(subredditId);
  const isFetching = subreddit ? subreddit.get('isFetching') : false;
  return isFetching;
}
