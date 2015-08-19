'use strict';

var gulp = require('gulp'),
    gutil = require('gulp-util'),
    plumber = require('gulp-plumber'),
    browserify = require('browserify'),
    jshint = require('gulp-jshint'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    less = require('gulp-less'),
    watchify = require('watchify'),
    browserSync = require('browser-sync').create(),
    autoprefixer = require('gulp-autoprefixer'),
    minifyCss = require('gulp-minify-css'),
    gulpif = require('gulp-if'),
    partialify = require('partialify'),
    assign = require('lodash/object/assign');

var config = {
    appName: 'lettercounter',
    appPath: 'public/',
    testPath: 'test/',
    debug: true
};

function throwError(err) {
    gutil.beep();
    gutil.log(err);
    this.emit('end');
}

gulp.task('default', [ 'lint', 'css', 'js', 'browser-sync' ,'watch']);

gulp.task('lint', function() {
    // todo: less-lint?
    return gulp.src(config.appPath + 'assets/js/**/*.js')
        .pipe(plumber({
            errorHandler: throwError
        }))
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('browserify', function () {
    var opts = assign({}, watchify.args, {
        debug: config.debug,
        entries: ['./' + config.appPath + 'assets/js/' + config.appName + '.js']
    });
    var watcher = watchify(browserify(opts).transform(partialify));

    function bundle() {
        return watcher.bundle()
            .pipe(source(config.appName + '.js'))
            .pipe(buffer())
            .pipe(gulpif(config.debug, sourcemaps.init({loadMaps: true})))
            .pipe(gulpif(!config.debug, uglify()))
            .pipe(gulpif(config.debug, sourcemaps.write('.')))
            .pipe(gulp.dest(config.appPath + 'dist/js/'))
            .pipe(browserSync.stream());
    }

    bundle();

    watcher.on('update', bundle);
    watcher.on('log', gutil.log);
});

gulp.task('browserify2', function () {
    var opts = assign({}, watchify.args, {
            debug: config.debug,
            entries: ['./' + config.appPath + 'assets/js/' + config.appName + '.js']
        }),
        b = browserify(opts).transform(partialify);

    return b.bundle()
        .pipe(source(config.appName + '.js'))
        .pipe(buffer())
        .pipe(gulpif(config.debug, sourcemaps.init({loadMaps: true})))
        .pipe(gulpif(!config.debug, uglify()))
        .pipe(gulpif(config.debug, sourcemaps.write('.')))
        .pipe(gulp.dest(config.appPath + '/dist/js'))
        .pipe(browserSync.stream());
});

gulp.task('less', function() {
    return gulp.src(config.appPath + 'assets/less/' + config.appName + '.less')
        .pipe(plumber({
            errorHandler: throwError
        }))
        .pipe(gulpif(config.debug, sourcemaps.init({loadMaps: true})))
        .pipe(less())
        .pipe(autoprefixer({ browsers: ["last 3 versions"] }))
        .pipe(gulpif(!config.debug, minifyCss({ advanced: true })))
        .pipe(gulpif(config.debug, sourcemaps.write('.')))
        .pipe(gulp.dest(config.appPath + 'dist/css/'))
        .pipe(browserSync.stream());
});

gulp.task('js', ['browserify']);
gulp.task('css', ['less']);

gulp.task('watch', function() {
    gulp.watch(config.appPath + '/assets/less/**/*.less', ['less']);
    gulp.watch(config.appPath + '/assets/js/**/*.js', ['lint']);
    gulp.watch(config.appPath + '/**/*.html', function(){
        browserSync.reload();
    });
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./" + config.appPath
        }
    });
});

gulp.task('production', ['enable-production-mode', 'default']);
gulp.task('test', ['enable-test-mode', 'default']);

gulp.task('enable-production-mode', function(){
    config.debug = false;
});
gulp.task('enable-test-mode', function(){
    config.appPath = config.testPath;
});
