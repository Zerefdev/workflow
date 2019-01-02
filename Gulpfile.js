"use strict";
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    newer = require('gulp-newer'),
    imagemin = require('gulp-imagemin'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload,
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    watch = require('gulp-watch'),
    imgSrc = 'assets/images/originals/*',
    imgDest = 'assets/images/';

gulp.task('browser-sync', function() {
    browserSync.init({
      server: {
          baseDir: "./"
      }
    });
});

gulp.task('sass', function () {
  return gulp.src('assets/sass/style.sass')
    .pipe(sourcemaps.init())
    .pipe(autoprefixer({ browsers: ['last 2 versions'], cascade: false }))
    .pipe(sass({ outputStyle:'compressed'}).on('error', sass.logError))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./'));
});


gulp.task('watch', function() {

    // Watch .scss files
    gulp.watch('assets/sass/*.sass', ['sass']).on("change", browserSync.reload);
    gulp.watch('assets/sass/**/*.sass', ['sass']).on("change", browserSync.reload);
    gulp.watch('assets/js/**/*.js', ['js']).on("change", browserSync.reload);
});

gulp.task('images', function() {
    return gulp.src(imgSrc, {base: 'assets/images/originals'})
        .pipe(newer(imgDest))
        .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
        .pipe(gulp.dest(imgDest));
});


var jsInput = { js: 'assets/js/dev/**/*.js' };
var jsOutput = 'assets/js/dist/';

gulp.task('js', function(){
  return gulp.src(jsInput.js)
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./assets/js/dist/'))
});

gulp.task('default',['sass', 'browser-sync','watch','images', 'js']);
