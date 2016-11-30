var gulp = require('gulp');
var gulpUtil = require('gulp-util');
var clean = require('gulp-clean');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var vueify = require('vueify');


gulp.task('stage', ['browserify', 'stageServer', 'stageServer', 'stageNodeModules', 'stageBootstrap'] , function () {
    gulp.src('src/assets/**').pipe(gulp.dest('deploy/stage/app/'))
})

gulp.task('rebuild-stage', ['browserify', 'stageServer', 'stageServer'], function () {
    gulp.src('src/assets/**').pipe(gulp.dest('deploy/stage/app/'))
})
gulp.task('browserify', function () {
    return browserify({
        entries: 'src/public/loader.js',
        transform: vueify
    })
        .bundle()
        .pipe(source("loader.js"))
        .pipe(gulp.dest('deploy/stage/app/'))
})

gulp.task('clean', function() {
    return gulp.src('deploy/stage/**/*')
        .pipe(clean());
})

gulp.task('stageServer', function () {
    return gulp.src('src/server/**/*.js')
        .pipe(gulp.dest('deploy/stage/server/'))
})

gulp.task('stageCommon', function () {
    return gulp.src('src/common/**/*.js')
        .pipe(gulp.dest('deploy/stage/common/'))
})

gulp.task('stageNodeModules', function () {
    return gulp.src('node_modules/**')
        .pipe(gulp.dest('deploy/stage/node_modules/'))
})

gulp.task('stageBootstrap', function () {
    return gulp.src('node_modules/bootstrap/dist/**')
        .pipe(gulp.dest("deploy/stage/app/static/bootstrap"))
})

gulp.task('watch', function () {
    gulp.watch("src/**", ['rebuild-stage'])
})
