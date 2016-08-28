import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPostsIfNeeded } from '../actions/redditActions.js';

class DeviceListContainer extends Component {
  static propTypes = {
    selectedSubreddit: React.PropTypes.string.isRequired,
    getPosts: React.PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getPosts(this.props.selectedSubreddit);
  }

  render() {
    return (
      <p>tuanvuong</p>
    );
  }
}

function mapStateToProps(state) {
  return {
    selectedSubreddit: state.selectedSubreddit,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getPosts: subreddit => dispatch(fetchPostsIfNeeded(subreddit)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DeviceListContainer);
