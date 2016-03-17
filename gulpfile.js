var gulp = require('gulp')
var gutil = require('gulp-util')
var merge = require('webpack-merge')

// The development server
gulp.task('default', ['webpack-dev-server'])

// Production build
gulp.task('build', function (cb) {
  var config = require('./build/webpack.prod.conf')
  var webpack = require('webpack')

  webpack(config, function(err, stats) {
    if (err) {
      throw new gutil.PluginError('build', err)
    }

    gutil.log('[build]', stats.toString({
      colors: true
    }))

    cb()
  })
})

gulp.task('webpack-dev-server', function () {
  require('./build/dev-server').listen(8080, function (err) {
    if (err) {
      gutil.log(err)
      return
    }

    gutil.log('Listening at http://localhost:8080')
  })
})
