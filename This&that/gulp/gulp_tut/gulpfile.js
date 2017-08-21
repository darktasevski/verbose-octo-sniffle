/* File: gulpfile.js */

// grab our gulp packages
var gulp  = require('gulp'),
    //minifyCSS = require('gulp-minify-css'),
    concat = require('gulp-concat');

// // create a default task and just log a message
// gulp.task('default', function() {
//   console.log('Gulp is running!!!');
// });


// gulp.task('styles', function() {
//   gulp.src(['src/styles/*.css'])
//     .pipe(concat('styles.css'))
//     .pipe(minifyCSS())
//     .pipe(gulp.dest('build/styles/'));
// });


// 'scripts' task
gulp.task('scripts', function() {
  return gulp.src('./assets/*.js')
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('./dist/'));
});


// default task
gulp.task('default', ['scripts'], function() {
    // watch for JS changes
    gulp.watch('./assets/*.js', ['scripts']);
});