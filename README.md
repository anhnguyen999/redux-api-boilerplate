# Redux API Boilerplate

[![Build Status](https://img.shields.io/travis/vanhtuan0409/redux-api-boilerplate/master.svg?style=flat-square)](https://travis-ci.org/vanhtuan0409/redux-api-boilerplate)
[![dependencies Status](https://david-dm.org/vanhtuan0409/redux-api-boilerplate/status.svg?style=flat-square)](https://david-dm.org/vanhtuan0409/redux-api-boilerplate)
[![devDependencies Status](https://david-dm.org/vanhtuan0409/redux-api-boilerplate/dev-status.svg?style=flat-square)](https://david-dm.org/vanhtuan0409/redux-api-boilerplate?type=dev)
[![Demo on Heroku](https://img.shields.io/badge/demo-heroku-brightgreen.svg?style=flat-square)](https://redux-api-boilerplate.herokuapp.com/)

A React - Redux boilerplate which focus on manage async API request to server. It is also packed with some of my favourite plugins from Redux eco-system. A standalone express server with HMR is included to make it easier for development and deploy.

#### Under the hood
- [React](https://github.com/facebook/react)
- [Redux](https://github.com/reactjs/redux)
- [Express](https://github.com/expressjs/express)
- [React Router](https://github.com/ReactTraining/react-router)
- [React Router Redux](https://github.com/reactjs/react-router-redux)
- [Redux Logix](https://github.com/jeffbski/redux-logic) for handle API request and also side-effects
- [Redux Form](https://github.com/erikras/redux-form)
- [Normalizr](https://github.com/paularmstrong/normalizr) for normalize your Redux data state
- [Isomorphic Fetch](https://github.com/matthew-andrews/isomorphic-fetch) as HTTP request agent
- [Babel](https://github.com/babel/babel) with latest ES7 preset
- [ESlint](http://eslint.org/) with [AirBnB config](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb)
- [Webpack](http://webpack.github.io/)
- [Webpack Dev Middleware](http://webpack.github.io/docs/webpack-dev-middleware.html)
- [Webpack Hot Middleware](https://github.com/glenjamin/webpack-hot-middleware)
- [Redux Devtools Extension](https://github.com/zalmoxisus/redux-devtools-extension)
- [Style loader](https://github.com/webpack/style-loader), [Sass loader](https://github.com/jtangelder/sass-loader), [File loader](https://github.com/webpack/file-loader) and [Autoprefixer](https://github.com/postcss/autoprefixer) to enhance your Stylesheet

#### Folder structure

## Getting Started

### Installation
```sh
$ git clone https://github.com/vanhtuan0409/redux-api-boilerplate/blob/master/package.json <app-name>
$ cd <app-name>
$ yarn install
```
If you are using npm, you can replace `yarn` with `npm`.

### Available Commands
1. `yarn run start` - Start server in default Dev mode (alias of `yarn run dev`)
2. `yarn run dev` - Start server in default Dev mode
3. `yarn run prod` - Start server in Production mode
4. `yarn run build` - Bundle project if you want to deploy by yourself
5. `yarn run clean` - Clear `dist` folder
6. `yarn run lint` - Run eslint to check for errors

### Environment Varaiables
Redux API Boilerplate uses express web framework. Express server check for `$NODE_ENV` in host machine to decide between `production` and `development` mode.

When running in `production` mode, some development tools like `hot reloading` and `redux devtools` is disabled. Source files are also minified.

If you want to run web server in specific port, you can use `$PORT` 

## Docker
### Prerequisites
- Docker
- Docker-compose >= 1.9.0

### Boostraping image
- `docker-compose build` for create image
- `docker-compose up` for bootstrap image

## TODO
- [ ] Add testing for React Component using Enzyme, Mocha and Karma
- [ ] Add more document on deploying and CI
- [ ] Update explaination for folder structure
- [ ] Add FAQ
- [ ] Add branch for integration with Bootstrap or SemanticUI

## Demo
Visit [https://redux-api-boilerplate.herokuapp.com/](https://redux-api-boilerplate.herokuapp.com/) for demo

## Contributing
I am more than happy to receive contributions in either of feedbacks, bug reports or even better with pull-request :D

## License
[MIT Liscence](https://nicksp.mit-license.org/), 2016

Brought to you by Tuan Vuong
