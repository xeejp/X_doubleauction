var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var reactify = require('reactify');

gulp.task('build', function() {
  // participant
  browserify('./react_components/participant.jsx')
    .transform('reactify')
    .bundle()
    .pipe(source('participant.js'))
    .pipe(gulp.dest('./'));

  // host
  browserify('./react_components/host.jsx')
    .transform('reactify')
    .bundle()
    .pipe(source('host.js'))
    .pipe(gulp.dest('./'));
});

gulp.task('watch', function() {
  gulp.watch([
    './react_components/**/*.jsx',
  ], ['build']);
});

gulp.task('default', ['build']);
