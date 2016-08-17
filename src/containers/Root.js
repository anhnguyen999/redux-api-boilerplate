import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';
import App from './App.js';
import HomePage from '../layout/HomePage/HomePage.js';

/**
 * Component is exported for conditional usage in Root.js
 */
export default class Root extends Component {
  static propTypes = {
    store: React.PropTypes.object,
    history: React.PropTypes.object,
  }

  render() {
    const { store, history } = this.props;
    return (
      /**
       * Provider is a component provided to us by the 'react-redux' bindings that
       * wraps our app - thus making the Redux store/state available to our 'connect()'
       * calls in component hierarchy below.
       */
      <Provider store={store}>
        <Router history={history}>
          <Route path="/" component={App}>
            <Route path="home" component={HomePage}/>
          </Route>
        </Router>
      </Provider>
    );
  }
};
