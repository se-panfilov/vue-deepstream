var path = require('path')
var webpack = require('webpack')
var merge = require('webpack-merge')
var baseConfig = require('./webpack.base.conf')
var cssLoaders = require('./css-loaders')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')

// whether to generate source map for production files.
// disabling this can speed up the build.
var SOURCE_MAP = true

module.exports = merge(baseConfig, {
  devtool: SOURCE_MAP ? '#source-map' : false,
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'vue-deepstream.min.js',
    sourceMapFilename: '[file].map',
    library: 'VueDeepstream',
    libraryTarget: 'umd'
  },
  externals: [
    {
      'deepstream.io-client-js': true
    }
  ],
  plugins: [
    // http://vuejs.github.io/vue-loader/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
})
