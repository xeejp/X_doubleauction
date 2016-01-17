var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var reactify = require('reactify');


function build(name) {
  gulp.src(['./src/'+ name +'.html'])
    .pipe(gulp.dest('dst/'))
    .pipe(gulp.dest('min/'));

  browserify({
    entries: ['./src/'+ name +'.js'],
    transform: [reactify]
  }).bundle()
    .pipe(source(name +'.js'))
    .pipe(gulp.dest('dst/'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('min/'));
}

gulp.task('build', function() {
  build('index');
  build('test');
});

gulp.task('watch', function() {
  gulp.watch([
    './src/**/*.js',
    '!./src/node_modules/**/*.js',
  ], ['build']);
});

gulp.task('default', ['build']);
