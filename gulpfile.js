'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');


// Transpile ES6 and uglify the resulting JavaScript.
gulp.task('es6', function () {
  return gulp.src('app/scripts.js')
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

// Transpile SASS and minify the resulting CSS.
gulp.task('sass', function () {
  return gulp.src('app/styles.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(minifyCss())
    .pipe(gulp.dest('dist'));
});

// Run all build tasks.
gulp.task('default', ['es6', 'sass']);
