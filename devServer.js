"use strict";

const path = require('path');
const express = require('express');
const webpack = require('webpack');
const config = require('./webpack.config.dev');
const proxy = require('http-proxy-middleware');

const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

if (config.proxy) {
  const paths = Object.keys(config.proxy);
  for (let i = 0; i < paths.length; i++) {
    const path = paths[i];
    const option = config.proxy[path];
    app.use(proxy(path, option));
  }
}

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3000, (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:3000');
});
