'use strict'

const gulp = require('gulp');
const pug = require('gulp-pug2');
const sass = require('gulp-sass');
const awsConfig = require('./config/aws');
const s3 = require('gulp-s3-upload')(awsConfig);

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
  return gulp.src('./views/**/!(_)*.pug')
    .pipe(pug({
      basedir: './views/'
    }))
    .pipe(gulp.dest('build'))
});

gulp.task('views:watch', function() {
  gulp.watch('./views/**/*.pug', ['views']);
})

gulp.task('deploy', function() {
  gulp.src('./build/**')
    .pipe(s3({
      Bucket: 'bestdinnerbox.com',
      ACL: 'public-read'
    }));
});

gulp.task('watch', ['sass:watch', 'views:watch']);

gulp.task('default', ['sass', 'views']);