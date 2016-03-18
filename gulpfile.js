var path = require('path')
var gulp = require('gulp')
var gutil = require('gulp-util')
var shell = require('gulp-shell')

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

// Publish task
gulp.task('publish', [ 'publish:bump', 'build', 'publish:git' ])

gulp.task('publish:bump', function () {
  var argv = require('yargs').argv
  var bump = require('gulp-bump')

  if (argv.release) {
    var release = argv.release.toLowerCase()

    switch (release) {
      case 'major':
      case 'premajor':
      case 'minor':
      case 'preminor':
      case 'patch':
      case 'prepatch':
      case 'prerelease':
        var bumpConfig = {
          type: release
        }
        if (argv.preid) {
          bumpConfig.preid = argv.preid.toLowerCase()
        }

        return gulp.src('./package.json')
          .pipe(bump(bumpConfig))
          .pipe(gulp.dest('./'))
      default:
        gutil.log('Invalid release provided')
    }
  } else {
    gutil.log('Invalid number of arguments. Exactly one must be provided.')
  }
})

gulp.task('publish:git', ['build'], function () {
  var git = require('gulp-git')
  var through = require('through2')

  var version = require('./package.json').version

  return gulp.src('./package.json')
    .pipe(git.commit(undefined, {
      args: `-am "release: ${version}"`,
      disableMessageRequirement: true
    }))
    .pipe(git.tag(version, `release: ${version}`, function (err) {
      if (err) {
        throw err
      }
    }))
    .pipe(git.push('origin', 'master', function (err) {
      if (err) {
        throw err
      }
    }))
    .pipe(git.push('origin', null, { args: '--tags' }, function (err) {
      if (err) {
        throw err
      }
    }))
})

gulp.task('publish:npm', ['publish:git'], shell.task([ 'npm publish' ]))
