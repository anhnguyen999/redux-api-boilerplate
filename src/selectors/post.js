export function getSelectedPosts(state) {
  const { entities, selectedSubreddit, postsBySubreddit } = state;
  const subreddit = postsBySubreddit[selectedSubreddit];
  const items = subreddit ? subreddit.items : [];
  return items.map(postId => entities.posts[postId]);
}

export function isFetchingSelectedPosts(state) {
  const { selectedSubreddit, postsBySubreddit } = state;
  const subreddit = postsBySubreddit[selectedSubreddit];
  const isFetching = subreddit ? subreddit.isFetching : false;
  return isFetching;
}
