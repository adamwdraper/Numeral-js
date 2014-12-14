var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var browserify = require('browserify');

gulp.task('default', function() {

  gulp.src(['numeral.js','locales.js'])
    .pipe(plugins.concat('index.js'))
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('jshint-stylish'))
    .pipe(gulp.dest('.'));

});
