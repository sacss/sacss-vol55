var gulp = require('gulp'),
    watch = require('gulp-watch'),
    connect = require('gulp-connect'),
    clean = require('gulp-clean'),
    compass = require('gulp-compass'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    open = require('gulp-open'),
    image = require('gulp-image');

gulp.task('clean', function () {
  return gulp.src('html/', {read: false})
    .pipe(clean());
});

gulp.task('compass', function() {
  return gulp.src('source/css/*.scss')
    .pipe(compass({
      style: 'expanded',
      comments: false,
      relative: false,
      css: 'html/css',
      sass: 'source/css',
      image: 'source/img'
    }));
});

// コピーはモジュールなしで可能
gulp.task('html', function() {
  return gulp.src('source/**/*.html')
    .pipe(gulp.dest('html/'))
    .pipe(connect.reload());
});

gulp.task('image', function() {
  return gulp.src(['source/**/*.gif', 'source/**/*.jpg', 'source/**/*.png'])
    .pipe(gulp.dest('html/'))
    .pipe(image())
    .pipe(connect.reload());
});

gulp.task('jshint', function() {
  return gulp.src(['source/js/functions1.js', 'source/js/functions2.js'])
    .pipe(jshint())
    .pipe(gulp.dest('html/js/'))
    .pipe(connect.reload());
});

gulp.task('js', function() {
  return gulp.src(['source/js/jquery-2.1.1.min.js', 'source/js/functions1.js', 'source/js/functions2.js'])
    .pipe(concat('main.js'))
    .pipe(gulp.dest('html/js/'))
    .pipe(connect.reload());
});

gulp.task('connect', function() {
  connect.server({
    root: 'html',
    port: 8000,
    livereload: true
  });
});

gulp.task("open", function() {
  gulp.src("./html/index.html")
    .pipe(open('',{url: "http://localhost:8000"}));
});

gulp.task('watch', function () {
  gulp.watch(['source/**/*.html'], ['html']);
  gulp.watch(['source/**/*.gif', 'source/**/*.jpg', 'source/**/*.png'], ['image']);
  gulp.watch(['source/js/*.js'], ['jshint', 'js']);
});

gulp.task('default', ['clean', 'html', 'compass', 'image', 'js', 'connect', 'watch', 'open']);

