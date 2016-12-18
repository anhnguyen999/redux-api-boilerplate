import React, { PureComponent } from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import App from './containers/App';
import Reddit from './containers/Reddit';
import FormView from './layout/FormView';
import VersionView from './layout/VersionView';
import NotFound from './layout/NotFound';

/**
 * Component is exported for conditional usage in Root.js
 */
export default class Root extends PureComponent {
  static propTypes = {
    history: React.PropTypes.object,
  }

  render() {
    const { history } = this.props;
    return (
      /**
       * Provider is a component provided to us by the 'react-redux' bindings that
       * wraps our app - thus making the Redux store/state available to our 'connect()'
       * calls in component hierarchy below.
       */
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={Reddit} />
          <Route path="form" component={FormView} />
          <Route path="bar" component={VersionView} />
        </Route>
        <Route path="*" component={NotFound} />
      </Router>
    );
  }
};
