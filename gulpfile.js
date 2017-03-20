var gulp = require('gulp');
var csscomb = require('gulp-csscomb');
var sass = require('gulp-sass');

gulp.task('csscomb', function() {
    return gulp.src([
        'dev/scss/**/*.scss'
    ])
    .pipe(csscomb())
    .pipe(gulp.dest('dev/scss/'));
});

gulp.task('sass', ['csscomb'], function () {
    return gulp.src([
        'dev/scss/**/*.scss',
        '!dev/scss/**/_*.scss'
    ])
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/styles/'));
});

gulp.task('watch', function() {
    gulp.watch('dev/scss/**/*.scss', ['sass']);
});

gulp.task('default', ['sass'], function() {});
