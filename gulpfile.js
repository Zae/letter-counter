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
    assign = require('lodash/object/assign'),
    vueify = require('vueify'),
    babelify = require('babelify');

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

gulp.task('watchify', function () {
    let opts = assign({}, watchify.args, {
            debug: config.debug,
            entries: ['./' + config.appPath + 'assets/js/' + config.appName + '.js']
        }),
        watcher = watchify(browserify(opts)
            .transform(vueify)
            .transform(babelify.configure({
                presets: ["es2015"]
            }))
            .transform(partialify)
        );

    function bundle() {
        return watcher.bundle()
            .pipe(source(config.appName + '.js'))
            .pipe(buffer())
            .pipe(sourcemaps.init({loadMaps: true}))
            .pipe(gulpif(!config.debug, uglify()))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(config.appPath + 'dist/js/'))
            .pipe(browserSync.stream());
    }

    bundle();

    watcher.on('update', bundle);
    watcher.on('log', gutil.log);
});

gulp.task('browserify', function () {
    let opts = assign({}, watchify.args, {
            debug: config.debug,
            entries: ['./' + config.appPath + 'assets/js/' + config.appName + '.js']
        }),
        b = browserify(opts)
            .transform(partialify)
            .transform(babelify.configure({
                presets: ["es2015"]
            }))
            .transform(vueify);

    return b.bundle()
        .pipe(source(config.appName + '.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(gulpif(!config.debug, uglify()))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.appPath + '/dist/js'))
        .pipe(browserSync.stream());
});

gulp.task('less', function() {
    return gulp.src(config.appPath + 'assets/less/' + config.appName + '.less')
        .pipe(plumber({
            errorHandler: throwError
        }))
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(less())
        .pipe(autoprefixer({ browsers: ["last 3 versions"] }))
        .pipe(gulpif(!config.debug, minifyCss({ advanced: true })))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.appPath + 'dist/css/'))
        .pipe(browserSync.stream());
});

gulp.task('js', ['watchify']);
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
