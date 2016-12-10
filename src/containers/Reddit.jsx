import { connect } from 'react-redux';
import {
  actionSelectSubreddit, actionInvalidateSubreddit, actionFetchPosts
} from '../actions/redditActions';
import { getPostBySubreddit, getPostBySubredditMeta } from '../redux/postBySubreddit';
import { getSelectedSubreddit } from '../redux/selectedSubreddit';
import Reddit from '../components/Reddit';

function mapStateToProps(state) {
  const selectedSubreddit = getSelectedSubreddit(state);
  return {
    selectedSubreddit,
    posts: getPostBySubreddit(state, selectedSubreddit),
    isFetching: getPostBySubredditMeta(state, selectedSubreddit).isFetching,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    selectSubreddit: subreddit => dispatch(actionSelectSubreddit(subreddit)),
    invalidateSubreddit: subreddit => dispatch(actionInvalidateSubreddit(subreddit)),
    fetchPosts: subreddit => dispatch(actionFetchPosts(subreddit)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Reddit);
