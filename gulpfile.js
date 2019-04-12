/**
 Gulpfile for gulp-webpack-demo
 created by fwon
*/
var gulp = require('gulp'),
    os = require('os'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat'),
    gulpOpen = require('gulp-open'),
    livereload = require('gulp-livereload'),
    connect = require('gulp-connect');
	spritesmith=require('gulp.spritesmith');

var host = {
    path: 'dist/',
    port: 3000,
    html: 'index.html'
};

var browser = os.platform() === 'linux' ? 'Google chrome' : (
  os.platform() === 'darwin' ? 'Google chrome' : (
  os.platform() === 'win32' ? 'chrome' : 'firefox'));


gulp.task('img', function() {
    return gulp.src('img/*.png')//需要合并的图片地址
        .pipe(spritesmith({
            imgName: 'img/sprite.png',//保存合并后图片的地址
            cssName: 'img/sprite.css',//保存合并后对于css样式的地址
            padding: 10,//合并时两个图片的间距
            algorithm: 'binary-tree',//注释1
            //cssTemplate:"css/handlebarsStr.css"//注释2
        }))
        .pipe(gulp.dest('dist/'));

});

gulp.task('connect', function () {
    console.log('connect------------');
    connect.server({
        root: host.path,
        port: host.port,
        livereload: true,
    });
});

gulp.task('open', function (done) {
    gulp.src('')
        .pipe(gulpOpen({
            app: browser,
            uri: 'http://localhost:3000'
        }))
        .on('end', done);
});


gulp.task('default', ['img','connect','open']);