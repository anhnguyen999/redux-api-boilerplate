import path from 'path';
import express from 'express';
import webpack from 'webpack';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';

const config = process.env.NODE_ENV === 'production' ?
  require('./webpack.config.prod') : require('./webpack.config.dev');

const app = express();
const distPath = path.join(__dirname, 'dist');
const indexPath = path.join(__dirname, 'dist/index.html');
const port = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'production') {
  const compiler = webpack(config);
  const middleware = devMiddleware(compiler, {
    noInfo: true,
  });
  app.use(middleware);
  app.use(hotMiddleware(compiler));
  app.get('*', (req, res) => {
    const indexFile = middleware.fileSystem.readFileSync(indexPath);
    res.end(indexFile);
  });
} else {
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    res.sendFile(indexPath);
  });
}

console.log(`App is running in ${process.env.NODE_ENV || 'development'} mode`)
app.listen(port, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`Listening at port: ${port}`);
});
