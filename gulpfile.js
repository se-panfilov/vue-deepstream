var path = require('path')
var gulp = require('gulp')
var gutil = require('gulp-util')

// The development server
gulp.task('default', ['webpack-dev-server'])

gulp.task('webpack-dev-server', function () {
  require('./build/dev-server').listen(8080, function (err) {
    if (err) {
      gutil.log(err)
      return
    }

    gutil.log('Listening at http://localhost:8080')
  })
})

// Production build
gulp.task('build', function (cb) {
  var config = require('./build/webpack.prod.conf')
  var webpack = require('webpack')

  webpack(config, function (err, stats) {
    if (err) {
      throw new gutil.PluginError('build', err)
    }

    gutil.log('[build]', stats.toString({
      colors: true
    }))

    cb()
  })
})

// Run tests
gulp.task('test', [ 'test:unit' ])

gulp.task('test:unit', function (cb) {
  var Server = require('karma').Server
  new Server({ configFile: path.resolve(__dirname, './build/karma.conf.js') }, cb).start()
})

// gulp.task('test:e2e', function (cb) {
//   cb()
// })
