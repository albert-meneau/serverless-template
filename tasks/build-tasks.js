'use strict';

var gulp   = require('gulp');
var eslint = require('gulp-eslint');

gulp.task('lint', function () {
  return gulp.src(
    [
      'functions/**/*.js',
      '!**/node_modules/**',
      '!coverage/**'
    ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});
