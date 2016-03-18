var path = require('path')
var webpack = require('webpack')
var merge = require('webpack-merge')
var baseConfig = require('./webpack.base.conf')

// whether to generate source map for production files.
// disabling this can speed up the build.
var SOURCE_MAP = true

var unminified = merge(baseConfig, {
  devtool: false,
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'vue-deepstream.js',
    library: 'VueDeepstream',
    libraryTarget: 'umd'
  },
  externals: [
    {
      'deepstream.io-client-js': true
    }
  ],
  plugins: [
    // http://vuejs.github.io/vue-loader/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ]
})

var minified = merge(unminified, {
  devtool: SOURCE_MAP ? '#source-map' : false,
  output: {
    filename: 'vue-deepstream.min.js',
    sourceMapFilename: '[file].map'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
})

module.exports = {
  unminified,
  minified
}
