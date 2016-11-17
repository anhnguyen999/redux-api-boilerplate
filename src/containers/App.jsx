import React, { PureComponent } from 'react';
import { Link } from 'react-router';

export default class App extends PureComponent {
  static propTypes = {
    children: React.PropTypes.node,
  }

  render() {
    return (
      <div>
        <div className="menu">
          <Link to="/" className="menu-item">Home</Link>
          <Link to="/foo" className="menu-item">Foo</Link>
          <Link to="/bar" className="menu-item">Bar</Link>
        </div>
        {this.props.children}
      </div>
    );
  }
}
