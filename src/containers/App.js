import React, { Component } from 'react';
import HomePage from '../layout/HomePage/HomePage.js';
import socket from '../api/socket.js';

export default class App extends Component {
  componentDidMount() {
    socket();
  }

  render() {
    return (
      <HomePage/>
    );
  }
}
