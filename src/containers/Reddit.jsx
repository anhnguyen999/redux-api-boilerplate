import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  actionSelectSubreddit, actionInvalidateSubreddit, actionFetchPosts
} from '../actions/redditActions';
import { getPostBySubreddit, getPostBySubredditMeta } from '../redux/postBySubreddit';
import { getSelectedSubreddit } from '../redux/selectedSubreddit';
import Picker from '../components/Picker';
import Posts from '../components/Posts';

class RedditApp extends PureComponent {
  static propTypes = {
    selectedSubreddit: PropTypes.string.isRequired,

    // Action
    selectSubreddit: PropTypes.func.isRequired,
    invalidateSubreddit: PropTypes.func.isRequired,
    fetchPosts: PropTypes.func.isRequired,

    // Post data
    posts: PropTypes.arrayOf(PropTypes.object).isRequired,
    isFetching: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props);
    this.handleRefreshClick = this.handleRefreshClick.bind(this);
  }

  componentDidMount() {
    const { selectedSubreddit, fetchPosts } = this.props;
    fetchPosts(selectedSubreddit);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedSubreddit !== this.props.selectedSubreddit) {
      const { selectedSubreddit, fetchPosts } = nextProps;
      fetchPosts(selectedSubreddit);
    }
  }

  handleRefreshClick(e) {
    e.preventDefault();
    const { selectedSubreddit, invalidateSubreddit, fetchPosts } = this.props;
    invalidateSubreddit(selectedSubreddit);
    fetchPosts(selectedSubreddit);
  }

  render() {
    const { selectedSubreddit, posts, isFetching, selectSubreddit } = this.props;
    return (
      <div>
        <Picker
          value={selectedSubreddit}
          onChange={selectSubreddit}
          options={['reactjs', 'frontend']}
        />
        <p>
          {!isFetching &&
            <a href='' onClick={this.handleRefreshClick}>
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

export default connect(mapStateToProps, mapDispatchToProps)(RedditApp);
