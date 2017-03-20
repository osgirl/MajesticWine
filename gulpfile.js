var gulp = require('gulp');
var clean = require('gulp-clean');
var ts = require('gulp-typescript');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var ngAnnotate = require('gulp-ng-annotate');
var csscomb = require('gulp-csscomb');
var sass = require('gulp-sass');

gulp.task('clean-scripts', function () {
    return gulp.src([
		'dev/js/**/*.*',
		'dist/scripts/**/*.*'
	], {read: false})
        .pipe(clean());
});

gulp.task('ts', ['clean-scripts'], function () {
    return gulp.src('dev/ts/**/*.ts')
        .pipe(ts({
            noImplicitAny: true,
            //out: 'output.js'
        }))
        .pipe(gulp.dest('dev/js'));
});

gulp.task('concat-scripts', ['ts'], function() {
    return gulp.src([
        'dev/js/main.js',
        'dev/js/data.service.js',
        'dev/js/authentication.js',
        'dev/js/**/*.service.js',
        'dev/js/**/*.directive.js',
        'dev/js/**/*.controller.js'
	])
    .pipe(concat('app.js'))
    .pipe(gulp.dest('dist/scripts'));
});

gulp.task('ngAnnotate', ['concat-scripts'], function() {
    return gulp.src('dist/scripts/**/*.js')
        .pipe(ngAnnotate())
        .pipe(gulp.dest('dist/scripts'));
})

gulp.task('scripts', ['ngAnnotate'], function (cb) {
	return gulp.src('dist/scripts/*.js')
		.pipe(
        	uglify()
		)
        .pipe(
			gulp.dest('dist/scripts')
		)
});

gulp.task('clean-html', function () {
    return gulp.src([
		'dist/**/*.html'
	], {read: false})
        .pipe(clean());
});

gulp.task('html', ['clean-html'], function() {
  return gulp.src('dev/html/**/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'));
});

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
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('dist/styles/'));
});

gulp.task('watch', function() {
    gulp.watch('dev/ts/**/*.ts', ['scripts']);
    gulp.watch('dev/html/**/*.html', ['html']);
    gulp.watch('dev/scss/**/*.scss', ['sass']);
});

gulp.task('default', ['scripts', 'html'], function() {});
