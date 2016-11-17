import React, { PropTypes, PureComponent } from 'react';

export default class Posts extends PureComponent {
  static propTypes = {
    posts: PropTypes.arrayOf(PropTypes.object).isRequired
  }

  render() {
    return (
      <ul>
        {this.props.posts.map((post, i) =>
          <li key={i}>{post.title}</li>
        )}
      </ul>
    );
  }
}
