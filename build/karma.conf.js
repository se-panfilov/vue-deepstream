var path = require('path')
var merge = require('webpack-merge')
var baseConfig = require('./webpack.base.conf')

var projectRoot = path.resolve(__dirname, '../')

var webpackConfig = merge(baseConfig, {
  devtool: '#inline-source-map',
  vue: {
    loaders: {
      js: 'isparta'
    }
  }
})

// no need for app entry
delete webpackConfig.entry

// make sure isparta loader is applied before eslint
webpackConfig.module.preLoaders.unshift({
  test: /\.js$/,
  loader: 'isparta',
  include: projectRoot,
  exclude: /test\/unit|node_modules/
})

// only apply babel for test files when using isparta
webpackConfig.module.loaders.some(function (loader, i) {
  if (loader.loader === 'babel') {
    loader.include = /test\/unit/
    return true
  }
})

module.exports = function (config) {
  config.set({
    browsers: [ 'PhantomJS' ],
    reporters: [ 'spec', 'coverage' ],
    frameworks: [ 'jasmine' ],
    files: [ '../test/unit/specs/index.js' ],
    preprocessors: {
      '../test/unit/specs/index.js': [ 'webpack', 'sourcemap' ]
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    },
    singleRun: true,
    coverageReporter: {
      dir: '../coverage',
      reporters: [
        { type: 'lcov', subdir: '.' },
        { type: 'text-summary' }
      ]
    }
  })
}
