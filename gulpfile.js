var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var reactify = require('reactify');
var insert = require('gulp-insert');
var fs = require('fs');

gulp.task('build', function() {
  var preprocess = fs.readFileSync('./react_components/preprocess.jsx');
  // participant.js
  browserify('./react_components/participant.jsx')
    .transform('reactify')
    .bundle()
    .pipe(source('participant.js'))
    .pipe(insert.prepend(preprocess))
    .pipe(gulp.dest('./'));

  // host.js
  browserify('./react_components/host.jsx')
    .transform('reactify')
    .bundle()
    .pipe(source('host.js'))
    .pipe(insert.prepend(preprocess))
    .pipe(gulp.dest('./'));
});

gulp.task('watch', function() {
  gulp.watch([
    './react_components/**/*.jsx',
  ], ['build']);
});

gulp.task('default', ['build', 'watch']);
