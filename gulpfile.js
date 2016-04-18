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

// Build tasks
gulp.task('build', function () {
  var webpack = require('webpack-stream')
  var config = require('./build/webpack.prod.conf')

  var feedbackFnc = function (err, stats) {
    if (err) {
      throw new gutil.PluginError('build', err)
    }

    gutil.log('[build]', stats.toString({
      colors: true
    }))
  }

  return gulp.src('./src/index.js')
    .pipe(webpack(config.unminified, null, feedbackFnc))
    .pipe(gulp.dest('./dist'))
    .pipe(webpack(config.minified, null, feedbackFnc))
    .pipe(gulp.dest('./dist'))
})

// Tests tasks
gulp.task('test', [ 'test:unit' ])

gulp.task('test:unit', function (cb) {
  var Server = require('karma').Server
  new Server({ configFile: path.resolve(__dirname, './build/karma.conf.js') }, cb).start()
})

// Publish task
gulp.task('publish', [ 'publish:bump', 'build', 'publish:git', 'publish:npm' ])

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
    .pipe(through.obj(function (file, enc, cb) {
      git.tag(version, `release: ${version}`)
      cb(null, file)
    }))
    .pipe(through.obj(function (file, enc, cb) {
      git.push('origin', 'master')
      cb(null, file)
    }))
    .pipe(through.obj(function (file, enc, cb) {
      git.push('origin', null, { args: '--tags' })
      cb(null, file)
    }))
})

gulp.task('publish:npm', ['publish:git'], function (cb) {
  var exec = require('child_process').exec

  exec('npm publish', function (err) {
    if (stdout) {
      console.log(stdout)
    }
    if (stderr) {
      console.log(stderr)
    }

    cb(err)
  })
})
