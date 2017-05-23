'use strict';

const gulp        = require('gulp');
const istanbul    = require('gulp-istanbul');
const gmocha      = require('gulp-mocha');
const runSequence = require('run-sequence');
const coveralls   = require('gulp-coveralls');

gulp.task('pre-test', () => {
  return gulp.src(
    [
      'functions/**/*.js',
      '!**/node_modules/**',
    ])
    .pipe(istanbul({ includeUntested: true }))
    .pipe(istanbul.hookRequire());
});

gulp.task('lib-tests', () => {
  return gulp.src(
    [
      'test/lib/*.js',
    ])
    .pipe(gmocha({timeout: 5000}));
});

gulp.task('function-tests', () => {
  return gulp.src(
    [
      'test/sampleLambda_test.js',
    ])
    .pipe(gmocha({timeout: 5000}));
});

gulp.task('test', ['pre-test'], () => {
  return gulp.src(
    [
      'test/**/*.js',
    ])
    .pipe(gmocha({timeout: 5000}))
    .pipe(istanbul.writeReports())
    .pipe(istanbul.enforceThresholds({ thresholds: { global: 80 } }));
});

gulp.task('coveralls', ['test'], () => {
  return gulp.src('./coverage/lcov.info')
    .pipe(coveralls());
});
