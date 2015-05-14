var gulp = require('gulp');
var gutil = require('gulp-util');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var del = require('del');
var path = require('path');
var jasmine = require('gulp-jasmine');
var ngAnnotate = require('gulp-ng-annotate');
var header = require('gulp-header');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var stylish = require('gulp-jscs-stylish');

var banner = ['/**',
    ' * <%= pkg.name %> - <%= pkg.description %>',
    ' * @version v<%= pkg.version %>',
    ' * @link <%= pkg.homepage %>',
    ' * @license <%= pkg.license %>',
    ' * @author Christian Asmussen',
    ' */',
    ''].join('\n');

/* Read package.json info */
var pkg = require('./package');

var paths = {
    src: ["src/**/*.module.js", "src/**/*.js"],
    test: ["test/**/*.spec.js"],
    build: 'build',
    dist: path.dirname(pkg.main),
    'dist-name': path.basename(pkg.main)
};

gulp.task('default', ['build']);

gulp.task('build', ['clean', 'lint'], function () {
    return gulp.src(paths.src)
        .pipe(concat(paths['dist-name']))
        .pipe(header(banner, {pkg: pkg}))
        .pipe(gulp.dest(paths.build))
        .pipe(ngAnnotate())
        .pipe(uglify({preserveComments: 'some'}))
        .pipe(rename({extname: '.min.js'}))
        .pipe(gulp.dest(paths.build))
        .pipe(notify({
            title: 'Task Builder',
            message: 'Successfully built application'
        }));
});

gulp.task('clean', function (cb) {
    del(paths.build, cb);
});

gulp.task('test', ['build'], function () {
    return gulp.src(paths.test)
        .pipe(jasmine());
});

gulp.task('watch-test', function () {
    gulp.watch([paths.src, paths.test], ['test']);
});

gulp.task('dist-clean', ['test'], function (cb) {
    del(paths.dist, cb);
});

gulp.task('dist', ['dist-clean', 'build', 'test'], function () {
    return gulp.src(paths.build + '/*.js')
        .pipe(gulp.dest(paths.dist));
});

gulp.task('lint', function () {
    gulp.src(paths.src)
        //.pipe(plumber())
        .pipe(jshint('.jshintrc'))
        .pipe(jscs())
        .on('error', notify.onError({title: 'LINT fail', message: 'lint fail'}))
        .pipe(stylish.combineWithHintResults())
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('watch-lint', ['build'], function () {
    gulp.watch([paths.src], ['lint']);
});
