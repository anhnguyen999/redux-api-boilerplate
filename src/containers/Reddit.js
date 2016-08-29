import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  selectSubreddit, invalidateSubreddit, fetchPostsIfNeeded
} from '../actions/redditActions.js';
import { getSelectedPosts, isFetchingSelectedPosts } from '../selectors/post.js';

class RedditApp extends Component {
  static propTypes = {
    selectedSubreddit: React.PropTypes.string.isRequired,

    // Action
    selectSubreddit: React.PropTypes.func.isRequired,
    invalidateSubreddit: React.PropTypes.func.isRequired,
    fetchPostsIfNeeded: React.PropTypes.func.isRequired,

    // Post data
    posts: React.PropTypes.array.isRequired,
    isFetching: React.PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleRefreshClick = this.handleRefreshClick.bind(this);
  }

  componentDidMount() {
   const { selectedSubreddit, fetchPostsIfNeeded } = this.props
   fetchPostsIfNeeded(selectedSubreddit)
  }

  componentWillReceiveProps(nextProps) {
   if (nextProps.selectedSubreddit !== this.props.selectedSubreddit) {
     const { selectedSubreddit, fetchPostsIfNeeded } = nextProps
     fetchPostsIfNeeded(selectedSubreddit)
   }
  }

  handleChange(nextSubreddit) {
   this.props.selectSubreddit(nextSubreddit)
  }

  handleRefreshClick(e) {
   e.preventDefault()

   const { selectedSubreddit, invalidateSubreddit, fetchPostsIfNeeded } = this.props
   invalidateSubreddit(selectedSubreddit)
   fetchPostsIfNeeded(selectedSubreddit)
  }

  render() {
    console.log(this.props.posts);
    console.log(this.props.isFetching);
    return (
      <p>tuanvuong</p>
    );
  }
}

function mapStateToProps(state) {
  const { selectedSubreddit } = state

  return {
    selectedSubreddit,
    posts: getSelectedPosts(state),
    isFetching: isFetchingSelectedPosts(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    selectSubreddit: subreddit => dispatch(selectSubreddit(subreddit)),
    invalidateSubreddit: subreddit => dispatch(invalidateSubreddit(subreddit)),
    fetchPostsIfNeeded: subreddit => dispatch(fetchPostsIfNeeded(subreddit)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RedditApp);
