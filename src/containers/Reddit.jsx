import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  selectSubreddit, invalidateSubreddit, fetchPosts
} from '../actions/redditActions';
import { selectPostBySubreddit, selectPostBySubredditMeta } from '../redux/postBySubreddit';
import { selectSelectedSubreddit } from '../redux/selectedSubreddit';
import Picker from '../components/Picker';
import Posts from '../components/Posts';

class RedditApp extends PureComponent {
  static propTypes = {
    selectedSubreddit: PropTypes.string.isRequired,

    // Action
    selectSubredditAction: PropTypes.func.isRequired,
    invalidateSubredditAction: PropTypes.func.isRequired,
    fetchPostsAction: PropTypes.func.isRequired,

    // Post data
    posts: PropTypes.arrayOf(PropTypes.object).isRequired,
    isFetching: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleRefreshClick = this.handleRefreshClick.bind(this);
  }

  componentDidMount() {
    const { selectedSubreddit, fetchPostsAction } = this.props;
    fetchPostsAction(selectedSubreddit);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedSubreddit !== this.props.selectedSubreddit) {
      const { selectedSubreddit, fetchPostsAction } = nextProps;
      fetchPostsAction(selectedSubreddit);
    }
  }

  handleChange(nextSubreddit) {
    this.props.selectSubredditAction(nextSubreddit);
  }

  handleRefreshClick(e) {
    e.preventDefault();
    const { selectedSubreddit, invalidateSubredditAction, fetchPostsAction } = this.props;
    invalidateSubredditAction(selectedSubreddit);
    fetchPostsAction(selectedSubreddit);
  }

  render() {
    const { selectedSubreddit, posts, isFetching } = this.props;
    return (
      <div>
        <Picker
          value={selectedSubreddit}
          onChange={this.handleChange}
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
  const selectedSubreddit = selectSelectedSubreddit(state);
  return {
    selectedSubreddit,
    posts: selectPostBySubreddit(state, selectedSubreddit),
    isFetching: selectPostBySubredditMeta(state, selectedSubreddit).isFetching,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    selectSubredditAction: subreddit => dispatch(selectSubreddit(subreddit)),
    invalidateSubredditAction: subreddit => dispatch(invalidateSubreddit(subreddit)),
    fetchPostsAction: subreddit => dispatch(fetchPosts(subreddit)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RedditApp);
