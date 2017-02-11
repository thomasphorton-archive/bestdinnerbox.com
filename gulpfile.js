'use strict'

const gulp = require('gulp');
const pug = require('gulp-pug2');
const sass = require('gulp-sass');

// SASS tasks
gulp.task('sass', function buildStyles() {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(gulp.dest('build/assets'))
})

gulp.task('sass:watch', function() {
  gulp.watch('./sass/**/*.scss', ['sass']);
})

// Pug tasks
gulp.task('views', function buildHTML() {
  return gulp.src('./views/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('build'))
});

gulp.task('views:watch', function() {
  gulp.watch('./views/**/*.pug', ['views']);
})

gulp.task('watch', ['sass:watch', 'views:watch']);

gulp.task('default', ['sass', 'views']);