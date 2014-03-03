var gulp = require('gulp')
  , concat = require('gulp-concat')
  , rename = require('gulp-rename')
  , uglify = require('gulp-uglify')
  , jshint = require('gulp-jshint')
  , stylish = require('jshint-stylish')
  , nodeunit = require('gulp-nodeunit-runner')
  , fs = require('fs');

gulp.task('test', function(){
  // jsHint
  gulp.src([
      'Gruntfile.js',
      'numeral.js',
      'languages/**/*.js'
    ])
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));

  // Nodeunit
  gulp.src('tests/**/*.js')
    .pipe(nodeunit({
      reporter: 'default'
    }));
});

gulp.task('build', ['test'], function() {
  // Minify individual language files
  fs.readdirSync('./languages').forEach(function (path) {
    var language = path.slice(0, -3);
    gulp.src('languages/' + path)
      .pipe(uglify({
        preserveComments: 'some'
      }))
      .pipe(rename(language + '.min.js'))
      .pipe(gulp.dest('min/languages'))
  });

  // concat and minify languages.js
  gulp.src('languages/**/*.js')
    .pipe(concat('languages.js'))
    .pipe(gulp.dest('.'))
    .pipe(uglify({
      preserveComments: 'some'
    }))
    .pipe(rename('languages.min.js'))
    .pipe(gulp.dest('min'))

  // minify numeral.js
  gulp.src('numeral.js')
    .pipe(uglify({
      preserveComments: 'some'
    }))
    .pipe(rename('numeral.min.js'))
    .pipe(gulp.dest('min'))
});

gulp.task('default', ['test']);
gulp.task('travis', ['test']);