import React, { Component } from 'react';

export default class App extends Component {
  static propTypes = {
    children: React.PropTypes.object,
  }
  render() {
    return (
      <div>
        <div className="menu">
          <a href="/" className="menu-item">Home</a>
          <a href="/foo" className="menu-item">Foo</a>
          <a href="/bar" className="menu-item">Bar</a>
        </div>
        {this.props.children}
      </div>
    )
  }
}
