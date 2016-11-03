import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  selectSubreddit, invalidateSubreddit, fetchPosts
} from '../actions/redditActions.js';
import { getSelectedPosts, isFetchingSelectedPosts } from '../selectors/post.js';
import Picker from '../components/Picker.js';
import Posts from '../components/Posts.js';

class RedditApp extends Component {
  static propTypes = {
    selectedSubreddit: React.PropTypes.string.isRequired,

    // Action
    selectSubreddit: React.PropTypes.func.isRequired,
    invalidateSubreddit: React.PropTypes.func.isRequired,
    fetchPosts: React.PropTypes.func.isRequired,

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
   const { selectedSubreddit, fetchPosts } = this.props
   fetchPosts(selectedSubreddit)
  }

  componentWillReceiveProps(nextProps) {
   if (nextProps.selectedSubreddit !== this.props.selectedSubreddit) {
     const { selectedSubreddit, fetchPosts } = nextProps
     fetchPosts(selectedSubreddit)
   }
  }

  handleChange(nextSubreddit) {
   this.props.selectSubreddit(nextSubreddit)
  }

  handleRefreshClick(e) {
   e.preventDefault()

   const { selectedSubreddit, invalidateSubreddit, fetchPosts } = this.props
   invalidateSubreddit(selectedSubreddit)
   fetchPosts(selectedSubreddit)
  }

  render() {
    const { selectedSubreddit, posts, isFetching } = this.props
    return (
      <div>
        <Picker
          value={selectedSubreddit}
          onChange={this.handleChange}
          options={[ 'reactjs', 'frontend' ]}
        />
        <p>
          {!isFetching &&
            <a href='#'
               onClick={this.handleRefreshClick}>
              Refresh
            </a>
          }
        </p>
        {isFetching && posts.length === 0 &&
          <h2>Loading...</h2>
        }
        {!isFetching && posts.length === 0 &&
          <h2>Empty.</h2>
        }
        {posts.length > 0 &&
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <Posts posts={posts} />
          </div>
        }
      </div>
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
    fetchPosts: subreddit => dispatch(fetchPosts(subreddit)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RedditApp);
